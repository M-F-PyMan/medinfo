from datetime import timedelta
from django.utils.timezone import now
from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from accounts.models import User
from courses.models import Course
from messaging.models import Ticket
from payments.models import Transaction
from wallet.models import Wallet, WalletTransaction, WalletChargeRequest
from payout.models import InstructorEarning, PayoutRequest


class DashboardAdminView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        # ============================================================
        # TAB 1 — Admin Overview
        # ============================================================

        stats = {
            "total_users": User.objects.count(),
            "total_courses": Course.objects.count(),
            "total_transactions": Transaction.objects.count(),
            "successful_transactions": Transaction.objects.filter(status="SUCCESS").count(),
            "total_revenue": Transaction.objects.filter(status="SUCCESS").aggregate(
                total=Sum("amount")
            )["total"] or 0,
            "open_tickets": Ticket.objects.filter(status="open").count()
            if hasattr(Ticket, "status") else 0,
            "total_wallet_balance": Wallet.objects.aggregate(total=Sum("balance"))["total"] or 0,
        }

        # درآمد ماهانه (۱۲ ماه اخیر)
        monthly_revenue = []
        today = now().date()

        for i in range(12):
            month_start = (today.replace(day=1) - timedelta(days=30 * i)).replace(day=1)
            month_end = (month_start + timedelta(days=32)).replace(day=1)

            amount = (
                Transaction.objects.filter(
                    status="SUCCESS",
                    created_at__gte=month_start,
                    created_at__lt=month_end,
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            monthly_revenue.append({
                "month": month_start.strftime("%Y-%m"),
                "amount": amount,
            })

        monthly_revenue.reverse()

        # درآمد مدرس‌ها (برای نمودار میله‌ای)
        teacher_revenue = []
        teachers = User.objects.filter(role="teacher")

        for t in teachers:
            revenue = (
                Transaction.objects.filter(
                    status="SUCCESS",
                    course__teacher=t
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            teacher_revenue.append({
                "teacher_id": t.id,
                "teacher_name": t.get_full_name() or t.username,
                "revenue": revenue,
            })

        # آخرین تراکنش‌ها
        latest_transactions = list(
            Transaction.objects.filter(status="SUCCESS")
            .select_related("user", "course")
            .order_by("-created_at")[:10]
            .values(
                "user__email",
                "course__title",
                "amount",
                "wallet_used",
                "gateway_used",
                "is_cart_payment",
                "created_at",
            )
        )

        # آخرین تراکنش‌های کیف پول
        latest_wallet = list(
            WalletTransaction.objects.select_related("wallet", "wallet__user")
            .order_by("-created_at")[:10]
            .values(
                "wallet__user__email",
                "amount",
                "type",
                "description",
                "created_at",
            )
        )

        # ============================================================
        # TAB 2 — Finance Dashboard
        # ============================================================

        platform_income = InstructorEarning.objects.aggregate(
            total=Sum("platform_amount")
        )["total"] or 0

        instructor_income = InstructorEarning.objects.aggregate(
            total=Sum("instructor_amount")
        )["total"] or 0

        wallet_charges = WalletTransaction.objects.filter(type="CHARGE").aggregate(
            total=Sum("amount")
        )["total"] or 0

        wallet_payments = WalletTransaction.objects.filter(type="PAYMENT").aggregate(
            total=Sum("amount")
        )["total"] or 0

        gateway_payments = Transaction.objects.filter(status="SUCCESS").aggregate(
            total=Sum("gateway_used")
        )["total"] or 0

        # خریدهای دوره
        course_purchases = list(
            Transaction.objects.filter(status="SUCCESS")
            .select_related("user", "course")
            .order_by("-created_at")[:20]
            .values(
                "user__email",
                "course__title",
                "amount",
                "wallet_used",
                "gateway_used",
                "is_cart_payment",
                "created_at",
            )
        )

        # -----------------------------
        # WalletChargeRequest (NEW)
        # -----------------------------
        wallet_charge_requests = list(
            WalletChargeRequest.objects.select_related("user")
            .order_by("-created_at")[:20]
            .values(
                "user__email",
                "amount",
                "status",
                "authority",
                "created_at",
            )
        )

        pending_wallet_charges = WalletChargeRequest.objects.filter(status="PENDING").count()
        successful_wallet_charges = WalletChargeRequest.objects.filter(status="SUCCESS").count()
        failed_wallet_charges = WalletChargeRequest.objects.filter(status="FAIL").count()

        # ============================================================
        # TAB 3 — Instructor Analytics (Admin View)
        # ============================================================

        instructor_stats = []

        for t in teachers:
            earnings = InstructorEarning.objects.filter(instructor=t)

            instructor_stats.append({
                "teacher_id": t.id,
                "teacher_name": t.get_full_name() or t.username,
                "total_earnings": earnings.aggregate(total=Sum("instructor_amount"))["total"] or 0,
                "course_count": Course.objects.filter(teacher=t).count(),
                "student_count": Course.objects.filter(teacher=t).aggregate(
                    total=Sum("students_count")
                )["total"] or 0,
            })

        payout_requests = list(
            PayoutRequest.objects.select_related("instructor")
            .order_by("-created_at")[:20]
            .values(
                "instructor__email",
                "amount",
                "status",
                "created_at",
                "processed_at",
                "reference_code",
            )
        )

        # ============================================================
        # RESPONSE
        # ============================================================

        return Response({
            "admin_overview": {
                "stats": stats,
                "monthly_revenue": monthly_revenue,
                "teacher_revenue": teacher_revenue,
                "latest_transactions": latest_transactions,
                "latest_wallet": latest_wallet,
            },
            "finance_dashboard": {
                "platform_income": platform_income,
                "instructor_income": instructor_income,
                "wallet_charges": wallet_charges,
                "wallet_payments": abs(wallet_payments),
                "gateway_payments": gateway_payments,
                "course_purchases": course_purchases,

                # NEW
                "wallet_charge_requests": wallet_charge_requests,
                "pending_wallet_charges": pending_wallet_charges,
                "successful_wallet_charges": successful_wallet_charges,
                "failed_wallet_charges": failed_wallet_charges,
            },
            "instructor_analytics": {
                "instructor_stats": instructor_stats,
                "payout_requests": payout_requests,
            },
        })
