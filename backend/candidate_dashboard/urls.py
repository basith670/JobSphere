from django.urls import path

from .views import CandidateDashboardAPIView

urlpatterns = [
    path(
        "",
        CandidateDashboardAPIView.as_view(),
        name="candidate-dashboard",
    ),
]