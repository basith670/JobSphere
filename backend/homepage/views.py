from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView

from jobs.models import Job
from companies.models import Company
from accounts.models import User
from applications.models import Application


class HomepageAPIView(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request):

        featured_jobs = (
            Job.objects.filter(
                is_active=True,
                is_featured=True,
            )
            .select_related("company")
            .order_by("-created_at")[:6]
        )

        latest_jobs = (
            Job.objects.filter(
                is_active=True,
            )
            .select_related("company")
            .order_by("-created_at")[:8]
        )

        top_companies = (
            Company.objects.annotate(
                total_jobs=Count("jobs")
            )
            .order_by("-total_jobs")[:6]
        )

        statistics = {
            "jobs": Job.objects.filter(
                is_active=True,
            ).count(),

            "companies": Company.objects.count(),

            "candidates": User.objects.filter(
                role="Applicant",
            ).count(),

            "recruiters": User.objects.filter(
                role="Recruiter",
            ).count(),

            "applications": Application.objects.count(),
        }

        data = {
            "featured_jobs": [
                {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company.company_name,
                    "location": job.location,
                    "salary_min": job.salary_min,
                    "salary_max": job.salary_max,
                    "job_type": job.job_type,
                }
                for job in featured_jobs
            ],

            "latest_jobs": [
                {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company.company_name,
                    "location": job.location,
                    "salary_min": job.salary_min,
                    "salary_max": job.salary_max,
                    "job_type": job.job_type,
                }
                for job in latest_jobs
            ],

            "top_companies": [
                {
                    "id": company.id,
                    "company_name": company.company_name,
                    "location": company.location,
                    "industry": company.industry,
                    "total_jobs": company.total_jobs,
                }
                for company in top_companies
            ],

            "statistics": statistics,
        }

        return Response(data)