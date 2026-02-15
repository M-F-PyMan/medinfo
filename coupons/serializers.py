from rest_framework import serializers
from .models import Coupon
from courses.models import Course
from django.utils import timezone
from .models import CouponRedemption


class CouponValidateSerializer(serializers.Serializer):
    code = serializers.CharField()
    course_id = serializers.IntegerField()

    def validate(self, data):
        code = data["code"].strip()
        course_id = data["course_id"]
        user = self.context["request"].user

        # پیدا کردن کوپن
        try:
            coupon = Coupon.objects.get(code__iexact=code, is_active=True)
        except Coupon.DoesNotExist:
            raise serializers.ValidationError("کد تخفیف نامعتبر است")

        now = timezone.now()

        # تاریخ شروع
        if coupon.start_at and coupon.start_at > now:
            raise serializers.ValidationError("این کد هنوز فعال نشده است")

        # تاریخ انقضا
        if coupon.expires_at and coupon.expires_at < now:
            raise serializers.ValidationError("این کد منقضی شده است")

        # محدودیت دوره
        if coupon.courses.exists():
            if not coupon.courses.filter(id=course_id).exists():
                raise serializers.ValidationError("این کد برای این دوره معتبر نیست")

        # سقف کل استفاده
        if coupon.max_uses is not None:
            if coupon.redemptions.count() >= coupon.max_uses:
                raise serializers.ValidationError("سقف استفاده از این کد پر شده است")

        # سقف برای هر کاربر
        if coupon.max_uses_per_user is not None:
            user_uses = coupon.redemptions.filter(user=user).count()
            if user_uses >= coupon.max_uses_per_user:
                raise serializers.ValidationError("شما قبلاً از این کد استفاده کرده‌اید")

        data["coupon"] = coupon
        return data
