from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import PlatformConfig, InstructorEarning, PayoutRequest
from .admin_serializers import (
    PlatformConfigAdminSerializer,
    InstructorEarningAdminSerializer,
    PayoutRequestAdminSerializer,
)


class PlatformConfigAdminViewSet(viewsets.ModelViewSet):
    queryset = PlatformConfig.objects.all()
    serializer_class = PlatformConfigAdminSerializer
    permission_classes = [IsAdminUser]


class InstructorEarningAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InstructorEarning.objects.all().select_related("instructor", "course", "transaction")
    serializer_class = InstructorEarningAdminSerializer
    permission_classes = [IsAdminUser]


class PayoutRequestAdminViewSet(viewsets.ModelViewSet):
    queryset = PayoutRequest.objects.all().select_related("instructor")
    serializer_class = PayoutRequestAdminSerializer
    permission_classes = [IsAdminUser]
