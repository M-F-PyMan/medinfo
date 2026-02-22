from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Post, Category, Tag
from .admin_serializers import (
    PostAdminSerializer,
    CategoryAdminSerializer,
    TagAdminSerializer,
)


class PostAdminViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related("category", "author")
    serializer_class = PostAdminSerializer
    permission_classes = [IsAdminUser]


class CategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryAdminSerializer
    permission_classes = [IsAdminUser]


class TagAdminViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagAdminSerializer
    permission_classes = [IsAdminUser]
