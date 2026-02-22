from rest_framework import generics
from .models import Post, Category, Tag
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    CategorySerializer,
    TagSerializer,
)


class PostListView(generics.ListAPIView):
    queryset = Post.objects.filter(status="published").select_related("category", "author").prefetch_related("tags")
    serializer_class = PostListSerializer


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(status="published").select_related("category", "author").prefetch_related("tags")
    serializer_class = PostDetailSerializer
    lookup_field = "slug"


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
