from django.db.models import F

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters, generics
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer

from rest_framework.views import APIView


from rest_framework import status

from .models import SavedJob


# =====================================================
# PUBLIC JOB LIST
# =====================================================

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
    "company",
    ]

    ordering_fields = [
        "created_at",
        "salary_min",
        "salary_max",
    ]


# =====================================================
# PUBLIC JOB DETAIL
# =====================================================

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


# =====================================================
# RECRUITER - MY JOBS
# =====================================================

class RecruiterJobListAPIView(generics.ListAPIView):

    serializer_class = JobSerializer

    permission_classes = [IsAuthenticated]

    queryset = Job.objects.select_related("company")

    filter_backends = [

        DjangoFilterBackend,

        filters.SearchFilter,

        filters.OrderingFilter,

    ]

    search_fields = [

        "title",

        "location",

        "skills_required",

    ]

    filterset_fields = [

        "job_type",

        "is_active",

    ]

    ordering_fields = [

        "created_at",

        "salary_min",

        "salary_max",

    ]

    def get_queryset(self):

        return self.queryset.filter(

            recruiter=self.request.user

        )


# =====================================================
# RECRUITER - CREATE JOB
# =====================================================

class RecruiterCreateJobAPIView(CreateAPIView):

    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(
            recruiter=self.request.user
        )


# =====================================================
# RECRUITER - UPDATE JOB
# =====================================================

class RecruiterUpdateJobAPIView(UpdateAPIView):

    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Job.objects.filter(
            recruiter=self.request.user
        )


# =====================================================
# RECRUITER - DELETE JOB
# =====================================================

class RecruiterDeleteJobAPIView(DestroyAPIView):

    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Job.objects.filter(
            recruiter=self.request.user
        )
    
# =====================================================
# RECRUITER - SINGLE JOB
# =====================================================

class RecruiterJobDetailAPIView(generics.RetrieveAPIView):

    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Job.objects.filter(
            recruiter=self.request.user
        ).select_related("company")
    
from rest_framework.decorators import api_view
from rest_framework.response import Response

from jobs.models import Job
from companies.models import Company
from applications.models import Application


@api_view(["GET"])
def homepage_stats(request):

    return Response({
        "jobs": Job.objects.filter(is_active=True).count(),
        "companies": Company.objects.count(),
        "applications": Application.objects.count(),
        "success_rate": 95,
    })

class SaveJobAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        job = generics.get_object_or_404(Job, pk=pk)

        SavedJob.objects.get_or_create(
            user=request.user,
            job=job,
        )

        return Response(
            {
                "message": "Job saved successfully."
            },
            status=status.HTTP_200_OK,
        )
    
class UnsaveJobAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        SavedJob.objects.filter(
            user=request.user,
            job_id=pk,
        ).delete()

        return Response(
            {
                "message": "Job removed."
            },
            status=status.HTTP_200_OK,
        )
    
class SavedJobsAPIView(generics.ListAPIView):

    serializer_class = JobSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Job.objects.filter(

            saved_by__user=self.request.user

        ).select_related("company")