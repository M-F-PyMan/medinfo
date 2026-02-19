# coupons/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import CouponAdminViewSet, CouponRedemptionAdminViewSet

router = DefaultRouter()
router.register("admin/coupons", CouponAdminViewSet, basename="admin-coupons")
router.register("admin/coupon-redemptions", CouponRedemptionAdminViewSet, basename="admin-coupon-redemptions")

urlpatterns = router.urls
