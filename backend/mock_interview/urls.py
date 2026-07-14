from django.urls import path

from .views import (
    StartInterviewAPIView,
    SubmitAnswerAPIView,
)

urlpatterns = [

    path(
        "start/",
        StartInterviewAPIView.as_view(),
        name="start-interview",
    ),

    path(
        "submit/",
        SubmitAnswerAPIView.as_view(),
        name="submit-answer",
    ),

]