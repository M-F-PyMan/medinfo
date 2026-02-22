from rest_framework import serializers
from .models import SiteSettings

class SiteSettingsAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"
