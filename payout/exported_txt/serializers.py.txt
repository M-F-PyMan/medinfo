from rest_framework import serializers
from .models import PayoutRequest, InstructorEarning


class InstructorBalanceSerializer(serializers.Serializer):
    total_earned = serializers.IntegerField()
    total_paid = serializers.IntegerField()
    withdrawable = serializers.IntegerField()


class PayoutRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayoutRequest
        fields = ["id", "amount", "status", "created_at", "processed_at", "reference_code"]
        read_only_fields = ["status", "created_at", "processed_at", "reference_code"]
