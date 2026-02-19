# payments/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import PaymentAdminViewSet, CartAdminViewSet

router = DefaultRouter()
router.register("admin/payments", PaymentAdminViewSet, basename="admin-payments")
router.register("admin/carts", CartAdminViewSet, basename="admin-carts")

urlpatterns = router.urls
