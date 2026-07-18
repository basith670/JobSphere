from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Resume
from .serializers import ResumeSerializer
from notifications.utils import create_notification


class ResumeListCreateAPIView(generics.ListCreateAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Resume.objects.filter(
            user=self.request.user,
        ).order_by(
            "-created_at",
        )

    def perform_create(self, serializer):

        resume = serializer.save(
            user=self.request.user,
        )

        create_notification(
            user=self.request.user,
            title="Resume Uploaded",
            message=f"Your resume '{resume.title}' has been uploaded successfully.",
        )


class ResumeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Resume.objects.filter(
            user=self.request.user,
        )