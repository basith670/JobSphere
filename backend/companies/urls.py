from django.urls import path
from .views import MyCompanyAPIView

urlpatterns = [
    path("me/", MyCompanyAPIView.as_view(), name="my-company"),
]