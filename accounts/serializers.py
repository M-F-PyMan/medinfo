from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Profile, InstructorProfile, Enrollment


# -------------------------
#  User Serializer
# -------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "name",
            "is_teacher",
            "is_staff",
            "date_joined",
        ]


# -------------------------
#  Profile Serializer
# -------------------------
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "image",
            "bio",
            "specialty",
            "field",
            "phone",
        ]


# -------------------------
#  Enrollment Serializer
# -------------------------
class EnrollmentSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="course.id", read_only=True)

    class Meta:
        model = Enrollment
        fields = ["course_id", "created_at"]


# -------------------------
#  Register Serializer
# -------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "name"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
            name=validated_data.get("name"),
        )
        Profile.objects.create(user=user)
        return user


# -------------------------
#  Login Serializer
# -------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )
        if not user:
            raise serializers.ValidationError("نام کاربری یا رمز عبور اشتباه است")
        if not user.is_active:
            raise serializers.ValidationError("حساب کاربری غیرفعال است")
        data["user"] = user
        return data


# -------------------------
#  Me Serializer (User + Profile + Enrollments)
# -------------------------
class MeSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    enrollments = EnrollmentSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "name",
            "is_teacher",
            "is_staff",
            "date_joined",
            "profile",
            "enrollments",
        ]
