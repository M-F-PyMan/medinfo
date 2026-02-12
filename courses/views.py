from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Course, Lesson
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    LessonSerializer,
)


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
