from django.urls import path
from .views import (
    MyCompanyAPIView,
    CompanyListAPIView,
)


urlpatterns = [
    path("", CompanyListAPIView.as_view(), name="company-list"),
    path("me/", MyCompanyAPIView.as_view(), name="my-company"),
]