from django.contrib import admin
from .models import Coupon, CouponRedemption
from notifications.utils import create_notification


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ("code", "discount_type", "amount", "valid_days", "expires_at", "is_active", "assigned_user")
    list_filter = ("discount_type", "is_active")
    search_fields = ("code", "assigned_user__username")
    filter_horizontal = ("courses",)

    def save_model(self, request, obj, form, change):
        is_new = obj.pk is None
        super().save_model(request, obj, form, change)

        if obj.assigned_user and obj.is_active:
            if is_new or "assigned_user" in form.changed_data or "is_active" in form.changed_data:
                create_notification(
                    user=obj.assigned_user,
                    type_="coupon",
                    title="کوپن اختصاصی جدید",
                    message=f"یک کد تخفیف اختصاصی با کد «{obj.code}» برای شما فعال شد.",
                    target_url="/coupons/",
                )


@admin.register(CouponRedemption)
class CouponRedemptionAdmin(admin.ModelAdmin):
    list_display = ("coupon", "user", "used_at")
    list_filter = ("coupon",)
    search_fields = ("user__username", "coupon__code")
