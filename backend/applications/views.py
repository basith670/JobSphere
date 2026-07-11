from rest_framework import generics

from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsJobSeeker
from .permissions import IsRecruiterOwner


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
        "job__company",
    )

    serializer_class = ApplicationSerializer

    permission_classes = [IsRecruiterOwner]

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import ApplicationSerializer


class RecruiterApplicationsAPIView(generics.ListAPIView):

    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Application.objects.filter(
            job__company__owner=self.request.user
        ).select_related(
            "applicant",
            "job",
            "job__company",
        )
    

