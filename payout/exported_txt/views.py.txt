from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum

from .models import InstructorEarning, PayoutRequest
from .serializers import PayoutRequestSerializer
from notifications.utils import create_notification


class PayoutViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _is_instructor(self, user):
        return getattr(user, "is_teacher", False)

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

    @action(detail=False, methods=["get"])
    def requests(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = PayoutRequest.objects.filter(instructor=user).order_by("-created_at")
        return Response(PayoutRequestSerializer(qs, many=True).data)

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

        return Response(PayoutRequestSerializer(payout).data)
