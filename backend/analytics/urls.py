from django.urls import path

from .views import (
    RecruiterAnalyticsAPIView,
    RecentApplicationsAPIView,
    JobStatisticsAPIView,
)

urlpatterns = [

    path(
        "dashboard/",
        RecruiterAnalyticsAPIView.as_view(),
        name="analytics-dashboard",
    ),

    path(
        "recent-applications/",
        RecentApplicationsAPIView.as_view(),
        name="recent-applications",
    ),

    path(
        "job-statistics/",
        JobStatisticsAPIView.as_view(),
        name="job-statistics",
    ),

]