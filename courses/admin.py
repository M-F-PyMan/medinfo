from django.contrib import admin
from .models import Course, Lesson, LessonProgress


# ---------------------------
#  Lesson Inline
# ---------------------------

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0
    ordering = ("order",)
    fields = ("title", "order", "is_preview", "video_url")
    show_change_link = True


# ---------------------------
#  Course Admin
# ---------------------------

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price", "sale_price", "created_at")
    search_fields = ("title", "description")
    list_filter = ("created_at",)
    inlines = [LessonInline]


# ---------------------------
#  Lesson Admin
# ---------------------------

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "course", "order", "is_preview")
    list_filter = ("course", "is_preview")
    search_fields = ("title",)


# ---------------------------
#  Lesson Progress Admin
# ---------------------------

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "lesson", "watched_seconds", "completed", "updated_at")
    list_filter = ("completed", "lesson__course")
    search_fields = ("user__username", "lesson__title")
    readonly_fields = ("updated_at",)
