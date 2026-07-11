from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from companies.models import Company
from jobs.models import Job
from applications.models import Application

class RecruiterAnalyticsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "recruiter":
            return Response(
                {
                    "detail": "Only recruiters can access analytics."
                },
                status=403,
            )

        companies = Company.objects.filter(
            owner=request.user,
        )

        jobs = Job.objects.filter(
            company__owner=request.user,
        )

        applications = Application.objects.filter(
            job__company__owner=request.user,
        )

        data = {

            "total_companies": companies.count(),

            "total_jobs": jobs.count(),

            "active_jobs": jobs.filter(
                is_active=True,
            ).count(),

            "inactive_jobs": jobs.filter(
                is_active=False,
            ).count(),

            "featured_jobs": jobs.filter(
                is_featured=True,
            ).count(),

            "total_applications": applications.count(),

            "pending_applications": applications.filter(
                status="Pending",
            ).count(),

            "reviewed_applications": applications.filter(
                status="Reviewed",
            ).count(),

            "shortlisted_applications": applications.filter(
                status="Shortlisted",
            ).count(),

            "rejected_applications": applications.filter(
                status="Rejected",
            ).count(),
        }

        return Response(data)
    
from rest_framework import generics

from applications.models import Application
from applications.serializers import ApplicationSerializer

class RecentApplicationsAPIView(generics.ListAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return (
            Application.objects.filter(
                job__company__owner=self.request.user,
            )
            .order_by("-applied_at")[:10]
        )
    
from rest_framework import generics
from applications.models import Application
from applications.serializers import ApplicationSerializer

class RecentApplicationsAPIView(generics.ListAPIView):

    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return (
            Application.objects.filter(
                job__company__owner=self.request.user
            )
            .select_related(
                "applicant",
                "job",
                "job__company",
            )
            .order_by("-applied_at")
        )
    
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from jobs.models import Job


class JobStatisticsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        jobs = (
            Job.objects.filter(
                company__owner=request.user
            )
            .annotate(
                application_count=Count("applications")
            )
            .values(
                "id",
                "title",
                "application_count",
            )
            .order_by("-application_count")
        )

        data = [
            {
                "job_id": job["id"],
                "job_title": job["title"],
                "applications": job["application_count"],
            }
            for job in jobs
        ]

        return Response(data)