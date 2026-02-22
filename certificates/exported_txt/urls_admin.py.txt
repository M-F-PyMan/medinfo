# certificates/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import CertificateAdminViewSet

router = DefaultRouter()
router.register("admin/certificates", CertificateAdminViewSet, basename="admin-certificates")

urlpatterns = router.urls
