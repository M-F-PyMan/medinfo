# wallet/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import (
    WalletAdminViewSet,
    WalletTransactionAdminViewSet,
    WalletChargeRequestAdminViewSet,
)

router = DefaultRouter()
router.register("admin/wallets", WalletAdminViewSet, basename="admin-wallets")
router.register("admin/wallet-transactions", WalletTransactionAdminViewSet, basename="admin-wallet-transactions")
router.register("admin/wallet-charge-requests", WalletChargeRequestAdminViewSet, basename="admin-wallet-charge-requests")

urlpatterns = router.urls
