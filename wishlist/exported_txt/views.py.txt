from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from courses.models import Course
from .models import WishlistItem
from .serializers import WishlistItemSerializer


class WishlistViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        items = WishlistItem.objects.filter(user=request.user).select_related("course").order_by("-created_at")
        return Response(WishlistItemSerializer(items, many=True).data)

    @action(detail=False, methods=["post"])
    def add(self, request):
        course_id = request.data.get("course_id")
        course = get_object_or_404(Course, id=course_id)

        obj, created = WishlistItem.objects.get_or_create(
            user=request.user,
            course=course,
        )

        if not created:
            return Response({"message": "این دوره قبلاً در لیست علاقه‌مندی‌های شما وجود دارد"})

        return Response({"message": "به لیست علاقه‌مندی‌ها اضافه شد"})

    @action(detail=False, methods=["post"])
    def remove(self, request):
        course_id = request.data.get("course_id")
        WishlistItem.objects.filter(user=request.user, course_id=course_id).delete()
        return Response({"message": "از لیست علاقه‌مندی‌ها حذف شد"})
