from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from rest_framework import filters
from rest_framework import generics

from .models import Job
from .serializers import JobSerializer
from django.db.models import F


class JobListAPIView(generics.ListAPIView):

    serializer_class = JobSerializer

    queryset = Job.objects.filter(
        is_active=True,
    ).select_related("company")

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
    "title",
    "company__company_name",
    "location",
    "skills_required",
    ]

    filterset_fields = [
        "job_type",
        "experience",
        "location",
        "is_featured",
    ]

    ordering_fields = [
        "created_at",
        "salary_min",
        "salary_max",
    ]


class JobDetailAPIView(generics.RetrieveAPIView):

    serializer_class = JobSerializer

    queryset = Job.objects.select_related(

        "company",

        "recruiter",

    )

    def retrieve(self, request, *args, **kwargs):

        instance = self.get_object()

        instance.views = F("views") + 1

        instance.save(update_fields=["views"])

        instance.refresh_from_db()

        serializer = self.get_serializer(instance)

        return Response(serializer.data)