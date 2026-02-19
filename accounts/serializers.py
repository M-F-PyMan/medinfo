from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Profile, InstructorProfile, Enrollment


# -------------------------
# USER SERIALIZER (Admin + User)
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
# INSTRUCTOR PROFILE (Admin)
# -------------------------
class InstructorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # بهتر از StringRelatedField برای ادمین

    class Meta:
        model = InstructorProfile
        fields = [
            "id",
            "user",
            "degree",
            "experience",
            "linkedin",
            "website",
            "sheba_number",
            "card_number",
        ]


# -------------------------
# PROFILE (Admin + User)
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
# ENROLLMENT (Admin + User)
# -------------------------
class EnrollmentSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="course.id", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "user",
            "course_id",
            "course_title",
            "created_at",
        ]


# -------------------------
# REGISTER (User)
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
# LOGIN (User)
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
# ME (User)
# -------------------------
class MeSerializer(serializers.ModelSerializer):
    instructor_courses = serializers.SerializerMethodField()
    profile = ProfileSerializer(read_only=True)
    enrollments = EnrollmentSerializer(source="enrollment_set", many=True, read_only=True)

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
            "instructor_courses",
        ]

    def get_instructor_courses(self, obj):
        courses = obj.teacher_courses.all()
        return [
            {
                "id": c.id,
                "title": c.title,
                "lessons_count": c.lessons_count(),
                "created_at": c.created_at,
            }
            for c in courses
        ]
