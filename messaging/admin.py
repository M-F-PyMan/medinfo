from django.contrib import admin
from .models import Ticket, TicketMessage, CourseMessage


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "subject", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("user__username", "subject")


@admin.register(TicketMessage)
class TicketMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "ticket", "sender", "created_at")
    search_fields = ("sender__username", "text")


@admin.register(CourseMessage)
class CourseMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "course", "sender", "created_at")
    search_fields = ("sender__username", "course__title", "text")
