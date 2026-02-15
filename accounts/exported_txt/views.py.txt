from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    MeSerializer,
    UserSerializer
)
from .models import User
from accounts.models import Enrollment
from courses.serializers import CourseListSerializer


# ---------------------------------------------------
#   لیست دوره‌های خریداری‌شده کاربر
# ---------------------------------------------------
class MyCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(user=request.user)
        courses = [en.course for en in enrollments]
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data)


# ---------------------------------------------------
#   احراز هویت (ثبت‌نام، ورود، خروج، اطلاعات کاربر)
# ---------------------------------------------------
class AuthViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "ثبت‌نام با موفقیت انجام شد",
            "user": UserSerializer(user).data
        })

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data
        })

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        return Response(MeSerializer(request.user).data)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def logout(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass

        return Response({"message": "خروج انجام شد"})
