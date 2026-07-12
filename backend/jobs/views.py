from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics

from .models import Job
from .serializers import JobSerializer
from .permissions import IsRecruiterOrReadOnly

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Job, SavedJob
from .serializers import JobSerializer, SavedJobSerializer

from .filters import JobFilter


class JobListCreateAPIView(generics.ListCreateAPIView):

    permission_classes = [IsRecruiterOrReadOnly]

    queryset = Job.objects.select_related(
        "company"
    ).all()

    serializer_class = JobSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Use the custom FilterSet
    filterset_class = JobFilter

    search_fields = [
        "title",
        "description",
        "requirements",
        "skills_required",
        "company__company_name",
        "location",
    ]

    ordering_fields = [
        "salary_min",
        "salary_max",
        "created_at",
        "deadline",
        "title",
    ]

    ordering = [
        "-created_at",
    ]


class JobDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsRecruiterOrReadOnly]

    queryset = Job.objects.select_related("company").all()

    serializer_class = JobSerializer


class SavedJobListCreateAPIView(generics.ListCreateAPIView):

    serializer_class = SavedJobSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return SavedJob.objects.filter(
            user=self.request.user
        ).select_related(
            "job",
            "job__company",
        )

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )


class SavedJobDeleteAPIView(generics.DestroyAPIView):

    serializer_class = SavedJobSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return SavedJob.objects.filter(
            user=self.request.user
        )