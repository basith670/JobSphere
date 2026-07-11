from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterAPIView,
    LoginAPIView,
    ProfileAPIView,
)
from .dashboard import RecruiterDashboardAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", ProfileAPIView.as_view(), name="profile"),
    path("dashboard/",RecruiterDashboardAPIView.as_view(),name="recruiter-dashboard",
),
]