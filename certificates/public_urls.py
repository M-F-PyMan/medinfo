from django.urls import path
from .views import CertificateVerifyPage

urlpatterns = [
    path("certificate/verify/<str:serial>/", CertificateVerifyPage.as_view(), name="certificate-verify"),
]
