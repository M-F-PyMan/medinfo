from django.urls import path
from .admin_api import SiteSettingsAdminView

urlpatterns = [
    path("admin/settings/", SiteSettingsAdminView.as_view(), name="admin-settings"),
]
