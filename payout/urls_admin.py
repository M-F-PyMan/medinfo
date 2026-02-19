# payout/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import (
    PlatformConfigAdminViewSet,
    InstructorEarningAdminViewSet,
    PayoutRequestAdminViewSet,
)

router = DefaultRouter()
router.register("admin/platform-config", PlatformConfigAdminViewSet)
router.register("admin/instructor-earnings", InstructorEarningAdminViewSet)
router.register("admin/payout-requests", PayoutRequestAdminViewSet)

urlpatterns = router.urls
