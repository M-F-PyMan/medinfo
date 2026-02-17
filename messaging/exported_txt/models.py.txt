from django.db import models
from django.conf import settings
from courses.models import Course


class Ticket(models.Model):
    STATUS_CHOICES = [
        ("OPEN", "باز"),
        ("ANSWERED", "پاسخ داده شده"),
        ("CLOSED", "بسته شده"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tickets",
    )
    subject = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="OPEN")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket #{self.id} - {self.subject}"


class TicketMessage(models.Model):
    ticket = models.ForeignKey(
        Ticket,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ticket_messages",
    )
    text = models.TextField()
    file = models.FileField(upload_to="ticket_files/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message #{self.id} in Ticket {self.ticket.id}"


class CourseMessage(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="course_messages",
    )
    text = models.TextField()
    file = models.FileField(upload_to="course_messages/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # پیام‌ها فقط بین مدرس و دانشجو هستند
    def __str__(self):
        return f"{self.sender} → {self.course}"
