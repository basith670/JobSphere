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
    ),

    path(
        "recent-applications/",
        RecentApplicationsAPIView.as_view(),
    ),

    path(
        "job-statistics/",
        JobStatisticsAPIView.as_view(),
    ),

]