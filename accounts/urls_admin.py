from rest_framework.routers import DefaultRouter
from .admin_api import (
    UserAdminViewSet,
    EnrollmentAdminViewSet,
    ProfileAdminViewSet,
    InstructorProfileAdminViewSet,
)

router = DefaultRouter()
router.register("admin/users", UserAdminViewSet)
router.register("admin/enrollments", EnrollmentAdminViewSet)
router.register("admin/profiles", ProfileAdminViewSet)
router.register("admin/instructor-profiles", InstructorProfileAdminViewSet)

urlpatterns = router.urls
