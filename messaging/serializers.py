from rest_framework import serializers
from .models import Ticket, TicketMessage, CourseMessage


class TicketMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.name", read_only=True)

    class Meta:
        model = TicketMessage
        fields = ["id", "sender_name", "text", "file", "created_at"]


class TicketSerializer(serializers.ModelSerializer):
    messages = TicketMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ["id", "subject", "status", "created_at", "messages"]


class CourseMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.name", read_only=True)

    class Meta:
        model = CourseMessage
        fields = ["id", "sender_name", "text", "file", "created_at"]
