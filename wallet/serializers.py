from rest_framework import serializers
from .models import Wallet, WalletTransaction


class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = ["id", "amount", "type", "description", "created_at"]


class WalletSerializer(serializers.ModelSerializer):
    transactions = WalletTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        fields = ["balance", "transactions"]


class WalletChargeSerializer(serializers.Serializer):
    amount = serializers.IntegerField(min_value=10000)
