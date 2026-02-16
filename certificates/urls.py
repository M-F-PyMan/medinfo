from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet,CertificateVerifyPage

router = DefaultRouter()
router.register("certificates", CertificateViewSet, basename="certificates")

urlpatterns = [
    path("", include(router.urls)),
    path("certificate/verify/<str:serial>/", CertificateVerifyPage.as_view(), name="certificate-verify"),
]
