from django.urls import path

from .views import CoverLetterAPIView

urlpatterns = [

    path(
        "generate/",
        CoverLetterAPIView.as_view(),
        name="cover-letter-generate",
    ),

]