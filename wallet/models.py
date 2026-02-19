from django.db import models
from django.conf import settings


class Wallet(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wallet",
    )
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Wallet of {self.user} - {self.balance}"


class WalletTransaction(models.Model):
    TYPE_CHOICES = [
        ("CHARGE", "Charge"),
        ("PAYMENT", "Payment"),
        ("REFUND", "Refund"),
    ]

    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
        related_name="transactions",
    )
    amount = models.IntegerField()  # مثبت = شارژ، منفی = برداشت
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        sign = "+" if self.amount > 0 else ""
        return f"{self.wallet.user} {self.type} {sign}{self.amount}"


class WalletChargeRequest(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAIL", "Fail"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wallet_charge_requests",
    )
    amount = models.PositiveIntegerField()
    authority = models.CharField(max_length=128, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"WalletCharge {self.id} - {self.status} - {self.amount}"
