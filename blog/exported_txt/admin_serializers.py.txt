from rest_framework import serializers
from .models import Post, Category, Tag
from accounts.serializers import UserSerializer


class CategoryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "title", "slug"]


class TagAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "title", "slug"]


class PostAdminSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category_title = serializers.CharField(source="category.title", read_only=True)
    tags_list = serializers.StringRelatedField(source="tags", many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "cover_image",
            "category",
            "category_title",
            "tags",
            "tags_list",
            "author",
            "status",
            "reading_time",
            "meta_title",
            "meta_description",
            "og_image",
            "created_at",
            "updated_at",
        ]
