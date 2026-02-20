# notifications/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import NotificationAdminViewSet

router = DefaultRouter()
router.register("admin/notifications", NotificationAdminViewSet, basename="admin-notifications")

urlpatterns = router.urls
