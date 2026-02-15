from rest_framework import serializers
from .models import Cart, CartItem
from courses.serializers import CourseListSerializer


class CartItemSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "course", "price_at_time", "added_at"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "created_at"]
