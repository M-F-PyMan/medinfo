from rest_framework import serializers
from .models import WishlistItem
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class WishlistItemAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseAdminSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = [
            "id",
            "user",
            "course",
            "created_at",
        ]
