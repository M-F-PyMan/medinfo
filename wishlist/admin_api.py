from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import WishlistItem
from .admin_serializers import WishlistItemAdminSerializer


class WishlistItemAdminViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all().select_related("user", "course")
    serializer_class = WishlistItemAdminSerializer
    permission_classes = [IsAdminUser]
