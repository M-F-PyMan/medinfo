from rest_framework import serializers
from .models import PayoutRequest, InstructorEarning


class InstructorBalanceSerializer(serializers.Serializer):
    total_earned = serializers.IntegerField()
    total_paid = serializers.IntegerField()
    withdrawable = serializers.IntegerField()


class PayoutRequestSerializer(serializers.ModelSerializer):
    receipt_url = serializers.SerializerMethodField()

    class Meta:
        model = PayoutRequest
        fields = [
            "id",
            "amount",
            "status",
            "created_at",
            "processed_at",
            "reference_code",
            "receipt_url",
        ]
        read_only_fields = [
            "status",
            "created_at",
            "processed_at",
            "reference_code",
            "receipt_url",
        ]

    def get_receipt_url(self, obj):
        request = self.context.get("request")
        if obj.receipt and request:
            return request.build_absolute_uri(obj.receipt.url)
        if obj.receipt:
            return obj.receipt.url
        return None


class InstructorEarningSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = InstructorEarning
        fields = [
            "id",
            "course",
            "course_title",
            "gross_amount",
            "instructor_amount",
            "platform_amount",
            "created_at",
        ]


class EarningsByCourseSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()
    course_title = serializers.CharField()
    total_gross = serializers.IntegerField()
    total_instructor = serializers.IntegerField()
    total_platform = serializers.IntegerField()


class EarningsByMonthSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField()
    total_instructor = serializers.IntegerField()
