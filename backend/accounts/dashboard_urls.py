from django.urls import path

from .dashboard_views import CandidateDashboardAPIView

urlpatterns = [
    path(
        "candidate/",
        CandidateDashboardAPIView.as_view(),
        name="candidate-dashboard",
    ),
]