# courses/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import CourseAdminViewSet, LessonAdminViewSet

router = DefaultRouter()
router.register("admin/courses", CourseAdminViewSet, basename="admin-courses")
router.register("admin/lessons", LessonAdminViewSet, basename="admin-lessons")

urlpatterns = router.urls
