from django.urls import path

from .views import (
    NotificationListAPIView,
    NotificationDetailAPIView,
)

urlpatterns = [

    path(
        "",
        NotificationListAPIView.as_view(),
    ),

    path(
        "<int:pk>/",
        NotificationDetailAPIView.as_view(),
    ),

]