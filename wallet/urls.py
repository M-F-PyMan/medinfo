from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    WalletViewSet,
    WalletAdminViewSet,
    WalletTransactionAdminViewSet,
    WalletChargeRequestAdminViewSet,
)
from .views_dashboard import finance_dashboard

router = DefaultRouter()
router.register("wallet", WalletViewSet, basename="wallet")
router.register("admin/wallets", WalletAdminViewSet, basename="admin-wallets")
router.register("admin/wallet-transactions", WalletTransactionAdminViewSet, basename="admin-wallet-transactions")
router.register("admin/wallet-charges", WalletChargeRequestAdminViewSet, basename="admin-wallet-charges")

urlpatterns = [
    path("", include(router.urls)),
    path("admin/finance-dashboard/", finance_dashboard),
]
