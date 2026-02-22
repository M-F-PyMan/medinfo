# courses/admin_serializers.py
from rest_framework import serializers
from .models import Course, Lesson
from accounts.serializers import UserSerializer


class LessonAdminSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "course",
            "course_title",
            "title",
            "order",
            "video_file",
            "duration",
            "is_preview",
        ]


class CourseAdminSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    lessons_count = serializers.IntegerField(source="lessons.count", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "preview_image",
            "teacher",
            "status",
            "price",
            "sale_price",
            "category",
            "level",
            "has_certificate",
            "lessons_count",
            "created_at",
        ]
