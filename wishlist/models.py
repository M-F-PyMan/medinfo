from django.db import models
from django.conf import settings
from courses.models import Course


class WishlistItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wishlist_items",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="wishlisted_by",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "course")
        verbose_name = "آیتم لیست علاقه‌مندی"
        verbose_name_plural = "لیست علاقه‌مندی‌ها"

    def __str__(self):
        return f"{self.user} → {self.course}"
