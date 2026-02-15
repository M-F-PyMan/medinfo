from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from django.core.files.base import ContentFile
from io import BytesIO


def generate_certificate_pdf(certificate, qr_image_path):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)

    p.setFont("Helvetica-Bold", 24)
    p.drawCentredString(300, 750, "گواهی پایان دوره")

    p.setFont("Helvetica", 16)
    p.drawCentredString(300, 700, f"این گواهی اعطا می‌شود به:")
    p.drawCentredString(300, 670, certificate.user.name)

    p.drawCentredString(300, 620, f"برای گذراندن دوره:")
    p.drawCentredString(300, 590, certificate.course.title)

    p.setFont("Helvetica", 12)
    p.drawString(50, 520, f"مدرس: {certificate.course.teacher.name}")
    p.drawString(50, 500, f"شماره سریال: {certificate.serial}")
    p.drawString(50, 480, f"تاریخ صدور: {certificate.issued_at.date()}")

    # QR Code
    p.drawImage(qr_image_path, 400, 450, width=120, height=120)

    p.showPage()
    p.save()

    return ContentFile(buffer.getvalue(), name="certificate.pdf")
