from django.urls import path
from .views import ReviewViewSet

review = ReviewViewSet.as_view

urlpatterns = [
    path("<int:pk>/comments/", review({"get": "comments"})),
    path("<int:pk>/comments/add/", review({"post": "add_comment"})),
    path("<int:pk>/rate/", review({"post": "rate"})),
    path("<int:pk>/rating/average/", review({"get": "average"})),
]
