from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Wallet, WalletTransaction, WalletChargeRequest
from .admin_serializers import (
    WalletAdminSerializer,
    WalletTransactionAdminSerializer,
    WalletChargeRequestAdminSerializer,
)


class WalletAdminViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all().select_related("user")
    serializer_class = WalletAdminSerializer
    permission_classes = [IsAdminUser]


class WalletTransactionAdminViewSet(viewsets.ModelViewSet):
    queryset = WalletTransaction.objects.all().select_related("wallet", "wallet__user")
    serializer_class = WalletTransactionAdminSerializer
    permission_classes = [IsAdminUser]


class WalletChargeRequestAdminViewSet(viewsets.ModelViewSet):
    queryset = WalletChargeRequest.objects.all().select_related("user")
    serializer_class = WalletChargeRequestAdminSerializer
    permission_classes = [IsAdminUser]
