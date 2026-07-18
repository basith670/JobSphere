from django.urls import path

from .views import (
    JobDetailAPIView,
    JobListAPIView,
)
from .views import (
    JobListAPIView,
    JobDetailAPIView,
    RecruiterJobListAPIView,
    RecruiterJobDetailAPIView,
    RecruiterCreateJobAPIView,
    RecruiterUpdateJobAPIView,
    RecruiterDeleteJobAPIView,
)

from .views import homepage_stats

urlpatterns = [

    path(
        "",
        JobListAPIView.as_view(),
        name="job-list",
    ),

    path(
        "my/",
        RecruiterJobListAPIView.as_view(),
        name="my-jobs",
    ),

    path(
        "create/",
        RecruiterCreateJobAPIView.as_view(),
        name="create-job",
    ),

    path(
        "<int:pk>/",
        JobDetailAPIView.as_view(),
        name="job-detail",
    ),

    path(
        "<int:pk>/update/",
        RecruiterUpdateJobAPIView.as_view(),
        name="update-job",
    ),

    path(
        "<int:pk>/delete/",
        RecruiterDeleteJobAPIView.as_view(),
        name="delete-job",
    ),

    path(
    "my/<int:pk>/",
    RecruiterJobDetailAPIView.as_view(),
    name="my-job-detail",
),

    path("homepage-stats/", homepage_stats),

]