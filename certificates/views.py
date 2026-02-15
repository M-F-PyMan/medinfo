from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, render
from django.views import View
from accounts.models import Enrollment
from .models import Certificate
from .utils import generate_qr_code
from .pdf_generator import generate_certificate_pdf
from .serializers import CertificateSerializer

class CertificateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def generate(self, request, pk=None):
        user = request.user
        course_id = pk

        # باید دوره را کامل کرده باشد
        if not Enrollment.objects.filter(user=user, course_id=course_id).exists():
            return Response({"error": "شما این دوره را کامل نکرده‌اید"}, status=403)

        cert, created = Certificate.objects.get_or_create(
            user=user,
            course_id=course_id,
        )

        # ساخت QR
        verify_url = f"https://medinfo.ir/certificate/verify/{cert.serial}"
        cert.qr_code = generate_qr_code(verify_url)

        # ساخت PDF
        cert.pdf_file = generate_certificate_pdf(cert, cert.qr_code.path)

        cert.save()

        return Response({
            "serial": cert.serial,
            "pdf_url": cert.pdf_file.url,
            "qr_url": cert.qr_code.url,
        })

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

    @action(detail=False, methods=["get"])
    def search(self, request):
        serial = request.GET.get("serial")

        if not serial:
            return Response({"error": "شماره سریال ارسال نشده"}, status=400)

        cert = get_object_or_404(Certificate, serial=serial)

        return Response(CertificateSerializer(cert).data)






class CertificateVerifyPage(View):
    def get(self, request, serial):
        cert = get_object_or_404(Certificate, serial=serial)

        return render(request, "certificates/verify.html", {
            "certificate": cert
        })
