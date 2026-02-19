
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404
from django.urls import reverse

from azbankgateways import bankfactories, models as bank_models, default_settings as settings
from azbankgateways.exceptions import AZBankGatewaysException

from accounts.models import Enrollment
from courses.models import Course
from .models import Transaction, Cart, CartItem
from .serializers import CartSerializer
from coupons.models import Coupon, CouponRedemption
from coupons.serializers import CouponValidateSerializer
from notifications.utils import create_notification
from payout.models import InstructorEarning, PlatformConfig
from django.db.models import Sum



class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=["post"])
    def add(self, request):
        course_id = request.data.get("course_id")
        course = get_object_or_404(Course, id=course_id)

        cart, _ = Cart.objects.get_or_create(user=request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            course=course,
            defaults={"price_at_time": course.sale_price or course.price},
        )

        if not created:
            return Response({"message": "این دوره قبلاً در سبد خرید شما وجود دارد"})

        return Response({"message": "به سبد خرید اضافه شد"})

    @action(detail=False, methods=["post"])
    def remove(self, request):
        course_id = request.data.get("course_id")
        cart = Cart.objects.get(user=request.user)
        CartItem.objects.filter(cart=cart, course_id=course_id).delete()
        return Response({"message": "از سبد خرید حذف شد"})

    @action(detail=False, methods=["post"])
    def clear(self, request):
        cart = Cart.objects.get(user=request.user)
        cart.items.all().delete()
        return Response({"message": "سبد خرید خالی شد"})

    @action(detail=False, methods=["post"])
    def summary(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = cart.items.select_related("course")

        base_total = sum(item.price_at_time for item in items)
        amount = base_total
        discount = 0

        coupon_code = request.data.get("coupon_code")
        coupon_obj = None

        if coupon_code and items.exists():
            first_course = items.first().course
            serializer = CouponValidateSerializer(
                data={"code": coupon_code, "course_id": first_course.id},
                context={"request": request},
            )
            if serializer.is_valid():
                coupon_obj = serializer.validated_data["coupon"]
                if coupon_obj.discount_type == Coupon.PERCENT:
                    discount = int(base_total * coupon_obj.amount / 100)
                else:
                    discount = min(base_total, coupon_obj.amount)
                amount = base_total - discount

        return Response({
            "total_before": base_total,
            "discount": discount,
            "total_after": amount,
            "coupon_code": coupon_obj.code if coupon_obj else None,
            "cart": CartSerializer(cart).data,
        })



class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # ---------------------------------------------------------
    # شروع پرداخت تک‌دوره‌ای
    # ---------------------------------------------------------
    @action(detail=True, methods=["post"])
    def start(self, request, pk=None):
        user = request.user
        course = get_object_or_404(Course, id=pk)

        base_amount = course.sale_price or course.price
        amount = base_amount

        coupon_code = request.data.get("coupon_code")
        coupon_obj = None

        # وریفای کوپن
        if coupon_code:
            serializer = CouponValidateSerializer(
                data={"code": coupon_code, "course_id": course.id},
                context={"request": request},
            )
            if serializer.is_valid():
                coupon_obj = serializer.validated_data["coupon"]
                if coupon_obj.discount_type == Coupon.PERCENT:
                    amount = int(base_amount * (100 - coupon_obj.amount) / 100)
                else:
                    amount = max(0, base_amount - coupon_obj.amount)

        # ساخت تراکنش
        transaction = Transaction.objects.create(
            user=user,
            course=course,
            amount=amount,
            status="PENDING",
            coupon_code=coupon_obj.code if coupon_obj else None,
            is_cart_payment=False,
        )

        # اتصال به درگاه
        factory = bankfactories.BankFactory()
        try:
            bank = factory.auto_create(bank_models.BankType.ZARINPAL)
            bank.set_request(request)
            bank.set_amount(amount)
            bank.set_client_callback_url(reverse("payments:payments-callback"))
            bank.set_mobile_number(user.profile.phone)

            bank_record = bank.ready()
            bank_record.extra_information = {
                "transaction_id": transaction.id,
                "course_id": course.id,
            }
            bank_record.save()

            transaction.authority = bank_record.tracking_code
            transaction.save()

            return Response({"url": bank.redirect_gateway().url})

        except AZBankGatewaysException as e:
            return Response({"error": str(e)}, status=500)

    # ---------------------------------------------------------
    # شروع پرداخت سبد خرید
    # ---------------------------------------------------------
    @action(detail=False, methods=["post"])
    def start_cart(self, request):
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        items = cart.items.select_related("course")

        if not items.exists():
            return Response({"error": "سبد خرید خالی است"}, status=400)

        base_total = sum(item.price_at_time for item in items)
        amount = base_total
        discount = 0

        coupon_code = request.data.get("coupon_code")
        coupon_obj = None

        # وریفای کوپن
        if coupon_code:
            first_course = items.first().course
            serializer = CouponValidateSerializer(
                data={"code": coupon_code, "course_id": first_course.id},
                context={"request": request},
            )
            if serializer.is_valid():
                coupon_obj = serializer.validated_data["coupon"]
                if coupon_obj.discount_type == Coupon.PERCENT:
                    discount = int(base_total * coupon_obj.amount / 100)
                else:
                    discount = min(base_total, coupon_obj.amount)
                amount = base_total - discount

        # ساخت تراکنش
        transaction = Transaction.objects.create(
            user=user,
            course=None,
            amount=amount,
            status="PENDING",
            coupon_code=coupon_obj.code if coupon_obj else None,
            is_cart_payment=True,
        )

        # اتصال به درگاه
        factory = bankfactories.BankFactory()
        try:
            bank = factory.auto_create(bank_models.BankType.ZARINPAL)
            bank.set_request(request)
            bank.set_amount(amount)
            bank.set_client_callback_url(reverse("payments:payments-callback"))
            bank.set_mobile_number(user.profile.phone)

            bank_record = bank.ready()
            bank_record.extra_information = {
                "transaction_id": transaction.id,
                "is_cart_payment": True,
            }
            bank_record.save()

            transaction.authority = bank_record.tracking_code
            transaction.save()

            return Response({"url": bank.redirect_gateway().url})

        except AZBankGatewaysException as e:
            return Response({"error": str(e)}, status=500)

    # ---------------------------------------------------------
    # Callback درگاه
    # ---------------------------------------------------------
    @action(detail=False, methods=["get"])
    def callback(self, request):
        tracking_code = request.GET.get(settings.TRACKING_CODE_QUERY_PARAM)

        if not tracking_code:
            raise Http404("Invalid callback")

        try:
            bank_record = bank_models.Bank.objects.get(tracking_code=tracking_code)
        except bank_models.Bank.DoesNotExist:
            raise Http404("Bank record not found")

        try:
            transaction = Transaction.objects.get(authority=tracking_code)
        except Transaction.DoesNotExist:
            raise Http404("Transaction not found")

        # پرداخت ناموفق
        if not bank_record.is_success:
            transaction.status = "FAIL"
            transaction.save()
            return HttpResponse("پرداخت ناموفق بود")

        # پرداخت موفق
        transaction.status = "SUCCESS"
        transaction.ref_id = bank_record.ref_id
        transaction.save()

        user = transaction.user

        # تنظیمات پلتفرم
        config = PlatformConfig.objects.first()
        platform_fee_percent = config.platform_fee_percent if config else 30

        # تابع ساخت درآمد مدرس
        def create_earning(course, amount):
            if not course or not course.teacher:
                return

            gross = amount
            platform_amount = int(gross * platform_fee_percent / 100)
            instructor_amount = gross - platform_amount

            InstructorEarning.objects.create(
                instructor=course.teacher,
                course=course,
                transaction=transaction,
                gross_amount=gross,
                instructor_amount=instructor_amount,
                platform_amount=platform_amount,
            )

        # ---------------------------------------------------------
        # پرداخت سبد خرید
        # ---------------------------------------------------------
        if transaction.is_cart_payment:
            cart = Cart.objects.get(user=user)
            items = cart.items.select_related("course")

            total_price = sum(item.price_at_time for item in items) or 1

            for item in items:
                share = int(transaction.amount * (item.price_at_time / total_price))

                Enrollment.objects.get_or_create(
                    user=user,
                    course=item.course,
                )

                create_earning(item.course, share)

            cart.items.all().delete()

            create_notification(
                user=user,
                type_="payment",
                title="پرداخت سبد خرید موفق",
                message="پرداخت سبد خرید شما با موفقیت انجام شد.",
                target_url="/me/courses/",
            )

        # ---------------------------------------------------------
        # پرداخت تک‌دوره‌ای
        # ---------------------------------------------------------
        else:
            if transaction.course:
                Enrollment.objects.get_or_create(
                    user=user,
                    course=transaction.course,
                )

                create_earning(transaction.course, transaction.amount)

                create_notification(
                    user=user,
                    type_="payment",
                    title="پرداخت موفق دوره",
                    message=f"پرداخت شما برای دوره «{transaction.course.title}» با موفقیت انجام شد.",
                    target_url=f"/courses/{transaction.course.slug}/",
                )

        # ثبت استفاده از کوپن
        if transaction.coupon_code:
            try:
                coupon = Coupon.objects.get(code__iexact=transaction.coupon_code)
                CouponRedemption.objects.create(
                    coupon=coupon,
                    user=user,
                )
            except Coupon.DoesNotExist:
                pass

        return HttpResponse("پرداخت موفقیت‌آمیز بود")

