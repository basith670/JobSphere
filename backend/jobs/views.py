from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics

from .models import Job
from .serializers import JobSerializer


class JobListCreateAPIView(generics.ListCreateAPIView):

    queryset = Job.objects.select_related("company").all()

    serializer_class = JobSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "job_type",
        "experience",
        "location",
        "is_active",
        "is_featured",
    ]

    search_fields = [
        "title",
        "company__company_name",
        "location",
        "skills_required",
    ]

    ordering_fields = [
        "salary_min",
        "salary_max",
        "created_at",
        "deadline",
    ]

    ordering = [
        "-created_at",
    ]


class JobDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Job.objects.select_related("company").all()

    serializer_class = JobSerializer