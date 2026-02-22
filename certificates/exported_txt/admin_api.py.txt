from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Certificate
from .admin_serializers import CertificateAdminSerializer


class CertificateAdminViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().select_related("user", "course")
    serializer_class = CertificateAdminSerializer
    permission_classes = [IsAdminUser]
