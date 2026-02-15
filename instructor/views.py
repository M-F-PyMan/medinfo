from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Sum

from courses.models import Course
from payout.models import InstructorEarning, PayoutRequest
from notifications.models import Notification
from courses.serializers import CourseListSerializer
from payout.serializers import PayoutRequestSerializer
from notifications.serializers import NotificationSerializer  # باید بسازی/ایمپورت کنی


class InstructorDashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _is_instructor(self, user):
        return getattr(user, "is_teacher", False)

    @action(detail=False, methods=["get"])
    def overview(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        courses = Course.objects.filter(teacher=user)
        courses_count = courses.count()

        students_count = courses.aggregate(
            s=Count("enrollments", distinct=True)
        )["s"] or 0

        total_earned = InstructorEarning.objects.filter(instructor=user).aggregate(
            s=Sum("instructor_amount")
        )["s"] or 0

        total_paid = PayoutRequest.objects.filter(
            instructor=user,
            status="PAID",
        ).aggregate(s=Sum("amount"))["s"] or 0

        withdrawable = max(0, total_earned - total_paid)

        return Response({
            "courses_count": courses_count,
            "students_count": students_count,
            "total_earned": total_earned,
            "total_paid": total_paid,
            "withdrawable": withdrawable,
        })

    @action(detail=False, methods=["get"])
    def courses(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        courses = Course.objects.filter(teacher=user).order_by("-id")
        return Response(CourseListSerializer(courses, many=True).data)

    @action(detail=False, methods=["get"])
    def payouts(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = PayoutRequest.objects.filter(instructor=user).order_by("-created_at")
        return Response(PayoutRequestSerializer(qs, many=True).data)

    @action(detail=False, methods=["get"])
    def notifications(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = Notification.objects.filter(user=user).order_by("-created_at")[:50]
        return Response(NotificationSerializer(qs, many=True).data)
