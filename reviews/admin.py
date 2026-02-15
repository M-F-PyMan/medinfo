from django.contrib import admin
from .models import Rating, Comment, CommentReport


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

    def short_text(self, obj):
        return obj.text[:50] + ("..." if len(obj.text) > 50 else "")
    short_text.short_description = "متن"
