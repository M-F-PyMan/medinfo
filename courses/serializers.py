from rest_framework import serializers
from .models import Course, Lesson,LessonProgress


# -------------------------
#  Lesson Serializer
# -------------------------
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "order",
            "duration",
            "is_preview",
        ]


# -------------------------
#  Course List Serializer
# -------------------------
class CourseListSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)
    lessons_count = serializers.IntegerField(source="lessons.count", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "preview_image",
            "price",
            "sale_price",
            "teacher_name",
            "lessons_count",
        ]


# -------------------------
#  Course Detail Serializer
# -------------------------
class CourseDetailSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "preview_image",
            "price",
            "sale_price",
            "category",
            "level",
            "teacher_name",
            "lessons",
        ]

class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ["watched_seconds", "completed"]
