from rest_framework import serializers
from .models import Rating, Comment,InstructorReview


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "value", "created_at"]


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user_name", "text", "created_at"]


class CommentReportSerializer(serializers.Serializer):
    reason = serializers.CharField()

class InstructorReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = InstructorReview
        fields = ["id", "user_name", "rating", "comment", "created_at"]
