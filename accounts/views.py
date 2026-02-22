from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.db.models import Avg, Count
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    MeSerializer,
    UserSerializer,
    InstructorPublicSerializer,
    TeacherApplicationSerializer,
    JobOpeningSerializer,
)
from .models import User, Enrollment, TeacherApplication, InstructorProfile,JobOpening
from courses.serializers import CourseListSerializer
from notifications.utils import create_notification
from django.utils import timezone

class TeacherApplicationViewSet(viewsets.ModelViewSet):
    """
    این ViewSet برای خود کاربر است:
    - ارسال درخواست جدید
    - مشاهده لیست درخواست‌های خودش
    - مشاهده جزئیات درخواست خودش
    """
    serializer_class = TeacherApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TeacherApplication.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        # اگر کاربر قبلاً مدرس است، اجازه ثبت درخواست جدید نده
        if self.request.user.is_teacher:
            raise serializers.ValidationError("شما هم‌اکنون به عنوان مدرس فعال هستید.")

        # اگر درخواست در انتظار دارد، اجازه ثبت درخواست جدید نده
        if TeacherApplication.objects.filter(user=self.request.user, status="pending").exists():
            raise serializers.ValidationError("شما یک درخواست در حال بررسی دارید.")

        app = serializer.save(user=self.request.user)

        # نوتیفیکیشن برای کاربر
        create_notification(
            user=self.request.user,
            type_="system",
            title="ثبت درخواست مدرس شدن",
            message="درخواست شما برای تبدیل شدن به مدرس ثبت شد و در حال بررسی است.",
            target_url="/profile",
        )

        # (اختیاری) نوتیفیکیشن برای ادمین‌ها اگر خواستی بعداً اضافه می‌کنیم
        return app


class MyCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(user=request.user).select_related("course")
        courses = [en.course for en in enrollments]
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data)


class AuthViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "ثبت‌نام با موفقیت انجام شد",
            "user": UserSerializer(user).data
        })

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data
        })

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        return Response(MeSerializer(request.user).data)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def logout(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass

        return Response({"message": "خروج انجام شد"})


class InstructorPublicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(is_teacher=True).select_related(
        "profile", "instructor_profile"
    )
    serializer_class = InstructorPublicSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = self.queryset

        # مرتب‌سازی
        ordering = self.request.GET.get("ordering")
        if ordering == "rating":
            qs = qs.annotate(avg_rating=Avg("teacher_courses__ratings__value")).order_by("-avg_rating")
        elif ordering == "students":
            qs = qs.annotate(st_count=Count("teacher_courses__enrollments")).order_by("-st_count")

        # محدودیت تعداد
        limit = self.request.GET.get("limit")
        if limit:
            qs = qs[: int(limit)]

        return qs


class JobOpeningViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobOpening.objects.all().order_by("-created_at")
    serializer_class = JobOpeningSerializer
    permission_classes = [AllowAny]
