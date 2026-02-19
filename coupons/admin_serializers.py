from rest_framework import serializers
from .models import Coupon, CouponRedemption
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class CouponAdminSerializer(serializers.ModelSerializer):
    assigned_user = UserSerializer(read_only=True)
    courses = CourseAdminSerializer(many=True, read_only=True)

    class Meta:
        model = Coupon
        fields = [
            "id",
            "code",
            "discount_type",
            "amount",
            "courses",
            "valid_days",
            "start_at",
            "expires_at",
            "max_uses",
            "max_uses_per_user",
            "is_active",
            "assigned_user",
        ]


class CouponRedemptionAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    coupon = serializers.StringRelatedField()

    class Meta:
        model = CouponRedemption
        fields = [
            "id",
            "coupon",
            "user",
            "used_at",
        ]
