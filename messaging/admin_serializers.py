from rest_framework import serializers
from .models import Ticket, TicketMessage, CourseMessage
from accounts.serializers import UserSerializer
from courses.admin_serializers import CourseAdminSerializer


class TicketAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    messages_count = serializers.IntegerField(source="messages.count", read_only=True)

    class Meta:
        model = Ticket
        fields = [
            "id",
            "user",
            "subject",
            "status",
            "messages_count",
            "created_at",
        ]


class TicketMessageAdminSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    ticket_subject = serializers.CharField(source="ticket.subject", read_only=True)

    class Meta:
        model = TicketMessage
        fields = [
            "id",
            "ticket",
            "ticket_subject",
            "sender",
            "text",
            "file",
            "created_at",
        ]


class CourseMessageAdminSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    course = CourseAdminSerializer(read_only=True)

    class Meta:
        model = CourseMessage
        fields = [
            "id",
            "course",
            "sender",
            "text",
            "file",
            "created_at",
        ]
