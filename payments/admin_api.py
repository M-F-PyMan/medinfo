from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Transaction, Cart
from .admin_serializers import PaymentAdminSerializer, CartAdminSerializer


class PaymentAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Transaction.objects.all().select_related("user", "course")
    serializer_class = PaymentAdminSerializer
    permission_classes = [IsAdminUser]


class CartAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cart.objects.all().select_related("user")
    serializer_class = CartAdminSerializer
    permission_classes = [IsAdminUser]
