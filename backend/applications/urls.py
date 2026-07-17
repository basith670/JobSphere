from django.urls import path
from .views import (
    ApplicationListCreateAPIView,
    ApplicationDetailAPIView,
    RecruiterApplicationsAPIView,
    JobApplicantsAPIView,
)

urlpatterns = [

    path("", ApplicationListCreateAPIView.as_view()),

    path("recruiter/", RecruiterApplicationsAPIView.as_view()),

    path(

        "job/<int:job_id>/",

        JobApplicantsAPIView.as_view(),

    ),

    path("<int:pk>/", ApplicationDetailAPIView.as_view()),

]