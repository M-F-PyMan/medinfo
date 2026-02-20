# wishlist/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import WishlistItemAdminViewSet

router = DefaultRouter()
router.register("admin/wishlist-items", WishlistItemAdminViewSet, basename="admin-wishlist-items")

urlpatterns = router.urls
