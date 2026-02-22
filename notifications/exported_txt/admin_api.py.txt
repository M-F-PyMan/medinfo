from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Notification
from .admin_serializers import NotificationAdminSerializer


class NotificationAdminViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().select_related("user")
    serializer_class = NotificationAdminSerializer
    permission_classes = [IsAdminUser]
