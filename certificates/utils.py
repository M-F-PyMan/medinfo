import qrcode
from django.core.files.base import ContentFile
from io import BytesIO


def generate_qr_code(url):
    qr = qrcode.make(url)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    return ContentFile(buffer.getvalue(), name="qr.png")
