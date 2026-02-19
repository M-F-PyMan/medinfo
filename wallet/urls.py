from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WalletViewSet

app_name = "wallet"

router = DefaultRouter()
router.register("wallet", WalletViewSet, basename="wallet")

urlpatterns = [
    path("", include(router.urls)),
]
