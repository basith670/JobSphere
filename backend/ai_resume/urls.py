from django.urls import path

from .views import (
    ResumeAnalysisAPIView,
    ResumeAnalysisHistoryAPIView,
    ResumeJobMatchAPIView,
)

urlpatterns = [

    path(
        "<int:resume_id>/analyze/",
        ResumeAnalysisAPIView.as_view(),
        name="resume-analyze",
    ),

    path(
        "<int:resume_id>/match/",
        ResumeJobMatchAPIView.as_view(),
        name="resume-match",
    ),

    path(
        "history/",
        ResumeAnalysisHistoryAPIView.as_view(),
        name="resume-analysis-history",
    ),

]