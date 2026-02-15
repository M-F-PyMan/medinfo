from django.db import models
from django.utils import timezone
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
    amount = models.PositiveIntegerField()

    courses = models.ManyToManyField(Course, blank=True)

    valid_days = models.PositiveIntegerField(default=30)
    start_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    max_uses = models.PositiveIntegerField(null=True, blank=True)
    max_uses_per_user = models.PositiveIntegerField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    # 🔥 NEW: کوپن اختصاصی
    assigned_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="اگر خالی باشد، کوپن عمومی است"
    )

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = self.start_at + timezone.timedelta(days=self.valid_days)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.code



class CouponRedemption(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, related_name="redemptions")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    used_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} used {self.coupon.code}"
