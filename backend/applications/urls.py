from django.urls import path
from .views import (
    ApplicationListCreateAPIView,
    ApplicationDetailAPIView,
)

urlpatterns = [
    path("", ApplicationListCreateAPIView.as_view(), name="application-list"),
    path("<int:pk>/", ApplicationDetailAPIView.as_view(), name="application-detail"),
]