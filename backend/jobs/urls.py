from django.urls import path

from .views import (
    JobListCreateAPIView,
    JobDetailAPIView,
    SavedJobListCreateAPIView,
    SavedJobDeleteAPIView,
)

urlpatterns = [
    path("", JobListCreateAPIView.as_view(), name="job-list-create"),
    path("<int:pk>/", JobDetailAPIView.as_view(), name="job-detail"),

    path(
        "saved-jobs/",
        SavedJobListCreateAPIView.as_view(),
        name="saved-job-list-create",
    ),

    path(
        "saved-jobs/<int:pk>/",
        SavedJobDeleteAPIView.as_view(),
        name="saved-job-delete",
    ),
]