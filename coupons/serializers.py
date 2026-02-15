from rest_framework import serializers
from django.utils import timezone
from .models import Coupon, CouponRedemption
from courses.models import Course


class CouponValidateSerializer(serializers.Serializer):
    code = serializers.CharField()
    course_id = serializers.IntegerField()

    def validate(self, data):
        code = data["code"].strip()
        course_id = data["course_id"]
        user = self.context["request"].user

        try:
            coupon = Coupon.objects.get(code__iexact=code, is_active=True)
        except Coupon.DoesNotExist:
            raise serializers.ValidationError("کد تخفیف نامعتبر است")

        now = timezone.now()

        # 🔥 NEW: کوپن اختصاصی
        if coupon.assigned_user and coupon.assigned_user != user:
            raise serializers.ValidationError("این کد فقط برای یک کاربر خاص معتبر است")

        if coupon.start_at > now:
            raise serializers.ValidationError("این کد هنوز فعال نشده است")

        if coupon.expires_at < now:
            raise serializers.ValidationError("این کد منقضی شده است")

        if coupon.courses.exists():
            if not coupon.courses.filter(id=course_id).exists():
                raise serializers.ValidationError("این کد برای این دوره معتبر نیست")

        if coupon.max_uses is not None:
            if coupon.redemptions.count() >= coupon.max_uses:
                raise serializers.ValidationError("سقف استفاده از این کد پر شده است")

        if coupon.max_uses_per_user is not None:
            user_uses = coupon.redemptions.filter(user=user).count()
            if user_uses >= coupon.max_uses_per_user:
                raise serializers.ValidationError("شما قبلاً از این کد استفاده کرده‌اید")

        data["coupon"] = coupon
        return data

