from django.db import models
from django.conf import settings


class Notification(models.Model):
    TYPE_CHOICES = [
        ("system", "سیستمی"),
        ("payment", "پرداخت"),
        ("coupon", "کوپن"),
        ("comment", "نظر"),
        ("warning", "تذکر"),
        ("course", "دوره"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="system")
    title = models.CharField(max_length=200)
    message = models.TextField()

    # لینک اختیاری (مثلاً لینک دوره، لینک نظر، لینک صفحه پرداخت)
    target_url = models.CharField(max_length=300, null=True, blank=True)

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.user.username} - {self.title}"
