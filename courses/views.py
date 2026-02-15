from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Course, Lesson
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    LessonSerializer,
)

from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Enrollment

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("-id")
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return CourseListSerializer
        return CourseDetailSerializer

    # -------------------------
    #  بررسی دسترسی کاربر
    # -------------------------
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def has_access(self, request, slug=None):
        course = self.get_object()
        user = request.user

        enrolled = Enrollment.objects.filter(user=user, course=course).exists()

        return Response({
            "enrolled": enrolled,
            "course_id": course.id,
            "user_id": user.id
        })


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("-id")
    lookup_field = "slug"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return CourseListSerializer
        return CourseDetailSerializer


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Lesson.objects.filter(course__slug=self.kwargs["course_slug"]).order_by("order")
