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
        name="review-list",
    ),

    path(
        "<int:pk>/",
        ReviewDetailAPIView.as_view(),
        name="review-detail",
    ),

    path(
        "company/<int:company_id>/rating/",
        CompanyRatingAPIView.as_view(),
        name="company-rating",
    ),

    path(
        "top-rated/",
        TopRatedCompaniesAPIView.as_view(),
        name="top-rated-companies",
    ),
]