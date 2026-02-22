from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Profile, InstructorProfile, Enrollment, TeacherApplication,JobOpening
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    InstructorProfileSerializer,
    EnrollmentSerializer,
    TeacherApplicationAdminSerializer,
    JobOpeningAdminSerializer
)
from notifications.utils import create_notification
from django.utils import timezone

class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related("profile", "instructor_profile")
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class EnrollmentAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Enrollment.objects.select_related("user", "course")
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdminUser]


class ProfileAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.select_related("user")
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class InstructorProfileAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InstructorProfile.objects.select_related("user")
    serializer_class = InstructorProfileSerializer
    permission_classes = [IsAdminUser]



# accounts/admin_api.py



class TeacherApplicationAdminViewSet(viewsets.ModelViewSet):
    queryset = TeacherApplication.objects.select_related("user").order_by("-created_at")
    serializer_class = TeacherApplicationAdminSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        app = self.get_object()
        if app.status == "accepted":
            return Response({"detail": "این درخواست قبلاً تأیید شده است."}, status=400)

        app.status = "accepted"
        app.reviewed_at = timezone.now()
        app.admin_note = request.data.get("admin_note", app.admin_note)
        app.save()

        user = app.user
        if not user.is_teacher:
            user.is_teacher = True
            user.save()

        # ساخت یا آپدیت پروفایل مدرس
        InstructorProfile.objects.get_or_create(user=user)

        # نوتیفیکیشن برای کاربر
        create_notification(
            user=user,
            type_="system",
            title="تأیید درخواست مدرس شدن",
            message="درخواست شما برای تبدیل شدن به مدرس تأیید شد. اکنون می‌توانید دوره‌های خود را ثبت کنید.",
            target_url="/dashboard/instructor",
        )

        return Response({"detail": "درخواست تأیید شد و کاربر به مدرس تبدیل شد."})

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        app = self.get_object()
        if app.status == "rejected":
            return Response({"detail": "این درخواست قبلاً رد شده است."}, status=400)

        reason = request.data.get("reason", "")
        app.status = "rejected"
        app.reviewed_at = timezone.now()
        app.admin_note = reason
        app.save()

        # نوتیفیکیشن برای کاربر
        create_notification(
            user=app.user,
            type_="warning",
            title="رد درخواست مدرس شدن",
            message=reason or "درخواست شما برای تبدیل شدن به مدرس رد شد.",
            target_url="/profile",
        )

        return Response({"detail": "درخواست رد شد."})


class JobOpeningAdminViewSet(viewsets.ModelViewSet):
    queryset = JobOpening.objects.all().order_by("-created_at")
    serializer_class = JobOpeningAdminSerializer
    permission_classes = [IsAdminUser]
