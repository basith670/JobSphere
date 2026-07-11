from django.urls import path

from .views import (
    InterviewListCreateAPIView,
    InterviewDetailAPIView,
)

urlpatterns = [

    path(
        "",
        InterviewListCreateAPIView.as_view(),
    ),

    path(
        "<int:pk>/",
        InterviewDetailAPIView.as_view(),
    ),

]