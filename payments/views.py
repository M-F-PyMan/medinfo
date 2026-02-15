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
from django.utils import timezone


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=["post"])
    def add(self, request):
        course_id = request.data.get("course_id")
        course = get_object_or_404(Course, id=course_id)

        cart, _ = Cart.objects.get_or_create(user=request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            course=course,
            defaults={"price_at_time": course.sale_price or course.price}
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


class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # -------------------------
    #  شروع پرداخت یک دوره
    #  ورودی اختیاری: coupon_code
    # -------------------------
    @action(detail=True, methods=["post"])
    def start(self, request, pk=None):
        user = request.user
        course = get_object_or_404(Course, id=pk)

        base_amount = course.sale_price or course.price
        amount = base_amount

        coupon_code = request.data.get("coupon_code")
        coupon_obj = None

        # اگر کوپن ارسال شده، سعی می‌کنیم وریفای کنیم
        if coupon_code:
            serializer = CouponValidateSerializer(
                data={"code": coupon_code, "course_id": course.id},
                context={"request": request}
            )
            if serializer.is_valid():
                coupon_obj = serializer.validated_data["coupon"]
                if coupon_obj.discount_type == Coupon.PERCENT:
                    amount = int(base_amount * (100 - coupon_obj.amount) / 100)
                else:
                    amount = max(0, base_amount - coupon_obj.amount)
            # اگر نامعتبر بود، عمداً خطا نمی‌دهیم؛ پرداخت بدون تخفیف ادامه می‌یابد

        # ایجاد تراکنش
        transaction = Transaction.objects.create(
            user=user,
            course=course,
            amount=amount,
            status="PENDING",
            coupon_code=coupon_obj.code if coupon_obj else None,
        )

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
                "course_id": course.id
            }
            bank_record.save()

            transaction.authority = bank_record.tracking_code
            transaction.save()

            return Response({"url": bank.redirect_gateway().url})

        except AZBankGatewaysException as e:
            return Response({"error": str(e)}, status=500)

    # -------------------------
    #  Callback درگاه
    # -------------------------
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

        # ثبت‌نام کاربر در دوره
        Enrollment.objects.get_or_create(
            user=transaction.user,
            course=transaction.course
        )

        # اگر کوپن استفاده شده بود، ثبت استفاده
        if transaction.coupon_code:
            try:
                coupon = Coupon.objects.get(code__iexact=transaction.coupon_code)
                CouponRedemption.objects.create(
                    coupon=coupon,
                    user=transaction.user
                )
            except Coupon.DoesNotExist:
                # اگر کوپن پیدا نشد، پرداخت نباید دچار مشکل شود
                pass

        return HttpResponse("پرداخت موفقیت‌آمیز بود")

