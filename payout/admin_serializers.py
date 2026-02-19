from rest_framework import serializers
from .models import PlatformConfig, InstructorEarning, PayoutRequest
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class PlatformConfigAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformConfig
        fields = [
            "id",
            "platform_fee_percent",
        ]


class InstructorEarningAdminSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    course = serializers.StringRelatedField()
    transaction_id = serializers.IntegerField(source="transaction.id", read_only=True)

    class Meta:
        model = InstructorEarning
        fields = [
            "id",
            "instructor",
            "course",
            "transaction_id",
            "gross_amount",
            "instructor_amount",
            "platform_amount",
            "created_at",
        ]


class PayoutRequestAdminSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)

    class Meta:
        model = PayoutRequest
        fields = [
            "id",
            "instructor",
            "amount",
            "status",
            "created_at",
            "processed_at",
            "reference_code",
            "receipt",
        ]
