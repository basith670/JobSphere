from django.urls import path

from .views import JobRecommendationAPIView

urlpatterns = [

    path(
        "",
        JobRecommendationAPIView.as_view(),
        name="job-recommendations",
    ),

]