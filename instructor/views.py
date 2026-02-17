from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Avg, Sum
import os
from django.conf import settings
from django.core.files import File
from courses.models import Course, Lesson, LessonProgress
from accounts.models import Enrollment
from payout.models import InstructorEarning, PayoutRequest
from reviews.models import Rating, Comment

from .serializers import (
    InstructorCourseSerializer,
    InstructorOverviewSerializer,
    InstructorCourseDetailSerializer,
    InstructorCourseStudentSerializer,
    InstructorCourseCreateSerializer,
    InstructorCourseUpdateSerializer,
    InstructorLessonSerializer,
)


class InstructorDashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # ---------------------------------------------------
    #  HELPERS
    # ---------------------------------------------------
    def _is_instructor(self, user):
        return getattr(user, "is_teacher", False)

    def _get_course(self, user, pk):
        return Course.objects.filter(id=pk, teacher=user).first()

    # ---------------------------------------------------
    #  OVERVIEW
    # ---------------------------------------------------
    @action(detail=False, methods=["get"])
    def overview(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        courses = Course.objects.filter(teacher=user)

        data = {
            "courses_count": courses.count(),
            "lessons_count": Lesson.objects.filter(course__teacher=user).count(),
            "students_count": Enrollment.objects.filter(
                course__teacher=user
            ).values("user").distinct().count(),
            "average_rating": round(
                Rating.objects.filter(course__teacher=user).aggregate(avg=Avg("value"))["avg"] or 0, 1
            ),
            "comments_count": Comment.objects.filter(course__teacher=user).count(),
            "total_earned": InstructorEarning.objects.filter(
                instructor=user
            ).aggregate(s=Sum("instructor_amount"))["s"] or 0,
            "total_paid": PayoutRequest.objects.filter(
                instructor=user, status="PAID"
            ).aggregate(s=Sum("amount"))["s"] or 0,
        }

        data["withdrawable"] = max(0, data["total_earned"] - data["total_paid"])

        return Response(InstructorOverviewSerializer(data).data)

    # ---------------------------------------------------
    #  COURSES LIST
    # ---------------------------------------------------
    @action(detail=False, methods=["get"])
    def courses(self, request):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        qs = Course.objects.filter(teacher=user).annotate(
            students_count=Count("enrollments", distinct=True),
            average_rating=Avg("ratings__value"),
            comments_count=Count("comments"),
            earnings=Sum("earnings__instructor_amount"),
        ).order_by("-id")

        return Response(InstructorCourseSerializer(qs, many=True).data)

    # ---------------------------------------------------
    #  COURSE DETAIL
    # ---------------------------------------------------
    @action(detail=True, methods=["get"])
    def detail(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        lessons = list(course.lessons.all().values("id", "title", "order"))
        students = Enrollment.objects.filter(course=course).select_related("user")

        students_data = []
        total_lessons = course.lessons.count()

        for en in students:
            completed = LessonProgress.objects.filter(
                user=en.user,
                lesson__course=course,
                completed=True
            ).count()

            percent = int((completed / total_lessons) * 100) if total_lessons else 0

            students_data.append({
                "id": en.user.id,
                "name": en.user.name,
                "email": en.user.email,
                "enrolled_at": en.created_at,
                "progress_percent": percent,
            })

        data = {
            "id": course.id,
            "title": course.title,
            "slug": course.slug,
            "status": course.status,
            "created_at": course.created_at,

            "lessons_count": total_lessons,
            "students_count": students.count(),
            "average_rating": Rating.objects.filter(course=course).aggregate(avg=Avg("value"))["avg"] or 0,
            "comments_count": Comment.objects.filter(course=course).count(),
            "earnings": InstructorEarning.objects.filter(course=course).aggregate(s=Sum("instructor_amount"))["s"] or 0,

            "lessons": lessons,
            "students": students_data,
        }

        return Response(InstructorCourseDetailSerializer(data).data)

    # ---------------------------------------------------
    #  CREATE COURSE
    # ---------------------------------------------------
    @action(detail=False, methods=["post"])
    def create_course(self, request):
        if not self._is_instructor(request.user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        serializer = InstructorCourseCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        course = serializer.save(teacher=request.user)

        return Response({"message": "Course created", "id": course.id})

    # ---------------------------------------------------
    #  UPDATE COURSE
    # ---------------------------------------------------
    @action(detail=True, methods=["put", "patch"])
    def update_course(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        serializer = InstructorCourseUpdateSerializer(course, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Course updated"})

    # ---------------------------------------------------
    #  DELETE COURSE
    # ---------------------------------------------------
    @action(detail=True, methods=["delete"])
    def delete_course(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        course.delete()
        return Response({"message": "Course deleted"})

    # ---------------------------------------------------
    #  ADD LESSON
    # ---------------------------------------------------
    @action(detail=True, methods=["post"])
    def add_lesson(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        serializer = InstructorLessonSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(course=course)

        return Response({"message": "Lesson added"})

    # ---------------------------------------------------
    #  UPDATE LESSON
    # ---------------------------------------------------
    @action(detail=True, methods=["put", "patch"])
    def update_lesson(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        lesson = Lesson.objects.filter(id=pk, course__teacher=user).first()
        if not lesson:
            return Response({"error": "Lesson not found"}, status=404)

        serializer = InstructorLessonSerializer(lesson, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Lesson updated"})

    # ---------------------------------------------------
    #  DELETE LESSON
    # ---------------------------------------------------
    @action(detail=True, methods=["delete"])
    def delete_lesson(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        lesson = Lesson.objects.filter(id=pk, course__teacher=user).first()
        if not lesson:
            return Response({"error": "Lesson not found"}, status=404)

        lesson.delete()
        return Response({"message": "Lesson deleted"})

    # ---------------------------------------------------
    #  CHANGE COURSE STATUS
    # ---------------------------------------------------
    @action(detail=True, methods=["post"])
    def change_status(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        status_value = request.data.get("status")
        if status_value not in ["draft", "published", "completed"]:
            return Response({"error": "Invalid status"}, status=400)

        course.status = status_value
        course.save()

        return Response({"message": "Status updated", "status": status_value})

    # ---------------------------------------------------
    #  REORDER LESSONS
    # ---------------------------------------------------
    @action(detail=True, methods=["post"])
    def reorder_lessons(self, request, pk=None):
        user = request.user
        if not self._is_instructor(user):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        course = self._get_course(user, pk)
        if not course:
            return Response({"error": "Course not found"}, status=404)

        order_list = request.data.get("order")
        if not isinstance(order_list, list):
            return Response({"error": "order must be a list"}, status=400)

        lessons = {l.id: l for l in course.lessons.all()}

        for index, lesson_id in enumerate(order_list, start=1):
            if lesson_id in lessons:
                lessons[lesson_id].order = index
                lessons[lesson_id].save()

        return Response({"message": "Lessons reordered"})





class InstructorDashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # -----------------------------
    #  INITIATE UPLOAD
    # -----------------------------
    @action(detail=True, methods=["post"])
    def upload_init(self, request, pk=None):
        user = request.user
        if not getattr(user, "is_teacher", False):
            return Response({"error": "Unauthorized"}, status=403)

        lesson = Lesson.objects.filter(id=pk, course__teacher=user).first()
        if not lesson:
            return Response({"error": "Lesson not found"}, status=404)

        upload_id = f"{lesson.id}_{user.id}"
        upload_dir = os.path.join(settings.MEDIA_ROOT, "temp_uploads", upload_id)

        os.makedirs(upload_dir, exist_ok=True)

        return Response({
            "upload_id": upload_id,
            "message": "Upload session initialized"
        })

    # -----------------------------
    #  UPLOAD CHUNK
    # -----------------------------
    @action(detail=False, methods=["post"])
    def upload_chunk(self, request):
        upload_id = request.data.get("upload_id")
        chunk_index = request.data.get("chunk_index")
        chunk_file = request.FILES.get("chunk")

        if not upload_id or chunk_index is None or not chunk_file:
            return Response({"error": "Invalid chunk data"}, status=400)

        upload_dir = os.path.join(settings.MEDIA_ROOT, "temp_uploads", upload_id)
        os.makedirs(upload_dir, exist_ok=True)

        chunk_path = os.path.join(upload_dir, f"chunk_{chunk_index}.part")

        with open(chunk_path, "wb") as f:
            for chunk in chunk_file.chunks():
                f.write(chunk)

        return Response({"message": f"Chunk {chunk_index} uploaded"})

    # -----------------------------
    #  FINALIZE UPLOAD (MERGE)
    # -----------------------------
    @action(detail=False, methods=["post"])
    def upload_finalize(self, request):
        upload_id = request.data.get("upload_id")
        lesson_id = request.data.get("lesson_id")
        total_chunks = int(request.data.get("total_chunks"))

        user = request.user
        lesson = Lesson.objects.filter(id=lesson_id, course__teacher=user).first()

        if not lesson:
            return Response({"error": "Lesson not found"}, status=404)

        upload_dir = os.path.join(settings.MEDIA_ROOT, "temp_uploads", upload_id)

        final_path = os.path.join(settings.MEDIA_ROOT, "course_videos", f"lesson_{lesson.id}.mp4")

        os.makedirs(os.path.dirname(final_path), exist_ok=True)

        # MERGE
        with open(final_path, "wb") as final_file:
            for i in range(total_chunks):
                chunk_path = os.path.join(upload_dir, f"chunk_{i}.part")
                if not os.path.exists(chunk_path):
                    return Response({"error": f"Missing chunk {i}"}, status=400)

                with open(chunk_path, "rb") as chunk:
                    final_file.write(chunk.read())

        # SAVE TO LESSON
        with open(final_path, "rb") as f:
            lesson.video_file.save(f"lesson_{lesson.id}.mp4", File(f), save=True)

        # CLEANUP
        for f in os.listdir(upload_dir):
            os.remove(os.path.join(upload_dir, f))
        os.rmdir(upload_dir)

        return Response({"message": "Upload completed", "file": lesson.video_file.url})
