from django.urls import path

from .views import (
    MockInterviewEvaluateAPIView,
)

urlpatterns = [

    path(
        "evaluate/",
        MockInterviewEvaluateAPIView.as_view(),
        name="mock-interview-evaluate",
    ),

]