from django.db import models

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('INIT', 'Started'),
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Successful'),
        ('FAIL', 'Failed'),
    ]

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="transactions")
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="transactions")

    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='INIT')

    authority = models.CharField(max_length=128, null=True, blank=True)
    ref_id = models.CharField(max_length=128, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id} - {self.status}"
