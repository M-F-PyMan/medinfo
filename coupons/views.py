from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .serializers import CouponValidateSerializer
from .models import Coupon, CouponRedemption


class CouponViewSet(viewsets.ViewSet):

    # -------------------------
    #  وریفای کوپن (برای کاربر)
    # -------------------------
    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def validate(self, request):
        serializer = CouponValidateSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        coupon = serializer.validated_data["coupon"]
        course_id = serializer.validated_data["course_id"]

        return Response({
            "valid": True,
            "code": coupon.code,
            "discount_type": coupon.discount_type,
            "amount": coupon.amount,
            "course_id": course_id,
        })

