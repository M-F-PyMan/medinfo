from rest_framework import serializers
from .models import WishlistItem
from courses.serializers import CourseListSerializer


class WishlistItemSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ["id", "course", "created_at"]
