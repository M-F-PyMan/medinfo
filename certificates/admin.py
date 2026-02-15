from django.contrib import admin
from .models import Certificate


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "serial", "issued_at")
    search_fields = ("serial", "user__username", "course__title")
    readonly_fields = ("serial", "issued_at", "qr_code", "pdf_file")
