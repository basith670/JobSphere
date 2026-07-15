from django.urls import path

from .views import (
    JobDetailAPIView,
    JobListAPIView,
)

urlpatterns = [

    path(
        "",
        JobListAPIView.as_view(),
        name="job-list",
    ),

    path(
        "<int:pk>/",
        JobDetailAPIView.as_view(),
        name="job-detail",
    ),

]