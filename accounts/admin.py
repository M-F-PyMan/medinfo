from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.forms import ModelForm
from .models import User, Profile, InstructorProfile, Enrollment


# ---------------------------
#  UserAdmin Forms
# ---------------------------

class UserCreationForm(ModelForm):
    """فرم ساخت کاربر جدید در پنل ادمین"""
    class Meta:
        model = User
        fields = ("username", "email", "password")


class UserChangeForm(ModelForm):
    """فرم ویرایش کاربر"""
    class Meta:
        model = User
        fields = "__all__"


# ---------------------------
#  UserAdmin سفارشی
# ---------------------------

class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User

    list_display = (
        "id",
        "username",
        "email",
        "name",
        "is_active",
        "is_staff",
        "is_superuser",
        "is_teacher",
        "date_joined",
    )

    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
        "is_teacher",
    )

    fieldsets = (
        ("اطلاعات کاربری", {"fields": ("username", "email", "name", "password")}),
        ("نقش‌ها و دسترسی‌ها", {"fields": ("is_active", "is_staff", "is_superuser", "is_teacher")}),
        ("تاریخ‌ها", {"fields": ("date_joined",)}),
        ("گروه‌ها و پرمیشن‌ها", {"fields": ("groups", "user_permissions")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password", "is_teacher", "is_staff", "is_active"),
        }),
    )

    search_fields = ("username", "email", "name")
    ordering = ("id",)


# ---------------------------
#  ثبت مدل‌ها در ادمین
# ---------------------------

admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(InstructorProfile)
admin.site.register(Enrollment)
