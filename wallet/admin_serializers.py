from rest_framework import serializers
from .models import Wallet, WalletTransaction, WalletChargeRequest
from accounts.serializers import UserSerializer


class WalletAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = [
            "id",
            "user",
            "balance",
        ]


class WalletTransactionAdminSerializer(serializers.ModelSerializer):
    wallet_user = serializers.CharField(source="wallet.user.username", read_only=True)

    class Meta:
        model = WalletTransaction
        fields = [
            "id",
            "wallet",
            "wallet_user",
            "amount",
            "type",
            "description",
            "created_at",
        ]


class WalletChargeRequestAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = WalletChargeRequest
        fields = [
            "id",
            "user",
            "amount",
            "status",
            "authority",
            "created_at",
        ]
