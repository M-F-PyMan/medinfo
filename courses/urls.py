from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, LessonViewSet

router = DefaultRouter()
router.register("courses", CourseViewSet, basename="courses")

urlpatterns = [
    path("", include(router.urls)),

    # لیست جلسات یک دوره
    path(
        "courses/<slug:course_slug>/lessons/",
        LessonViewSet.as_view({"get": "list"}),
        name="course-lessons"
    ),

    # ثبت پیشرفت یک جلسه
    path(
        "courses/<slug:course_slug>/lessons/<int:pk>/progress/",
        LessonViewSet.as_view({"post": "progress"}),
        name="lesson-progress"
    ),
]
