from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import User, Profile, InstructorProfile, Enrollment
from .serializers import UserSerializer, ProfileSerializer, InstructorProfileSerializer, EnrollmentSerializer


class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related("profile", "instructor_profile")
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class EnrollmentAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Enrollment.objects.select_related("user", "course")
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdminUser]


class ProfileAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.select_related("user")
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class InstructorProfileAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InstructorProfile.objects.select_related("user")
    serializer_class = InstructorProfileSerializer
    permission_classes = [IsAdminUser]
