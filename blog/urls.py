from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    CategoryListView,
    TagListView,
)

urlpatterns = [
    path("posts/", PostListView.as_view(), name="blog-posts"),
    path("posts/<slug:slug>/", PostDetailView.as_view(), name="blog-post-detail"),
    path("categories/", CategoryListView.as_view(), name="blog-categories"),
    path("tags/", TagListView.as_view(), name="blog-tags"),
]
