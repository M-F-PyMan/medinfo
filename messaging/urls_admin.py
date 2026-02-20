# messaging/urls_admin.py
from rest_framework.routers import DefaultRouter
from .admin_api import (
    TicketAdminViewSet,
    TicketMessageAdminViewSet,
    CourseMessageAdminViewSet,
)

router = DefaultRouter()
router.register("admin/tickets", TicketAdminViewSet, basename="admin-tickets")
router.register("admin/ticket-messages", TicketMessageAdminViewSet, basename="admin-ticket-messages")
router.register("admin/course-messages", CourseMessageAdminViewSet, basename="admin-course-messages")

urlpatterns = router.urls
