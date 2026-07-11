from django.urls import path
from .views import (
    ApplicationListCreateAPIView,
    ApplicationDetailAPIView,
    RecruiterApplicationsAPIView,
)

urlpatterns = [
    path("", ApplicationListCreateAPIView.as_view(), name="application-list"),
    path("<int:pk>/", ApplicationDetailAPIView.as_view(), name="application-detail"),
    path(
    "recruiter/",
    RecruiterApplicationsAPIView.as_view(),
    name="recruiter-applications",
),
]