from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, F

from .models import InstructorEarning, PayoutRequest
from .serializers import (
    PayoutRequestSerializer,
    InstructorEarningSerializer,
    EarningsByCourseSerializer,
    EarningsByMonthSerializer,
)
from notifications.utils import create_notification


class PayoutViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _is_instructor(self, user):
        return getattr(user, "is_teacher", False)

    # -------------------------
    # موجودی کلی مدرس
    # -------------------------
    @action(detail=False, methods=["get"])
    def balance(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        total_earned = InstructorEarning.objects.filter(instructor=user).aggregate(
            s=Sum("instructor_amount")
        )["s"] or 0

        total_paid = PayoutRequest.objects.filter(
            instructor=user,
            status="PAID",
        ).aggregate(s=Sum("amount"))["s"] or 0

        withdrawable = max(0, total_earned - total_paid)

        return Response({
            "total_earned": total_earned,
            "total_paid": total_paid,
            "withdrawable": withdrawable,
        })

    # -------------------------
    # لیست درخواست‌های تسویه مدرس
    # -------------------------
    @action(detail=False, methods=["get"])
    def requests(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = PayoutRequest.objects.filter(instructor=user).order_by("-created_at")
        serializer = PayoutRequestSerializer(qs, many=True, context={"request": request})
        return Response(serializer.data)

    # -------------------------
    # ثبت درخواست تسویه
    # -------------------------
    @action(detail=False, methods=["post"])
    def request_payout(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        total_earned = InstructorEarning.objects.filter(instructor=user).aggregate(
            s=Sum("instructor_amount")
        )["s"] or 0
        total_paid = PayoutRequest.objects.filter(
            instructor=user,
            status="PAID",
        ).aggregate(s=Sum("amount"))["s"] or 0
        withdrawable = max(0, total_earned - total_paid)

        try:
            amount = int(request.data.get("amount", 0))
        except ValueError:
            return Response({"error": "مبلغ نامعتبر است"}, status=400)

        if amount <= 0:
            return Response({"error": "مبلغ باید بزرگتر از صفر باشد"}, status=400)

        if amount > withdrawable:
            return Response({"error": "مبلغ درخواستی بیشتر از موجودی قابل برداشت است"}, status=400)

        payout = PayoutRequest.objects.create(
            instructor=user,
            amount=amount,
        )

        create_notification(
            user=user,
            type_="payment",
            title="درخواست تسویه ثبت شد",
            message=f"درخواست تسویه به مبلغ {amount} ثبت شد و در انتظار بررسی است.",
            target_url="/instructor/payouts/",
        )

        return Response(PayoutRequestSerializer(payout, context={"request": request}).data)

    # -------------------------
    # گزارش: لیست درآمدها (تراکنش‌ها)
    # -------------------------
    @action(detail=False, methods=["get"])
    def earnings_transactions(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = (
            InstructorEarning.objects
            .filter(instructor=user)
            .select_related("course")
            .order_by("-created_at")
        )
        serializer = InstructorEarningSerializer(qs, many=True)
        return Response(serializer.data)

    # -------------------------
    # گزارش: درآمد بر اساس دوره
    # -------------------------
    @action(detail=False, methods=["get"])
    def earnings_by_course(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = (
            InstructorEarning.objects
            .filter(instructor=user)
            .values("course_id", "course__title")
            .annotate(
                total_gross=Sum("gross_amount"),
                total_instructor=Sum("instructor_amount"),
                total_platform=Sum("platform_amount"),
            )
            .order_by("-total_instructor")
        )

        data = [
            {
                "course_id": row["course_id"],
                "course_title": row["course__title"],
                "total_gross": row["total_gross"] or 0,
                "total_instructor": row["total_instructor"] or 0,
                "total_platform": row["total_platform"] or 0,
            }
            for row in qs
        ]

        serializer = EarningsByCourseSerializer(data, many=True)
        return Response(serializer.data)

    # -------------------------
    # گزارش: درآمد ماهانه
    # -------------------------
    @action(detail=False, methods=["get"])
    def earnings_by_month(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = (
            InstructorEarning.objects
            .filter(instructor=user)
            .annotate(
                year=F("created_at__year"),
                month=F("created_at__month"),
            )
            .values("year", "month")
            .annotate(
                total_instructor=Sum("instructor_amount"),
            )
            .order_by("year", "month")
        )

        data = [
            {
                "year": row["year"],
                "month": row["month"],
                "total_instructor": row["total_instructor"] or 0,
            }
            for row in qs
        ]

        serializer = EarningsByMonthSerializer(data, many=True)
        return Response(serializer.data)
