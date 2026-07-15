from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from resume_manager.models import Resume

from .utils import calculate_profile_completion


class CandidateDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        resumes = Resume.objects.filter(user=user).order_by("-created_at")

        latest_resume = resumes.first()

        return Response(
            {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "profile_completion": calculate_profile_completion(user),
                },

                "stats": {
                    "resume_score": user.ai_resume_score,
                    "resume_count": resumes.count(),
                    "applications": 0,
                    "saved_jobs": 0,
                    "interview_score": 0,
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