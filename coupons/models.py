from django.db import models
from django.conf import settings
from courses.models import Course


class Coupon(models.Model):
    PERCENT = "percent"
    FIXED = "fixed"

    DISCOUNT_TYPES = (
        (PERCENT, "درصدی"),
        (FIXED, "مبلغ ثابت"),
    )

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPES)
    amount = models.PositiveIntegerField()  # درصد یا مبلغ (تومان)

    courses = models.ManyToManyField(Course, blank=True)  # خالی = همه دوره‌ها

    start_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    max_uses = models.PositiveIntegerField(null=True, blank=True)          # سقف کل استفاده
    max_uses_per_user = models.PositiveIntegerField(null=True, blank=True) # سقف برای هر کاربر

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code


class CouponRedemption(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, related_name="redemptions")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    used_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "استفاده از کد"
        verbose_name_plural = "استفاده‌ها"
