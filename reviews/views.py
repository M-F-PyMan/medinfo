from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from accounts.models import Enrollment
from courses.models import Course
from .models import Comment, Rating, CommentReport
from .serializers import CommentSerializer, RatingSerializer, CommentReportSerializer


class ReviewViewSet(viewsets.ViewSet):

    @action(detail=True, methods=["get"], permission_classes=[AllowAny])
    def comments(self, request, pk=None):
        course = Course.objects.get(id=pk)
        comments = course.comments.all().order_by("-created_at")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def add_comment(self, request, pk=None):
        course = Course.objects.get(id=pk)

        if not Enrollment.objects.filter(user=request.user, course=course).exists():
            return Response({"error": "برای ثبت نظر باید دوره را خریداری کرده باشید"}, status=403)

        comment = Comment.objects.create(
            user=request.user,
            course=course,
            text=request.data.get("text"),
        )

        return Response(CommentSerializer(comment).data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def rate(self, request, pk=None):
        course = Course.objects.get(id=pk)
        value = int(request.data.get("value", 0))

        if value < 1 or value > 5:
            return Response({"error": "امتیاز باید بین 1 تا 5 باشد"}, status=400)

        if not Enrollment.objects.filter(user=request.user, course=course).exists():
            return Response({"error": "برای امتیازدهی باید دوره را خریداری کرده باشید"}, status=403)

        rating, created = Rating.objects.update_or_create(
            user=request.user,
            course=course,
            defaults={"value": value},
        )

        return Response(RatingSerializer(rating).data)

    @action(detail=True, methods=["get"], permission_classes=[AllowAny])
    def average(self, request, pk=None):
        course = Course.objects.get(id=pk)
        ratings = course.ratings.all()

        if ratings.count() == 0:
            return Response({"average": 0})

        avg = round(sum(r.value for r in ratings) / ratings.count(), 1)

        return Response({"average": avg})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def report(self, request, pk=None):
        comment = Comment.objects.get(id=pk)
        serializer = CommentReportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        CommentReport.objects.create(
            reporter=request.user,
            comment=comment,
            reason=serializer.validated_data["reason"],
        )

        return Response({"message": "گزارش شما ثبت شد"})
