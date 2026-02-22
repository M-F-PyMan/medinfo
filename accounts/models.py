from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.conf import settings


class TeacherApplication(models.Model):
    STATUS_CHOICES = [
        ("pending", "در انتظار بررسی"),
        ("accepted", "تأیید شده"),
        ("rejected", "رد شده"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="teacher_applications",
    )

    specialty = models.CharField(max_length=200, blank=True, null=True)
    experience = models.CharField(max_length=50, blank=True, null=True)

    national_card_front = models.ImageField(
        upload_to="teacher_docs/national_card/", blank=True, null=True
    )
    national_card_back = models.ImageField(
        upload_to="teacher_docs/national_card/", blank=True, null=True
    )
    medical_card_front = models.ImageField(
        upload_to="teacher_docs/medical_card/", blank=True, null=True
    )
    medical_card_back = models.ImageField(
        upload_to="teacher_docs/medical_card/", blank=True, null=True
    )
    resume_file = models.FileField(
        upload_to="teacher_docs/resume/", blank=True, null=True
    )

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="pending"
    )
    admin_note = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    reviewed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"TeacherApplication({self.user.username} - {self.status})"


class JobOpening(models.Model):
    title = models.CharField(max_length=200)
    field = models.CharField(max_length=200)  # رشته تدریس
    type = models.CharField(max_length=100, default="مدرس")
    location = models.CharField(max_length=200, default="دورکاری")
    description = models.TextField()

    requirements = models.JSONField(default=list)
    benefits = models.JSONField(default=list)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError("Username is required")

        email = self.normalize_email(email) if email else None
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username    = models.CharField(max_length=100, unique=True)
    email       = models.EmailField(unique=True, null=True, blank=True)
    name        = models.CharField(max_length=100, null=True, blank=True)

    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    is_teacher  = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username


class Profile(models.Model):
    user      = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    image     = models.ImageField(upload_to="profile_pics/", default="default.jpg")
    bio       = models.TextField(blank=True, null=True)
    specialty = models.CharField(max_length=150, blank=True, null=True)
    field     = models.CharField(max_length=150, blank=True, null=True)
    phone     = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"


class InstructorProfile(models.Model):
    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name="instructor_profile")
    degree     = models.CharField(max_length=200, blank=True, null=True)
    experience = models.PositiveIntegerField(default=0)
    linkedin   = models.URLField(blank=True, null=True)
    website    = models.URLField(blank=True, null=True)

    # 🔥 NEW: اطلاعات بانکی برای تسویه
    sheba_number = models.CharField(max_length=26, blank=True, null=True, help_text="شماره شبا بدون IR")
    card_number  = models.CharField(max_length=16, blank=True, null=True, help_text="شماره کارت (اختیاری)")

    def __str__(self):
        return f"Instructor: {self.user.username}"



class Enrollment(models.Model):
    user       = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="enrollments")
    course     = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="enrollments")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "course")

    def __str__(self):
        return f"{self.user.username} -> {self.course}"

