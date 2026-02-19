from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="wallet")
    balance = models.BigIntegerField(default=0)

    def __str__(self):
        return f"Wallet({self.user})"


class WalletTransaction(models.Model):
    TYPE_CHOICES = (
        ("CHARGE", "Charge"),
        ("PAYMENT", "Payment"),
        ("REFUND", "Refund"),
    )

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name="transactions")
    amount = models.BigIntegerField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.wallet.user} - {self.type} - {self.amount}"


class WalletChargeRequest(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAIL", "Fail"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wallet_charge_requests")
    amount = models.BigIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    authority = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChargeRequest({self.user}, {self.amount}, {self.status})"
