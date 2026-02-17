import datetime
import jdatetime
import qrcode
from io import BytesIO
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
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

    # -----------------------------
    #  SERIAL GENERATOR
    # -----------------------------
    def generate_serial(self):
        print(">>> GENERATE SERIAL CALLED")
        today = datetime.date.today().strftime("%Y%m%d")
        course_id = self.course.id
        user_id = self.user.id

        count_today = Certificate.objects.filter(
            course=self.course,
            issued_at__date=datetime.date.today()
        ).count() + 1

        serial = f"{today}-{course_id}-{user_id}-{count_today}"
        print(">>> SERIAL GENERATED:", serial)
        return serial

    # -----------------------------
    #  JALALI DATE
    # -----------------------------
    @property
    def jalali_date(self):
        j = jdatetime.datetime.fromgregorian(datetime=self.issued_at)
        return j.strftime("%Y/%m/%d")

    # -----------------------------
    #  QR CODE GENERATOR
    # -----------------------------
    def generate_qr(self):
        print(">>> QR GENERATOR CALLED")
        data = f"https://medinfo.ir/certificate/verify/{self.serial}"
        qr = qrcode.make(data)
        buffer = BytesIO()
        qr.save(buffer, format="PNG")
        print(">>> QR GENERATED FOR:", self.serial)
        return ContentFile(buffer.getvalue(), name=f"{self.serial}.png")

    # -----------------------------
    #  SAVE OVERRIDE
    # -----------------------------
    def save(self, *args, **kwargs):
        print(">>> SAVE CALLED. PK:", self.pk)

        creating = self.pk is None
        print(">>> CREATING:", creating)

        if creating:
            print(">>> FIRST SAVE: GENERATING SERIAL")
            self.serial = self.generate_serial()

        # Save object first time
        super().save(*args, **kwargs)
        print(">>> FIRST SAVE DONE. PK:", self.pk)

        # Check QR creation condition
        print(">>> QR CHECK:", self.qr_code, self.qr_code.name)

        if creating and (not self.qr_code or not self.qr_code.name):
            print(">>> QR CREATION TRIGGERED")
            qr_file = self.generate_qr()

            print(">>> SAVING QR FILE…")
            self.qr_code.save(f"{self.serial}.png", qr_file, save=False)

            print(">>> SAVING MODEL WITH QR…")
            super().save(update_fields=["qr_code"])

        print(">>> SAVE FINISHED FOR:", self.serial)

    def __str__(self):
        return f"{self.user} - {self.course} - {self.serial}"
