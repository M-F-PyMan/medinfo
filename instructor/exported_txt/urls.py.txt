from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstructorDashboardViewSet

router = DefaultRouter()
router.register("instructor/dashboard", InstructorDashboardViewSet, basename="instructor-dashboard")

urlpatterns = [
    path("", include(router.urls)),
]
