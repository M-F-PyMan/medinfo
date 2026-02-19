from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction as db_transaction

from .models import Wallet, WalletTransaction, WalletChargeRequest
from .serializers import (
    WalletSerializer,
    WalletTransactionSerializer,
    WalletChargeRequestSerializer,
)
from payments.models import Transaction
from payout.models import InstructorEarning


class WalletViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _get_wallet(self, user):
        wallet, _ = Wallet.objects.get_or_create(user=user)
        return wallet

    @action(detail=False, methods=["GET"])
    def me(self, request):
        wallet = self._get_wallet(request.user)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def transactions(self, request):
        wallet = self._get_wallet(request.user)
        qs = wallet.transactions.all()
        serializer = WalletTransactionSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["POST"])
    def charge(self, request):
        amount = int(request.data.get("amount", 0))
        if amount <= 0:
            return Response({"detail": "مبلغ نامعتبر است"}, status=status.HTTP_400_BAD_REQUEST)

        charge_req = WalletChargeRequest.objects.create(
            user=request.user,
            amount=amount,
            status="PENDING",
        )
        # اینجا درگاه واقعی را وصل می‌کنی؛ فعلاً mock
        return Response(WalletChargeRequestSerializer(charge_req).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["POST"])
    def pay_cart(self, request):
        """
        پرداخت سبد خرید با کیف پول
        انتظار: transaction_id یا cart_id از سمت فرانت
        """
        transaction_id = request.data.get("transaction_id")
        if not transaction_id:
            return Response({"detail": "transaction_id لازم است"}, status=status.HTTP_400_BAD_REQUEST)

        trx = get_object_or_404(Transaction, id=transaction_id, user=request.user, status="INIT")
        wallet = self._get_wallet(request.user)

        if wallet.balance < trx.amount:
            return Response({"detail": "موجودی کیف پول کافی نیست"}, status=status.HTTP_400_BAD_REQUEST)

        with db_transaction.atomic():
            wallet.balance -= trx.amount
            wallet.save()

            WalletTransaction.objects.create(
                wallet=wallet,
                amount=-trx.amount,
                type="PAYMENT",
                description=f"پرداخت سبد خرید #{trx.id}",
            )

            trx.status = "SUCCESS"
            trx.is_cart_payment = True
            trx.save()

        return Response({"detail": "پرداخت با کیف پول انجام شد"}, status=status.HTTP_200_OK)


class WalletAdminViewSet(viewsets.ReadOnlyModelViewSet):
    """
    برای استفاده در React Admin Panel (فقط ادمین)
    """
    permission_classes = [IsAdminUser]
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletTransactionAdminViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = WalletTransaction.objects.select_related("wallet", "wallet__user").all()
    serializer_class = WalletTransactionSerializer


class WalletChargeRequestAdminViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = WalletChargeRequest.objects.select_related("user").all()
    serializer_class = WalletChargeRequestSerializer
