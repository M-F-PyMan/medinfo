from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import (
    User,
    Profile,
    InstructorProfile,
    Enrollment,
    TeacherApplication,
    JobOpening,
    InstructorCategory,
)
from django.db.models import Avg, Count
from reviews.models import InstructorReview
from reviews.serializers import InstructorReviewSerializer

class InstructorCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorCategory
        fields = ["id", "name", "slug"]





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
    category = InstructorCategorySerializer(read_only=True)

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

# -------------------------------------------------
# TEACHER APPLICATIONS SERIALIZERS(Admin & Public)
# -------------------------------------------------
class TeacherApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherApplication
        fields = [
            "id",
            "specialty",
            "experience",
            "national_card_front",
            "national_card_back",
            "medical_card_front",
            "medical_card_back",
            "resume_file",
            "status",
            "admin_note",
            "created_at",
            "reviewed_at",
        ]
        read_only_fields = ["status", "admin_note", "created_at", "reviewed_at"]


class TeacherApplicationAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TeacherApplication
        fields = [
            "id",
            "user",
            "specialty",
            "experience",
            "national_card_front",
            "national_card_back",
            "medical_card_front",
            "medical_card_back",
            "resume_file",
            "status",
            "admin_note",
            "created_at",
            "reviewed_at",
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



class InstructorPublicSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    instructor_profile = InstructorProfileSerializer(read_only=True)
    category = serializers.SerializerMethodField()

    students = serializers.SerializerMethodField()
    courses = serializers.SerializerMethodField()

    rating = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    instructor_reviews = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "username",
            "profile",
            "category",
            "instructor_profile",
            "students",
            "courses",
            "rating",
            "reviews_count",
            "instructor_reviews",
        ]

    def get_category(self, obj):
        if obj.instructor_profile and obj.instructor_profile.category:
            return InstructorCategorySerializer(obj.instructor_profile.category).data
        return None

    # تعداد دانشجو
    def get_students(self, obj):
        return Enrollment.objects.filter(course__teacher=obj).values("user").distinct().count()

    # تعداد دوره
    def get_courses(self, obj):
        return obj.teacher_courses.count()

    # میانگین امتیاز مدرس
    def get_rating(self, obj):
        avg = InstructorReview.objects.filter(instructor=obj).aggregate(a=Avg("rating"))["a"]
        return round(avg or 0, 1)

    # تعداد نظرات
    def get_reviews_count(self, obj):
        return InstructorReview.objects.filter(instructor=obj).count()

    # لیست نظرات
    def get_instructor_reviews(self, obj):
        reviews = InstructorReview.objects.filter(instructor=obj).order_by("-created_at")
        return InstructorReviewSerializer(reviews, many=True).data



class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = "__all__"

class JobOpeningAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = "__all__"