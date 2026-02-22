from django.db import models

class SiteSettings(models.Model):
    # General
    site_name = models.CharField(max_length=200, default="My LMS")
    site_description = models.TextField(blank=True, null=True)

    logo = models.ImageField(upload_to="settings/", blank=True, null=True)
    favicon = models.ImageField(upload_to="settings/", blank=True, null=True)

    # Contact
    support_email = models.EmailField(blank=True, null=True)
    support_phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # Social
    instagram = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)
    telegram = models.URLField(blank=True, null=True)

    # SEO
    default_meta_title = models.CharField(max_length=200, blank=True, null=True)
    default_meta_description = models.CharField(max_length=300, blank=True, null=True)
    default_og_image = models.ImageField(upload_to="settings/", blank=True, null=True)

    # Payment
    zarinpal_merchant_id = models.CharField(max_length=200, blank=True, null=True)
    idpay_api_key = models.CharField(max_length=200, blank=True, null=True)
    stripe_public_key = models.CharField(max_length=200, blank=True, null=True)
    stripe_secret_key = models.CharField(max_length=200, blank=True, null=True)

    # SMTP
    smtp_host = models.CharField(max_length=200, blank=True, null=True)
    smtp_port = models.IntegerField(blank=True, null=True)
    smtp_username = models.CharField(max_length=200, blank=True, null=True)
    smtp_password = models.CharField(max_length=200, blank=True, null=True)
    smtp_use_tls = models.BooleanField(default=False)
    smtp_use_ssl = models.BooleanField(default=False)

    # SMS
    sms_api_key = models.CharField(max_length=200, blank=True, null=True)
    sms_sender_number = models.CharField(max_length=50, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce singleton
        super().save(*args, **kwargs)

    def __str__(self):
        return "Site Settings"

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
