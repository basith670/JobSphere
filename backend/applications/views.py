from rest_framework import generics

from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsJobSeeker


class ApplicationListCreateAPIView(generics.ListCreateAPIView):

    queryset = Application.objects.select_related(
        "applicant",
        "job",
    )

    serializer_class = ApplicationSerializer

    permission_classes = [IsJobSeeker]

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)


class ApplicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Application.objects.select_related(
        "applicant",
        "job",
    )

    serializer_class = ApplicationSerializer

    permission_classes = [IsJobSeeker]