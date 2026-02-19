from rest_framework import serializers
from .models import Wallet, WalletTransaction, WalletChargeRequest


class WalletSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Wallet
        fields = ["id", "user", "balance"]


class WalletTransactionSerializer(serializers.ModelSerializer):
    wallet_user = serializers.CharField(source="wallet.user.username", read_only=True)

    class Meta:
        model = WalletTransaction
        fields = ["id", "wallet", "wallet_user", "amount", "type", "description", "created_at"]
        read_only_fields = ["wallet", "created_at"]


class WalletChargeRequestSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = WalletChargeRequest
        fields = ["id", "user", "amount", "status", "authority", "created_at"]
        read_only_fields = ["user", "status", "authority", "created_at"]
