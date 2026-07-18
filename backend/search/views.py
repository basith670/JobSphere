from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.models import Job
from applications.models import Application
from resume_manager.models import Resume


class GlobalSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get("q", "").strip()

        if not query:
            return Response({
                "jobs": [],
                "applications": [],
                "resumes": [],
            })

        jobs = Job.objects.filter(
            is_active=True
        ).filter(
            Q(title__icontains=query) |
            Q(company__company_name__icontains=query) |
            Q(location__icontains=query) |
            Q(skills_required__icontains=query)
        )[:5]

        applications = Application.objects.filter(
            applicant=request.user
        ).filter(
            Q(job__title__icontains=query) |
            Q(job__company__company_name__icontains=query) |
            Q(status__icontains=query)
        )[:5]

        resumes = Resume.objects.filter(
            user=request.user
        ).filter(
            Q(title__icontains=query) |
            Q(skills__icontains=query) |
            Q(summary__icontains=query)
        )[:5]

        return Response({

            "jobs": [
                {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company.company_name,
                    "location": job.location,
                }
                for job in jobs
            ],

            "applications": [
                {
                    "id": application.id,
                    "job": application.job.id,
                    "job_title": application.job.title,
                    "company": application.job.company.company_name,
                    "status": application.status,
                }
                for application in applications
            ],

            "resumes": [
                {
                    "id": resume.id,
                    "title": resume.title,
                }
                for resume in resumes
            ]

        })