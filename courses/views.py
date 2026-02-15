from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Course, Lesson, LessonProgress
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    LessonSerializer,
    LessonProgressSerializer,
)
from accounts.models import Enrollment


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("-id")
    lookup_field = "slug"
    permission_classes = [AllowAny]

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

    # -------------------------
    #  درصد پیشرفت دوره
    # -------------------------
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def progress(self, request, slug=None):
        course = self.get_object()
        user = request.user

        lessons = course.lessons.count()
        completed = LessonProgress.objects.filter(
            user=user,
            lesson__course=course,
            completed=True
        ).count()

        percent = int((completed / lessons) * 100) if lessons > 0 else 0

        return Response({
            "course": course.title,
            "completed_lessons": completed,
            "total_lessons": lessons,
            "percent": percent
        })


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Lesson.objects.filter(
            course__slug=self.kwargs["course_slug"]
        ).order_by("order")

    # -------------------------
    #  ثبت پیشرفت کاربر
    # -------------------------
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def progress(self, request, course_slug=None, pk=None):
        lesson = self.get_object()
        user = request.user

        progress, created = LessonProgress.objects.get_or_create(
            user=user,
            lesson=lesson
        )

        serializer = LessonProgressSerializer(progress, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Progress updated"})
