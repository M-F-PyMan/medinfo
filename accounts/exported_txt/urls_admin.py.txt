from rest_framework.routers import DefaultRouter
from .admin_api import (
    UserAdminViewSet,
    EnrollmentAdminViewSet,
    ProfileAdminViewSet,
    InstructorProfileAdminViewSet,
    TeacherApplicationAdminViewSet,
    JobOpeningAdminViewSet,
)

router = DefaultRouter()
router.register("admin/users", UserAdminViewSet)
router.register("admin/enrollments", EnrollmentAdminViewSet)
router.register("admin/profiles", ProfileAdminViewSet)
router.register("admin/instructor-profiles", InstructorProfileAdminViewSet)
router.register("admin/teacher-applications", TeacherApplicationAdminViewSet, basename="admin-teacher-applications")
urlpatterns = router.urls
router.register("admin/job-openings", JobOpeningAdminViewSet, basename="admin-job-openings")