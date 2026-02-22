from rest_framework.routers import DefaultRouter
from .admin_api import PostAdminViewSet, CategoryAdminViewSet, TagAdminViewSet

router = DefaultRouter()
router.register("admin/blog/posts", PostAdminViewSet, basename="admin-blog-posts")
router.register("admin/blog/categories", CategoryAdminViewSet, basename="admin-blog-categories")
router.register("admin/blog/tags", TagAdminViewSet, basename="admin-blog-tags")

urlpatterns = router.urls
