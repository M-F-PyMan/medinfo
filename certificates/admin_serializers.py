from rest_framework import serializers
from .models import Certificate
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class CertificateAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseAdminSerializer(read_only=True)

    class Meta:
        model = Certificate
        fields = [
            "id",
            "user",
            "course",
            "serial",
            "qr_code",
            "pdf_file",
            "issued_at",
        ]
