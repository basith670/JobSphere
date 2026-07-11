from django.urls import path

from .views import SendTestEmailAPIView

urlpatterns = [

    path(
        "test/",
        SendTestEmailAPIView.as_view(),
    ),

]