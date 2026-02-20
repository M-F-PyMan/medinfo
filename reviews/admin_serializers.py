from rest_framework import serializers
from .models import Rating, Comment, CommentReport
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class RatingAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseAdminSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = [
            "id",
            "user",
            "course",
            "value",
            "created_at",
        ]


class CommentAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseAdminSerializer(read_only=True)
    reports_count = serializers.IntegerField(source="reports.count", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "course",
            "text",
            "reports_count",
            "created_at",
        ]


class CommentReportAdminSerializer(serializers.ModelSerializer):
    reporter = UserSerializer(read_only=True)
    comment_text = serializers.CharField(source="comment.text", read_only=True)

    class Meta:
        model = CommentReport
        fields = [
            "id",
            "reporter",
            "comment",
            "comment_text",
            "reason",
            "created_at",
        ]
