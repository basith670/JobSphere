from django.urls import path

from .views import (
    NotificationListAPIView,
    NotificationDetailAPIView,
    NotificationUnreadCountAPIView,
    MarkNotificationReadAPIView,
    MarkAllNotificationsReadAPIView,
)

urlpatterns = [

    path(
        "",
        NotificationListAPIView.as_view(),
        name="notification-list",
    ),

    path(
        "unread-count/",
        NotificationUnreadCountAPIView.as_view(),
        name="notification-unread-count",
    ),

    path(
        "read-all/",
        MarkAllNotificationsReadAPIView.as_view(),
        name="notification-read-all",
    ),

    path(
        "<int:pk>/read/",
        MarkNotificationReadAPIView.as_view(),
        name="notification-read",
    ),

    path(
        "<int:pk>/",
        NotificationDetailAPIView.as_view(),
        name="notification-detail",
    ),
]