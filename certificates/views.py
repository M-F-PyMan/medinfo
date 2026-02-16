from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, render
from django.views import View

from accounts.models import Enrollment
from courses.models import Course, LessonProgress
from .models import Certificate
from .utils import generate_qr_code
from .pdf_generator import generate_certificate_pdf
from .serializers import CertificateSerializer

import datetime


# ---------------------------
#   Helper: Calculate Progress %
# ---------------------------

def get_user_course_progress(user, course):
    progresses = LessonProgress.objects.filter(
        user=user,
        lesson__course=course
    )

    total_seconds = 0
    watched_seconds = 0

    for p in progresses:
        if p.lesson.duration:
            total_seconds += p.lesson.duration
            watched_seconds += min(p.watched_seconds, p.lesson.duration)

    if total_seconds == 0:
        return 0

    return (watched_seconds / total_seconds) * 100



# ---------------------------
#   Certificate ViewSet
# ---------------------------

class CertificateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def generate(self, request, pk=None):
        user = request.user
        course = get_object_or_404(Course, id=pk)

        # 1) آیا دوره گواهی دارد؟
        if not course.has_certificate:
            return Response({"error": "این دوره دارای گواهی پایان دوره نیست"}, status=400)

        # 2) آیا دوره توسط مدرس تکمیل شده؟
        if course.status != "completed":
            return Response({"error": "این دوره هنوز توسط مدرس تکمیل نشده است"}, status=400)

        # 3) آیا کاربر در این دوره ثبت‌نام کرده؟
        if not Enrollment.objects.filter(user=user, course=course).exists():
            return Response({"error": "شما در این دوره ثبت‌نام نکرده‌اید"}, status=403)

        # 4) آیا کاربر حداقل ۹۵٪ دوره را دیده؟
        progress = get_user_course_progress(user, course)
        if progress < 95:
            return Response({"error": "برای دریافت گواهی باید حداقل ۹۵٪ دوره را مشاهده کنید"}, status=400)

        # 5) اگر قبلاً گواهی صادر شده → همان را برگردان
        cert, created = Certificate.objects.get_or_create(
            user=user,
            course=course,
        )

        # 6) ساخت QR
        verify_url = f"https://medinfo.ir/certificate/verify/{cert.serial}"
        cert.qr_code = generate_qr_code(verify_url)

        # 7) ساخت PDF با بک‌گراند رسمی
        cert.pdf_file = generate_certificate_pdf(cert)

        cert.save()

        return Response({
            "serial": cert.serial,
            "pdf_url": cert.pdf_file.url,   # فقط در داشبورد نمایش داده می‌شود
            "qr_url": cert.qr_code.url,
        })



    # ---------------------------
    #   Public Verify API (JSON)
    # ---------------------------
    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def verify(self, request):
        serial = request.GET.get("serial")
        cert = get_object_or_404(Certificate, serial=serial)

        return Response({
            "valid": True,
            "user": cert.user.name,
            "course": cert.course.title,
            "issued_at": cert.issued_at,
        })



    # ---------------------------
    #   Search by Serial (Dashboard/Admin)
    # ---------------------------
    @action(detail=False, methods=["get"])
    def search(self, request):
        serial = request.GET.get("serial")

        if not serial:
            return Response({"error": "شماره سریال ارسال نشده"}, status=400)

        cert = get_object_or_404(Certificate, serial=serial)

        return Response(CertificateSerializer(cert).data)



    # ---------------------------
    #   List Certificates of Logged-in User
    # ---------------------------
    @action(detail=False, methods=["get"])
    def my_certificates(self, request):
        qs = Certificate.objects.filter(user=request.user).order_by("-issued_at")
        return Response(CertificateSerializer(qs, many=True).data)



# ---------------------------
#   Public HTML Verify Page
# ---------------------------

class CertificateVerifyPage(View):
    def get(self, request, serial):
        cert = get_object_or_404(Certificate, serial=serial)

        return render(request, "certificates/verify.html", {
            "certificate": cert
        })
