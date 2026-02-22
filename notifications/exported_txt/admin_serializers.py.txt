from rest_framework import serializers
from .models import Notification
from accounts.serializers import UserSerializer


class NotificationAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "user",
            "type",
            "title",
            "message",
            "target_url",
            "is_read",
            "created_at",
        ]
