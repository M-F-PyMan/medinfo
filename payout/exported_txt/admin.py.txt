from django.contrib import admin
from .models import PlatformConfig, InstructorEarning, PayoutRequest


@admin.register(PlatformConfig)
class PlatformConfigAdmin(admin.ModelAdmin):
    list_display = ("id", "platform_fee_percent",)
    list_editable = ("platform_fee_percent",)


@admin.register(InstructorEarning)
class InstructorEarningAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "instructor",
        "course",
        "gross_amount",
        "instructor_amount",
        "platform_amount",
        "created_at",
    )
    list_filter = ("course", "instructor")
    search_fields = ("instructor__username", "course__title")
    readonly_fields = (
        "instructor",
        "course",
        "transaction",
        "gross_amount",
        "instructor_amount",
        "platform_amount",
        "created_at",
    )


@admin.register(PayoutRequest)
class PayoutRequestAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "instructor",
        "amount",
        "status",
        "created_at",
        "processed_at",
        "reference_code",
    )
    list_filter = ("status",)
    search_fields = ("instructor__username", "reference_code")
    readonly_fields = ("instructor", "amount", "created_at")

    fieldsets = (
        (None, {
            "fields": ("instructor", "amount", "status"),
        }),
        ("پرداخت", {
            "fields": ("processed_at", "reference_code", "receipt"),
        }),
        ("زمان‌ها", {
            "fields": ("created_at",),
        }),
    )

    actions = ["mark_as_paid"]

    def mark_as_paid(self, request, queryset):
        from django.utils import timezone
        for obj in queryset.filter(status__in=["PENDING", "APPROVED"]):
            obj.status = "PAID"
            if not obj.processed_at:
                obj.processed_at = timezone.now()
            obj.save()
    mark_as_paid.short_description = "علامت‌گذاری به عنوان پرداخت شده"
