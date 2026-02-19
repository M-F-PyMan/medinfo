from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import Sum, Count

from payments.models import Transaction
from wallet.models import WalletTransaction
from payout.models import InstructorEarning


@api_view(["GET"])
@permission_classes([IsAdminUser])
def finance_dashboard(request):
    platform_income = InstructorEarning.objects.aggregate(total=Sum("platform_amount"))["total"] or 0
    instructor_income = InstructorEarning.objects.aggregate(total=Sum("instructor_amount"))["total"] or 0
    wallet_charges = WalletTransaction.objects.filter(type="CHARGE").aggregate(total=Sum("amount"))["total"] or 0
    wallet_payments = WalletTransaction.objects.filter(type="PAYMENT").aggregate(total=Sum("amount"))["total"] or 0
    gateway_payments = Transaction.objects.filter(status="SUCCESS").aggregate(total=Sum("amount"))["total"] or 0

    def monthly(qs, field="amount"):
        return list(
            qs.extra(select={"month": "strftime('%m', created_at)"})
            .values("month")
            .annotate(total=Sum(field))
            .order_by("month")
        )

    monthly_sales = monthly(Transaction.objects.filter(status="SUCCESS"))
    monthly_instructor = monthly(InstructorEarning.objects.all(), "instructor_amount")
    monthly_platform = monthly(InstructorEarning.objects.all(), "platform_amount")
    monthly_wallet_charges = monthly(WalletTransaction.objects.filter(type="CHARGE"))
    monthly_wallet_payments = monthly(WalletTransaction.objects.filter(type="PAYMENT"))

    transaction_counts = list(
        Transaction.objects.extra(select={"month": "strftime('%m', created_at)"})
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    return Response({
        "platform_income": platform_income,
        "instructor_income": instructor_income,
        "wallet_charges": wallet_charges,
        "wallet_payments": abs(wallet_payments),
        "gateway_payments": gateway_payments,
        "monthly_sales": monthly_sales,
        "monthly_instructor": monthly_instructor,
        "monthly_platform": monthly_platform,
        "monthly_wallet_charges": monthly_wallet_charges,
        "monthly_wallet_payments": monthly_wallet_payments,
        "transaction_counts": transaction_counts,
    })
