from django.urls import path

from .views import (
    InterviewListCreateAPIView,
    InterviewDetailAPIView,
)

urlpatterns = [

    path(
        "",
        InterviewListCreateAPIView.as_view(),
        name="interview-list",
    ),

    path(
        "<int:pk>/",
        InterviewDetailAPIView.as_view(),
        name="interview-detail",
    ),

]