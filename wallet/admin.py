from django.contrib import admin
from django.utils.html import format_html
from .models import Wallet, WalletTransaction, WalletChargeRequest


# ===========================
#  Inline: تراکنش‌های کیف پول
# ===========================
class WalletTransactionInline(admin.TabularInline):
    model = WalletTransaction
    extra = 0
    readonly_fields = ("amount", "type", "description", "created_at")
    can_delete = False


# ===========================
#  Wallet Admin
# ===========================
@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "balance",
        "total_charges",
        "total_payments",
        "transaction_count",
    )
    search_fields = ("user__username", "user__email")
    readonly_fields = ("balance",)
    inlines = [WalletTransactionInline]

    def total_charges(self, obj):
        total = obj.transactions.filter(type="CHARGE").aggregate(sum=models.Sum("amount"))["sum"] or 0
        return f"{total:,} تومان"
    total_charges.short_description = "کل شارژها"

    def total_payments(self, obj):
        total = obj.transactions.filter(type="PAYMENT").aggregate(sum=models.Sum("amount"))["sum"] or 0
        return f"{abs(total):,} تومان"
    total_payments.short_description = "کل پرداخت‌ها"

    def transaction_count(self, obj):
        return obj.transactions.count()
    transaction_count.short_description = "تعداد تراکنش‌ها"


# ===========================
#  WalletTransaction Admin
# ===========================
@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "wallet_user",
        "amount_display",
        "type",
        "description",
        "created_at",
    )
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


# ===========================
#  WalletChargeRequest Admin
# ===========================
@admin.register(WalletChargeRequest)
class WalletChargeRequestAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "amount",
        "status",
        "authority",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "authority")

    readonly_fields = ("user", "amount", "authority", "status", "created_at")


