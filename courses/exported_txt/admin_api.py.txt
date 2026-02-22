# courses/admin_api.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Course, Lesson
from .admin_serializers import CourseAdminSerializer, LessonAdminSerializer


class CourseAdminViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().select_related("teacher")
    serializer_class = CourseAdminSerializer
    permission_classes = [IsAdminUser]


class LessonAdminViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().select_related("course")
    serializer_class = LessonAdminSerializer
    permission_classes = [IsAdminUser]
