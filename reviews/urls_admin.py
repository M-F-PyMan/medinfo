# reviews/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import (
    RatingAdminViewSet,
    CommentAdminViewSet,
    CommentReportAdminViewSet,
)

router = DefaultRouter()
router.register("admin/ratings", RatingAdminViewSet, basename="admin-ratings")
router.register("admin/comments", CommentAdminViewSet, basename="admin-comments")
router.register("admin/comment-reports", CommentReportAdminViewSet, basename="admin-comment-reports")

urlpatterns = router.urls
