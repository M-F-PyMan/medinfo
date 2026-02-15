from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, CourseMessageViewSet

router = DefaultRouter()
router.register("tickets", TicketViewSet, basename="tickets")
router.register("course-messages", CourseMessageViewSet, basename="course-messages")

urlpatterns = [
    path("", include(router.urls)),
]
