from django.urls import path

from .views import InterviewQuestionAPIView

urlpatterns = [

    path(
        "generate/",
        InterviewQuestionAPIView.as_view(),
        name="interview-generate",
    ),

]