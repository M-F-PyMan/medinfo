from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # لیست نوتیفیکیشن‌های کاربر
    def list(self, request):
        notifications = Notification.objects.filter(user=request.user)
        return Response(NotificationSerializer(notifications, many=True).data)

    # علامت‌گذاری به عنوان خوانده‌شده
    @action(detail=True, methods=["post"])
    def read(self, request, pk=None):
        notif = Notification.objects.get(id=pk, user=request.user)
        notif.is_read = True
        notif.save()
        return Response({"message": "نوتیفیکیشن خوانده شد"})

    # علامت‌گذاری همه به عنوان خوانده‌شده
    @action(detail=False, methods=["post"])
    def read_all(self, request):
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({"message": "همه نوتیفیکیشن‌ها خوانده شدند"})
