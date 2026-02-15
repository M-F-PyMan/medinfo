import datetime
from django.db import models
from django.conf import settings
from courses.models import Course


class Certificate(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="certificates",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="certificates",
    )

    serial = models.CharField(max_length=50, unique=True, editable=False)
    qr_code = models.ImageField(upload_to="certificates/qr/", blank=True, null=True)
    pdf_file = models.FileField(upload_to="certificates/pdf/", blank=True, null=True)

    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "course")
        verbose_name = "گواهی پایان دوره"
        verbose_name_plural = "گواهی‌های پایان دوره"

    def generate_serial(self):
        today = datetime.date.today().strftime("%Y%m%d")
        course_id = self.course.id
        user_id = self.user.id

        # شمارش گواهی‌های صادر شده برای این دوره در این تاریخ
        count_today = Certificate.objects.filter(
            course=self.course,
            issued_at__date=datetime.date.today()
        ).count() + 1

        return f"{today}-{course_id}-{user_id}-{count_today}"

    def save(self, *args, **kwargs):
        if not self.serial:
            self.serial = self.generate_serial()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.course} - {self.serial}"
