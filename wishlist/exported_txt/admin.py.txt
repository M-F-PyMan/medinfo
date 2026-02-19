from django.contrib import admin
from .models import WishlistItem


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "created_at")
    search_fields = ("user__username", "course__title")
    list_filter = ("created_at",)
