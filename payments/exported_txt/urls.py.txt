from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, CartViewSet

app_name = "payments"

router = DefaultRouter()
router.register("payments", PaymentViewSet, basename="payments")
router.register("cart", CartViewSet, basename="cart")

urlpatterns = [
    path("", include(router.urls)),
]
