from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.models import Job
from applications.models import Application
from resume_manager.models import Resume
from companies.models import Company


class GlobalSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get("q", "").strip()

        if not query:
            return Response({
                "jobs": [],
                "applications": [],
                "resumes": [],
                "applicants": [],
                "companies": [],
            })

        # ======================================================
        # Candidate Search
        # ======================================================

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

        # ======================================================
        # Recruiter Search
        # ======================================================

        recruiter_jobs = Job.objects.filter(
            company__user=request.user
        ).filter(
            Q(title__icontains=query) |
            Q(location__icontains=query) |
            Q(skills_required__icontains=query)
        )[:5]

        applicants = Application.objects.filter(
            job__company__user=request.user
        ).filter(
            Q(applicant__first_name__icontains=query) |
            Q(applicant__last_name__icontains=query) |
            Q(applicant__username__icontains=query) |
            Q(job__title__icontains=query) |
            Q(status__icontains=query)
        )[:5]

        companies = Company.objects.filter(
            user=request.user
        ).filter(
            Q(company_name__icontains=query) |
            Q(industry__icontains=query) |
            Q(location__icontains=query)
        )[:5]

        return Response({

            # =============================
            # Candidate
            # =============================

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
            ],

            # =============================
            # Recruiter
            # =============================

            "recruiter_jobs": [
                {
                    "id": job.id,
                    "title": job.title,
                    "location": job.location,
                    "status": job.status,
                }
                for job in recruiter_jobs
            ],

            "applicants": [
                {
                    "id": application.id,
                    "name": (
                        f"{application.applicant.first_name} "
                        f"{application.applicant.last_name}"
                    ).strip(),
                    "job": application.job.title,
                    "status": application.status,
                }
                for application in applicants
            ],

            "companies": [
                {
                    "id": company.id,
                    "name": company.company_name,
                    "industry": company.industry,
                }
                for company in companies
            ],

        })