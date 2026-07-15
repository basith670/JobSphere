from django.urls import path

from .profile_views import ProfileAPIView

urlpatterns = [
    path("", ProfileAPIView.as_view()),
]