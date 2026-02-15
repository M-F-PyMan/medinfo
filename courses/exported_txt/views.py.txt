from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from .models import Course, Lesson, LessonProgress
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    LessonSerializer,
    LessonProgressSerializer,
)
from accounts.models import Enrollment
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.db.models import Count, Avg





class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all().order_by("-id")
    lookup_field = "slug"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return CourseListSerializer
        return CourseDetailSerializer

    # -------------------------
    #  بررسی دسترسی کاربر
    # -------------------------
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def has_access(self, request, slug=None):
        course = self.get_object()
        user = request.user

        enrolled = Enrollment.objects.filter(user=user, course=course).exists()

        return Response({
            "enrolled": enrolled,
            "course_id": course.id,
            "user_id": user.id
        })

    # -------------------------
    #  درصد پیشرفت دوره
    # -------------------------
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def progress(self, request, slug=None):
        course = self.get_object()
        user = request.user

        lessons = course.lessons.count()
        completed = LessonProgress.objects.filter(
            user=user,
            lesson__course=course,
            completed=True
        ).count()

        percent = int((completed / lessons) * 100) if lessons > 0 else 0

        return Response({
            "course": course.title,
            "completed_lessons": completed,
            "total_lessons": lessons,
            "percent": percent
        })


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Lesson.objects.filter(
            course__slug=self.kwargs["course_slug"]
        ).order_by("order")

    # -------------------------
    #  ثبت پیشرفت کاربر
    # -------------------------
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def progress(self, request, course_slug=None, pk=None):
        lesson = self.get_object()
        user = request.user

        progress, created = LessonProgress.objects.get_or_create(
            user=user,
            lesson=lesson
        )

        serializer = LessonProgressSerializer(progress, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Progress updated"})


class CourseSearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Course.objects.all()

        # -------------------------
        #  جستجو
        # -------------------------
        q = request.GET.get("q")
        if q:
            queryset = queryset.filter(
                Q(title__icontains=q) |
                Q(description__icontains=q)
            )

        # -------------------------
        #  فیلتر دسته‌بندی
        # -------------------------
        category = request.GET.get("category")
        if category:
            queryset = queryset.filter(category=category)

        # -------------------------
        #  فیلتر سطح
        # -------------------------
        level = request.GET.get("level")
        if level:
            queryset = queryset.filter(level=level)

        # -------------------------
        #  فیلتر قیمت
        # -------------------------
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # -------------------------
        #  مرتب‌سازی
        # -------------------------
        ordering = request.GET.get("ordering")
        if ordering == "newest":
            queryset = queryset.order_by("-id")
        elif ordering == "price_low":
            queryset = queryset.order_by("price")
        elif ordering == "price_high":
            queryset = queryset.order_by("-price")

        serializer = CourseListSerializer(queryset, many=True)
        return Response(serializer.data)





class HomeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # -------------------------
        #  جدیدترین دوره‌ها
        # -------------------------
        newest = Course.objects.order_by("-id")[:8]

        # -------------------------
        #  پرفروش‌ترین دوره‌ها
        # -------------------------
        best_sellers = Course.objects.annotate(
            enroll_count=Count("enrollments")
        ).order_by("-enroll_count")[:8]

        # -------------------------
        #  محبوب‌ترین دوره‌ها (بر اساس امتیاز)
        # -------------------------
        top_rated = Course.objects.annotate(
            avg_rating=Avg("ratings__value")
        ).order_by("-avg_rating")[:8]

        # -------------------------
        #  دسته‌بندی‌ها (unique)
        # -------------------------
        categories = Course.objects.values_list("category", flat=True).distinct()

        return Response({
            "newest": CourseListSerializer(newest, many=True).data,
            "best_sellers": CourseListSerializer(best_sellers, many=True).data,
            "top_rated": CourseListSerializer(top_rated, many=True).data,
            "categories": categories,
        })
