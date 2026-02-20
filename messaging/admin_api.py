from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Ticket, TicketMessage, CourseMessage
from .admin_serializers import (
    TicketAdminSerializer,
    TicketMessageAdminSerializer,
    CourseMessageAdminSerializer,
)


class TicketAdminViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().select_related("user")
    serializer_class = TicketAdminSerializer
    permission_classes = [IsAdminUser]


class TicketMessageAdminViewSet(viewsets.ModelViewSet):
    queryset = TicketMessage.objects.all().select_related("ticket", "sender")
    serializer_class = TicketMessageAdminSerializer
    permission_classes = [IsAdminUser]


class CourseMessageAdminViewSet(viewsets.ModelViewSet):
    queryset = CourseMessage.objects.all().select_related("course", "sender")
    serializer_class = CourseMessageAdminSerializer
    permission_classes = [IsAdminUser]
