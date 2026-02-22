from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Rating, Comment, CommentReport
from .admin_serializers import (
    RatingAdminSerializer,
    CommentAdminSerializer,
    CommentReportAdminSerializer,
)


class RatingAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Rating.objects.all().select_related("user", "course")
    serializer_class = RatingAdminSerializer
    permission_classes = [IsAdminUser]


class CommentAdminViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().select_related("user", "course")
    serializer_class = CommentAdminSerializer
    permission_classes = [IsAdminUser]


class CommentReportAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CommentReport.objects.all().select_related("reporter", "comment")
    serializer_class = CommentReportAdminSerializer
    permission_classes = [IsAdminUser]
