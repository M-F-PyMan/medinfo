from django.contrib import admin
from .models import Rating, Comment, CommentReport
from notifications.utils import create_notification


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "value", "created_at")
    list_filter = ("value", "course")
    search_fields = ("user__username", "course__title")
    ordering = ("-created_at",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "short_text", "created_at")
    list_filter = ("course",)
    search_fields = ("user__username", "course__title", "text")
    ordering = ("-created_at",)

    actions = ["delete_with_notification", "warn_user"]

    def short_text(self, obj):
        return obj.text[:50] + ("..." if len(obj.text) > 50 else "")
    short_text.short_description = "متن"

    def delete_with_notification(self, request, queryset):
        for comment in queryset:
            create_notification(
                user=comment.user,
                type_="warning",
                title="حذف نظر",
                message="نظر شما به دلیل رعایت نکردن قوانین سایت حذف شد.",
                target_url=f"/courses/{comment.course.slug}/",
            )
            comment.delete()
    delete_with_notification.short_description = "حذف نظر + ارسال نوتیفیکیشن به کاربر"

    def warn_user(self, request, queryset):
        for comment in queryset:
            create_notification(
                user=comment.user,
                type_="warning",
                title="تذکر درباره نظر",
                message="لطفاً در نوشتن نظر قوانین سایت را رعایت کنید.",
                target_url=f"/courses/{comment.course.slug}/",
            )
    warn_user.short_description = "ارسال تذکر به کاربر (بدون حذف نظر)"


@admin.register(CommentReport)
class CommentReportAdmin(admin.ModelAdmin):
    list_display = ("id", "reporter", "comment_owner", "short_comment", "reason_short", "created_at")
    list_filter = ("created_at",)
    search_fields = ("reporter__username", "comment__user__username", "comment__text", "reason")
    readonly_fields = ("reporter", "comment", "reason", "created_at")

    def comment_owner(self, obj):
        return obj.comment.user.username
    comment_owner.short_description = "کاربر صاحب نظر"

    def short_comment(self, obj):
        text = obj.comment.text
        return text[:40] + ("..." if len(text) > 40 else "")
    short_comment.short_description = "نظر"

    def reason_short(self, obj):
        text = obj.reason
        return text[:40] + ("..." if len(text) > 40 else "")
    reason_short.short_description = "علت گزارش"
