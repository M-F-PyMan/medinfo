from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Coupon, CouponRedemption
from .admin_serializers import CouponAdminSerializer, CouponRedemptionAdminSerializer


class CouponAdminViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all().prefetch_related("courses", "assigned_user")
    serializer_class = CouponAdminSerializer
    permission_classes = [IsAdminUser]


class CouponRedemptionAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CouponRedemption.objects.all().select_related("coupon", "user")
    serializer_class = CouponRedemptionAdminSerializer
    permission_classes = [IsAdminUser]
