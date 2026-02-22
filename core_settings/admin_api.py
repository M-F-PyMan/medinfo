from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import SiteSettings
from .admin_serializers import SiteSettingsAdminSerializer

class SiteSettingsAdminView(generics.RetrieveUpdateAPIView):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsAdminSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        obj, created = SiteSettings.objects.get_or_create(pk=1)
        return obj
