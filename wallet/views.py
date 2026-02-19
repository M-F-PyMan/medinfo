from django.db import transaction as db_transaction
from django.http import Http404, HttpResponse
from django.urls import reverse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from azbankgateways import bankfactories, models as bank_models, default_settings as bank_settings
from azbankgateways.exceptions import AZBankGatewaysException

from .models import Wallet, WalletTransaction, WalletChargeRequest
from .serializers import WalletSerializer, WalletTransactionSerializer, WalletChargeSerializer

from payments.models import Cart, CartItem, Transaction as PaymentTransaction
from accounts.models import Enrollment
from coupons.models import Coupon, CouponRedemption
from payout.models import InstructorEarning, PlatformConfig


# -----------------------------
# Utils
# -----------------------------

def get_or_create_wallet(user):
    wallet, _ = Wallet.objects.get_or_create(user=user)
    return wallet


def create_wallet_transaction(wallet, amount, type_, description):
    return WalletTransaction.objects.create(
        wallet=wallet,
        amount=amount,
        type=type_,
        description=description,
    )


def get_platform_fee_percent():
    config = PlatformConfig.objects.first()
    return config.platform_fee_percent if config else 30


def create_instructor_earning(course, transaction_obj, gross_amount):
    if not course or not course.teacher:
        return

    platform_fee_percent = get_platform_fee_percent()
    platform_amount = int(gross_amount * platform_fee_percent / 100)
    instructor_amount = gross_amount - platform_amount

    InstructorEarning.objects.create(
        instructor=course.teacher,
        course=course,
        transaction=transaction_obj,
        gross_amount=gross_amount,
        instructor_amount=instructor_amount,
        platform_amount=platform_amount,
    )


# -----------------------------
# ViewSet
# -----------------------------

class WalletViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # -----------------------------
    # GET /wallet/
    # -----------------------------
    def list(self, request):
        wallet = get_or_create_wallet(request.user)
        return Response(WalletSerializer(wallet).data)

    # -----------------------------
    # GET /wallet/transactions/
    # -----------------------------
    @action(detail=False, methods=["get"])
    def transactions(self, request):
        wallet = get_or_create_wallet(request.user)
        qs = wallet.transactions.order_by("-created_at")
        return Response(WalletTransactionSerializer(qs, many=True).data)

    # -----------------------------
    # POST /wallet/charge/
    # -----------------------------
    @action(detail=False, methods=["post"])
    def charge(self, request):
        user = request.user
        serializer = WalletChargeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data["amount"]

        charge_req = WalletChargeRequest.objects.create(
            user=user,
            amount=amount,
            status="PENDING",
        )

        factory = bankfactories.BankFactory()
        try:
            bank = factory.auto_create(bank_models.BankType.ZARINPAL)
            bank.set_request(request)
            bank.set_amount(amount)
            bank.set_client_callback_url(reverse("wallet:wallet-callback"))
            bank.set_mobile_number(getattr(user.profile, "phone", None))

            bank_record = bank.ready()
            bank_record.extra_information = {
                "wallet_charge_id": charge_req.id,
            }
            bank_record.save()

            charge_req.authority = bank_record.tracking_code
            charge_req.save()

            return Response({"url": bank.redirect_gateway().url})

        except AZBankGatewaysException as e:
            return Response({"error": str(e)}, status=500)

    # -----------------------------
    # GET /wallet/callback/
    # -----------------------------
    @action(detail=False, methods=["get"])
    def callback(self, request):
        tracking_code = request.GET.get(bank_settings.TRACKING_CODE_QUERY_PARAM)
        if not tracking_code:
            raise Http404("Invalid callback")

        try:
            bank_record = bank_models.Bank.objects.get(tracking_code=tracking_code)
        except bank_models.Bank.DoesNotExist:
            raise Http404("Bank record not found")

        try:
            charge_req = WalletChargeRequest.objects.get(authority=tracking_code)
        except WalletChargeRequest.DoesNotExist:
            raise Http404("Charge request not found")

        if not bank_record.is_success:
            charge_req.status = "FAIL"
            charge_req.save()
            return HttpResponse("شارژ کیف پول ناموفق بود")

        charge_req.status = "SUCCESS"
        charge_req.save()

        wallet = get_or_create_wallet(charge_req.user)

        with db_transaction.atomic():
            wallet.balance += charge_req.amount
            wallet.save()

            create_wallet_transaction(
                wallet=wallet,
                amount=charge_req.amount,
                type_="CHARGE",
                description="شارژ کیف پول از طریق درگاه",
            )

        return HttpResponse("شارژ کیف پول با موفقیت انجام شد")

    # -----------------------------
    # POST /wallet/pay_cart/
    # -----------------------------
    @action(detail=False, methods=["post"])
    def pay_cart(self, request):
        user = request.user
        wallet = get_or_create_wallet(user)

        cart, _ = Cart.objects.get_or_create(user=user)
        items = cart.items.select_related("course")

        if not items.exists():
            return Response({"error": "سبد خرید خالی است"}, status=400)

        base_total = sum(item.price_at_time for item in items)
        amount = base_total
        discount = 0

        coupon_code = request.data.get("coupon_code")
        coupon_obj = None

        if coupon_code:
            from coupons.serializers import CouponValidateSerializer
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

        if wallet.balance < amount:
            return Response(
                {
                    "error": "موجودی کیف پول کافی نیست",
                    "required": amount,
                    "balance": wallet.balance,
                },
                status=400,
            )

        with db_transaction.atomic():
            wallet.balance -= amount
            wallet.save()

            create_wallet_transaction(
                wallet=wallet,
                amount=-amount,
                type_="PAYMENT",
                description="پرداخت سبد خرید با کیف پول",
            )

            pay_tx = PaymentTransaction.objects.create(
                user=user,
                course=None,
                amount=amount,
                status="SUCCESS",
                coupon_code=coupon_obj.code if coupon_obj else None,
                is_cart_payment=True,
            )

            total_price = sum(item.price_at_time for item in items) or 1

            for item in items:
                share = int(amount * (item.price_at_time / total_price))

                Enrollment.objects.get_or_create(
                    user=user,
                    course=item.course,
                )

                create_instructor_earning(
                    course=item.course,
                    transaction_obj=pay_tx,
                    gross_amount=share,
                )

            cart.items.all().delete()

            if coupon_obj:
                CouponRedemption.objects.create(
                    coupon=coupon_obj,
                    user=user,
                )

        return Response(
            {
                "message": "پرداخت سبد خرید با کیف پول با موفقیت انجام شد",
                "amount": amount,
            }
        )
