from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet,InstructorReviewViewSet

router = DefaultRouter()
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("instructor-reviews", InstructorReviewViewSet, basename="instructor-reviews")

urlpatterns = [
    path("", include(router.urls)),
]
