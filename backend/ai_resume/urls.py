from django.urls import path

from .views import (
    ResumeAnalysisAPIView,
    ResumeAnalysisHistoryAPIView,
)

urlpatterns = [

    path(
        "<int:resume_id>/analyze/",
        ResumeAnalysisAPIView.as_view(),
        name="resume-analyze",
    ),

    path(
        "history/",
        ResumeAnalysisHistoryAPIView.as_view(),
        name="resume-analysis-history",
    ),

]