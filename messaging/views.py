from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from courses.models import Course
from accounts.models import Enrollment
from notifications.utils import create_notification

from .models import Ticket, TicketMessage, CourseMessage
from .serializers import TicketSerializer, TicketMessageSerializer, CourseMessageSerializer


class TicketViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        tickets = Ticket.objects.filter(user=request.user).order_by("-created_at")
        return Response(TicketSerializer(tickets, many=True).data)

    @action(detail=False, methods=["post"])
    def create_ticket(self, request):
        subject = request.data.get("subject")
        text = request.data.get("text")

        ticket = Ticket.objects.create(
            user=request.user,
            subject=subject,
        )

        TicketMessage.objects.create(
            ticket=ticket,
            sender=request.user,
            text=text,
        )

        return Response(TicketSerializer(ticket).data)

    @action(detail=True, methods=["post"])
    def reply(self, request, pk=None):
        ticket = Ticket.objects.get(id=pk)

        msg = TicketMessage.objects.create(
            ticket=ticket,
            sender=request.user,
            text=request.data.get("text"),
            file=request.data.get("file"),
        )

        # نوتیف برای پشتیبانی یا کاربر
        if request.user.is_staff:
            create_notification(
                user=ticket.user,
                type_="system",
                title="پاسخ جدید به تیکت",
                message=f"پشتیبانی به تیکت شما پاسخ داد.",
                target_url=f"/tickets/{ticket.id}/",
            )
        else:
            # نوتیف برای ادمین‌ها
            pass

        return Response(TicketMessageSerializer(msg).data)


class CourseMessageViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["get"])
    def list_messages(self, request, pk=None):
        course = Course.objects.get(id=pk)

        # فقط مدرس یا دانشجوی ثبت‌نام‌شده
        if not (course.teacher == request.user or Enrollment.objects.filter(user=request.user, course=course).exists()):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        msgs = CourseMessage.objects.filter(course=course).order_by("created_at")
        return Response(CourseMessageSerializer(msgs, many=True).data)

    @action(detail=True, methods=["post"])
    def send(self, request, pk=None):
        course = Course.objects.get(id=pk)

        if not (course.teacher == request.user or Enrollment.objects.filter(user=request.user, course=course).exists()):
            return Response({"error": "دسترسی مجاز نیست"}, status=403)

        msg = CourseMessage.objects.create(
            course=course,
            sender=request.user,
            text=request.data.get("text"),
            file=request.data.get("file"),
        )

        # نوتیف برای طرف مقابل
        if request.user == course.teacher:
            # پیام مدرس → دانشجو
            enrolled_users = Enrollment.objects.filter(course=course).values_list("user", flat=True)
            for uid in enrolled_users:
                create_notification(
                    user_id=uid,
                    type_="comment",
                    title="پیام جدید از مدرس",
                    message=f"مدرس دوره «{course.title}» برای شما پیام ارسال کرد.",
                    target_url=f"/courses/{course.id}/messages/",
                )
        else:
            # پیام دانشجو → مدرس
            create_notification(
                user=course.teacher,
                type_="comment",
                title="پیام جدید دانشجو",
                message=f"یک دانشجو درباره دوره «{course.title}» پیام ارسال کرد.",
                target_url=f"/courses/{course.id}/messages/",
            )

        return Response(CourseMessageSerializer(msg).data)
