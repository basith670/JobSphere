from django.urls import path

from .views import (
    JobListAPIView,
    JobDetailAPIView,
    RecruiterJobListAPIView,
    RecruiterJobDetailAPIView,
    RecruiterCreateJobAPIView,
    RecruiterUpdateJobAPIView,
    RecruiterDeleteJobAPIView,
    SaveJobAPIView,
    UnsaveJobAPIView,
    SavedJobsAPIView,
    homepage_stats,
)

urlpatterns = [

    # =====================================================
    # PUBLIC JOBS
    # =====================================================

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

    path(
        "homepage-stats/",
        homepage_stats,
        name="homepage-stats",
    ),

    # =====================================================
    # SAVED JOBS
    # =====================================================

    path(
        "saved/",
        SavedJobsAPIView.as_view(),
        name="saved-jobs",
    ),

    path(
        "<int:pk>/save/",
        SaveJobAPIView.as_view(),
        name="save-job",
    ),

    path(
        "<int:pk>/unsave/",
        UnsaveJobAPIView.as_view(),
        name="unsave-job",
    ),

    # =====================================================
    # RECRUITER
    # =====================================================

    path(
        "my/",
        RecruiterJobListAPIView.as_view(),
        name="my-jobs",
    ),

    path(
        "my/<int:pk>/",
        RecruiterJobDetailAPIView.as_view(),
        name="my-job-detail",
    ),

    path(
        "create/",
        RecruiterCreateJobAPIView.as_view(),
        name="create-job",
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
]