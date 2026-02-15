from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, MyCoursesView

router = DefaultRouter()
router.register("auth", AuthViewSet, basename="auth")

urlpatterns = [
    path("me/courses/", MyCoursesView.as_view(), name="my-courses"),
    path("", include(router.urls)),
]
