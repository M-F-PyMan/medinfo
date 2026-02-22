from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Notification
from .serializers import NotificationSerializer


class NotificationPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    # -----------------------------
    # 🔥 Mark as read
    # -----------------------------
    @action(detail=True, methods=["post"])
    def read(self, request, pk=None):
        notif = self.get_queryset().filter(id=pk).first()
        if not notif:
            return Response({"error": "نوتیفیکیشن یافت نشد"}, status=404)

        notif.is_read = True
        notif.save()
        return Response({"message": "نوتیفیکیشن خوانده شد"})

    # -----------------------------
    # 🔥 Mark all as read
    # -----------------------------
    @action(detail=False, methods=["post"])
    def read_all(self, request):
        self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({"message": "همه نوتیفیکیشن‌ها خوانده شدند"})

    # -----------------------------
    # 🔥 Unread count
    # -----------------------------
    @action(detail=False, methods=["get"])
    def unread_count(self, request):
        count = self.get_queryset().filter(is_read=False).count()
        return Response({"unread": count})

    # -----------------------------
    # 🔥 Delete notification
    # -----------------------------
    @action(detail=True, methods=["delete"])
    def delete(self, request, pk=None):
        notif = self.get_queryset().filter(id=pk).first()
        if not notif:
            return Response({"error": "نوتیفیکیشن یافت نشد"}, status=404)

        notif.delete()
        return Response({"message": "نوتیفیکیشن حذف شد"})
