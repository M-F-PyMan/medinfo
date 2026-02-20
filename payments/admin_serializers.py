from rest_framework import serializers
from .models import Transaction, Cart
from accounts.serializers import UserSerializer
from courses.serializers import CourseListSerializer


class PaymentAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            "id",
            "user",
            "course",
            "amount",
            "status",
            "gateway",
            "authority",
            "ref_id",
            "created_at",
        ]


class CartAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "total_price",
            "created_at",
        ]
