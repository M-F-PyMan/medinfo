from rest_framework import serializers
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.name", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Certificate
        fields = [
            "serial",
            "user_name",
            "course_title",
            "issued_at",
            "pdf_file",
            "qr_code",
        ]
        read_only_fields = fields

