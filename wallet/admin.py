from django.contrib import admin
from django.db.models import Sum
from django.utils.html import format_html

from .models import Wallet, WalletTransaction, WalletChargeRequest


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ("user", "balance_display", "total_wallet_charges", "total_wallet_payments")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("balance",)

    def balance_display(self, obj):
        return f"{obj.balance:,} تومان"
    balance_display.short_description = "موجودی"

    def total_wallet_charges(self, obj):
        total = obj.transactions.filter(type="CHARGE").aggregate(sum=Sum("amount"))["sum"] or 0
        return f"{total:,} تومان"
    total_wallet_charges.short_description = "کل شارژها"

    def total_wallet_payments(self, obj):
        total = obj.transactions.filter(type="PAYMENT").aggregate(sum=Sum("amount"))["sum"] or 0
        return f"{abs(total):,} تومان"
    total_wallet_payments.short_description = "کل پرداخت‌ها"


@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = ("wallet_user", "amount_display", "type", "description", "created_at")
    list_filter = ("type", "created_at")
    search_fields = ("wallet__user__username", "description")

    def wallet_user(self, obj):
        return obj.wallet.user.username
    wallet_user.short_description = "کاربر"

    def amount_display(self, obj):
        color = "green" if obj.amount > 0 else "red"
        sign = "+" if obj.amount > 0 else ""
        return format_html(
            f"<span style='color:{color}; font-weight:bold'>{sign}{obj.amount:,} تومان</span>"
        )
    amount_display.short_description = "مبلغ"


@admin.register(WalletChargeRequest)
class WalletChargeRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "amount_display", "status", "authority", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "authority")

    def amount_display(self, obj):
        return f"{obj.amount:,} تومان"
    amount_display.short_description = "مبلغ"
