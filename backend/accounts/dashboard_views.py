from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from resume_manager.models import Resume
from applications.models import Application
from jobs.models import SavedJob
from interviews.models import Interview
from ai_resume.models import ResumeAnalysis

from .utils import calculate_profile_completion
from ai_mock_interview.models import MockInterviewResult


class CandidateDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Resume Data
        resumes = Resume.objects.filter(user=user).order_by("-created_at")
        latest_resume = resumes.first()

        # Live Dashboard Statistics
        application_count = Application.objects.filter(
            applicant=user
        ).count()

        saved_job_count = SavedJob.objects.filter(
            user=user
        ).count()

        latest_interview = (
            MockInterviewResult.objects.filter(user=user)
            .order_by("-created_at")
            .first()
        )

        interview_score = (
            latest_interview.overall_score
            if latest_interview
            else 0
        )

        # Latest Resume Analysis
        latest_analysis = (
            ResumeAnalysis.objects.filter(user=user)
            .order_by("-analyzed_at")
            .first()
        )

        resume_score = (
            latest_analysis.ats_score
            if latest_analysis
            else 0
        )

        return Response(
            {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "profile_completion": calculate_profile_completion(user),
                },
                "stats": {
                    "resume_score": resume_score,
                    "resume_count": resumes.count(),
                    "applications": application_count,
                    "saved_jobs": saved_job_count,
                    "interview_score": interview_score,
                },
                "latest_resume": (
                    {
                        "id": latest_resume.id,
                        "title": latest_resume.title,
                        "created_at": latest_resume.created_at,
                    }
                    if latest_resume
                    else None
                ),
            }
        )