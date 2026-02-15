from django.contrib import admin
from .models import Coupon, CouponRedemption


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ("code", "discount_type", "amount", "valid_days", "expires_at", "is_active", "assigned_user")
    list_filter = ("discount_type", "is_active")
    search_fields = ("code", "assigned_user__username")
    filter_horizontal = ("courses",)



@admin.register(CouponRedemption)
class CouponRedemptionAdmin(admin.ModelAdmin):
    list_display = ("coupon", "user", "used_at")
    list_filter = ("coupon",)
    search_fields = ("user__username", "coupon__code")
