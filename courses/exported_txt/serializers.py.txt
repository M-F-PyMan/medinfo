from rest_framework import serializers
from accounts.models import Enrollment
from reviews.serializers import CommentSerializer
from .models import Course, Lesson, LessonProgress


# ---------------------------------------------------
#  Lesson Serializer
# ---------------------------------------------------
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


# ---------------------------------------------------
#  Course List Serializer
# ---------------------------------------------------
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


# ---------------------------------------------------
#  Course Detail Serializer
# ---------------------------------------------------
class CourseDetailSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)

    # نظرات
    comments = CommentSerializer(many=True, read_only=True)

    # میانگین امتیاز
    average_rating = serializers.SerializerMethodField()

    # تعداد نظرات
    comments_count = serializers.SerializerMethodField()

    # آیا کاربر دسترسی دارد؟
    has_access = serializers.SerializerMethodField()

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
            "comments",
            "comments_count",
            "average_rating",
            "has_access",
        ]

    # -------------------------
    #  میانگین امتیاز
    # -------------------------
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings.count() == 0:
            return 0
        return round(sum(r.value for r in ratings) / ratings.count(), 1)

    # -------------------------
    #  تعداد نظرات
    # -------------------------
    def get_comments_count(self, obj):
        return obj.comments.count()

    # -------------------------
    #  دسترسی کاربر به دوره
    # -------------------------
    def get_has_access(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False

        return Enrollment.objects.filter(
            user=request.user,
            course=obj
        ).exists()


# ---------------------------------------------------
#  Lesson Progress Serializer
# ---------------------------------------------------
class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ["watched_seconds", "completed"]
