from django.contrib import admin
from .models import Coupon, CouponRedemption


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ("code", "discount_type", "amount", "is_active", "start_at", "expires_at")
    list_filter = ("is_active", "discount_type")
    search_fields = ("code",)
    filter_horizontal = ("courses",)


@admin.register(CouponRedemption)
class CouponRedemptionAdmin(admin.ModelAdmin):
    list_display = ("coupon", "user", "used_at")
    list_filter = ("coupon", "used_at")
    search_fields = ("user__username", "coupon__code")
