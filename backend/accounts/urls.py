from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterAPIView,
    LoginAPIView,
    ProfileAPIView,
    ChangePasswordAPIView,
)

from .password_views import (
    ForgotPasswordAPIView,
    ResetPasswordAPIView,
)

from .dashboard import RecruiterDashboardAPIView


urlpatterns = [

    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
        "profile/",
        ProfileAPIView.as_view(),
        name="profile",
    ),

    path(
        "dashboard/",
        RecruiterDashboardAPIView.as_view(),
        name="recruiter-dashboard",
    ),

    path(
        "forgot-password/",
        ForgotPasswordAPIView.as_view(),
        name="forgot-password",
    ),

    path(
        "reset-password/",
        ResetPasswordAPIView.as_view(),
        name="reset-password",
    ),

    path(
        "change-password/",
        ChangePasswordAPIView.as_view(),
        name="change-password",
    ),

]