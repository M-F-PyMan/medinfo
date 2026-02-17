from rest_framework import serializers
from courses.models import Course, Lesson
from accounts.models import Enrollment, User
from payout.models import InstructorEarning
from reviews.models import Rating, Comment



class InstructorCourseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "title",
            "description",
            "price",
            "sale_price",
            "category",
            "level",
            "preview_image",
            "status",
        ]


class InstructorCourseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "title",
            "description",
            "price",
            "sale_price",
            "category",
            "level",
            "preview_image",
            "status",
        ]


class InstructorLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "order",
            "video_file",
            "duration",
            "is_preview",
        ]

class InstructorCourseSerializer(serializers.ModelSerializer):
    lessons_count = serializers.IntegerField(source="lessons.count", read_only=True)
    students_count = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    earnings = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "status",
            "created_at",
            "lessons_count",
            "students_count",
            "average_rating",
            "comments_count",
            "earnings",
        ]


class InstructorOverviewSerializer(serializers.Serializer):
    courses_count = serializers.IntegerField()
    lessons_count = serializers.IntegerField()
    students_count = serializers.IntegerField()
    average_rating = serializers.FloatField()
    comments_count = serializers.IntegerField()
    total_earned = serializers.IntegerField()
    total_paid = serializers.IntegerField()
    withdrawable = serializers.IntegerField()


class InstructorCourseDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    slug = serializers.CharField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

    lessons_count = serializers.IntegerField()
    students_count = serializers.IntegerField()
    average_rating = serializers.FloatField()
    comments_count = serializers.IntegerField()
    earnings = serializers.IntegerField()

    lessons = serializers.ListField()
    students = serializers.ListField()


class InstructorCourseStudentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.CharField()
    enrolled_at = serializers.DateTimeField()
    progress_percent = serializers.IntegerField()
