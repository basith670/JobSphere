from django.urls import path

from .views import (
    ReviewListCreateAPIView,
    ReviewDetailAPIView,
    CompanyRatingAPIView,
    TopRatedCompaniesAPIView,
)

urlpatterns = [

    path(
        "",
        ReviewListCreateAPIView.as_view(),
    ),

    path(
        "<int:pk>/",
        ReviewDetailAPIView.as_view(),
    ),

    path(
        "company/<int:company_id>/rating/",
        CompanyRatingAPIView.as_view(),
    ),

    path(
        "top-rated/",
        TopRatedCompaniesAPIView.as_view(),
    ),
]