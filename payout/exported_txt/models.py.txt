from django.db import models
from django.conf import settings
from courses.models import Course


class PlatformConfig(models.Model):
    platform_fee_percent = models.PositiveIntegerField(default=30, help_text="درصد سهم پلتفرم از هر فروش")

    class Meta:
        verbose_name = "تنظیمات مالی پلتفرم"
        verbose_name_plural = "تنظیمات مالی پلتفرم"

    def __str__(self):
        return f"Platform Fee: {self.platform_fee_percent}%"


class InstructorEarning(models.Model):
    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="earnings",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="earnings",
    )
    transaction = models.ForeignKey(
        "payments.Transaction",
        on_delete=models.CASCADE,
        related_name="instructor_earnings",
    )

    gross_amount = models.PositiveIntegerField()   # مبلغ پرداخت‌شده (بعد از تخفیف)
    instructor_amount = models.PositiveIntegerField()  # سهم مدرس
    platform_amount = models.PositiveIntegerField()    # سهم پلتفرم

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "درآمد مدرس"
        verbose_name_plural = "درآمد مدرس‌ها"

    def __str__(self):
        return f"{self.instructor} - {self.course} - {self.instructor_amount}"


class PayoutRequest(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "در انتظار بررسی"),
        ("APPROVED", "تأیید شده"),
        ("PAID", "پرداخت شده"),
        ("REJECTED", "رد شده"),
    ]

    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="payout_requests",
    )
    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(blank=True, null=True)

    # برای ثبت اطلاعات پایا/پل (مثلاً شماره پیگیری)
    reference_code = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "درخواست تسویه"
        verbose_name_plural = "درخواست‌های تسویه"

    def __str__(self):
        return f"{self.instructor} - {self.amount} - {self.status}"
