from django.db import models
from django.conf import settings
from courses.models import Course


class Transaction(models.Model):
    STATUS_CHOICES = [
        ('INIT', 'Started'),
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Successful'),
        ('FAIL', 'Failed'),
    ]

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="transactions")
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="transactions")

    amount = models.PositiveIntegerField()  # مبلغ نهایی (با یا بدون تخفیف)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='INIT')

    authority = models.CharField(max_length=128, null=True, blank=True)
    ref_id = models.CharField(max_length=128, null=True, blank=True)

    coupon_code = models.CharField(max_length=50, null=True, blank=True)  # اختیاری

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id} - {self.status}"



class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    price_at_time = models.PositiveIntegerField()
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("cart", "course")

    def __str__(self):
        return f"{self.course} in {self.cart}"
