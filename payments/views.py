from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404
from django.urls import reverse

from azbankgateways import bankfactories, models as bank_models, default_settings as settings
from azbankgateways.exceptions import AZBankGatewaysException

from accounts.models import Enrollment
from courses.models import Course
from .models import Transaction


class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # -------------------------
    #  شروع پرداخت
    # -------------------------
    @action(detail=True, methods=["post"])
    def start(self, request, pk=None):
        course = get_object_or_404(Course, id=pk)
        amount = course.sale_price or course.price

        # ایجاد تراکنش
        transaction = Transaction.objects.create(
            user=request.user,
            course=course,
            amount=amount,
            status="PENDING"
        )

        factory = bankfactories.BankFactory()

        try:
            bank = factory.auto_create(bank_models.BankType.ZARINPAL)
            bank.set_request(request)
            bank.set_amount(amount)
            bank.set_client_callback_url(reverse("payments:payments-callback"))
            bank.set_mobile_number(request.user.profile.phone)

            bank_record = bank.ready()
            bank_record.extra_information = {
                "transaction_id": transaction.id,
                "course_id": course.id
            }
            bank_record.save()

            transaction.authority = bank_record.tracking_code
            transaction.save()

            return Response({"url": bank.redirect_gateway().url})

        except AZBankGatewaysException as e:
            return Response({"error": str(e)}, status=500)

    # -------------------------
    #  Callback
    # -------------------------
    @action(detail=False, methods=["get"])
    def callback(self, request):
        tracking_code = request.GET.get(settings.TRACKING_CODE_QUERY_PARAM)

        if not tracking_code:
            raise Http404("Invalid callback")

        try:
            bank_record = bank_models.Bank.objects.get(tracking_code=tracking_code)
        except bank_models.Bank.DoesNotExist:
            raise Http404("Bank record not found")

        try:
            transaction = Transaction.objects.get(authority=tracking_code)
        except Transaction.DoesNotExist:
            raise Http404("Transaction not found")

        if not bank_record.is_success:
            transaction.status = "FAIL"
            transaction.save()
            return HttpResponse("پرداخت ناموفق بود")

        # پرداخت موفق
        transaction.status = "SUCCESS"
        transaction.ref_id = bank_record.ref_id
        transaction.save()

        # ثبت نام کاربر در دوره
        Enrollment.objects.get_or_create(
            user=transaction.user,
            course=transaction.course
        )

        return HttpResponse("پرداخت موفقیت‌آمیز بود")
