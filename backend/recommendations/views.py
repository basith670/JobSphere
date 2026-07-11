from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job
from resume_manager.models import Resume

from .serializers import RecommendedJobSerializer


class JobRecommendationAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        resume = Resume.objects.filter(
            user=request.user,
            is_default=True,
        ).first()

        if not resume:

            return Response(
                {
                    "message": "Please upload and set a default resume."
                },
                status=400,
            )

        resume_text = " ".join([
            resume.summary or "",
            resume.skills or "",
            resume.experience or "",
            resume.projects or "",
        ]).lower()

        recommendations = []

        jobs = Job.objects.filter(
            is_active=True,
        )

        for job in jobs:

            score = 0

            fields = [
                job.title,
                job.description,
                job.skills_required,
                job.requirements,
            ]

            job_text = " ".join(fields).lower()

            keywords = [
                "python",
                "django",
                "react",
                "postgresql",
                "docker",
                "aws",
                "git",
                "rest",
            ]

            for keyword in keywords:

                if keyword in resume_text and keyword in job_text:
                    score += 12

            if resume.location.lower() in job.location.lower():
                score += 15

            if score > 100:
                score = 100

            recommendations.append(
                {
                    "job": job,
                    "match_score": score,
                }
            )

        recommendations.sort(
            key=lambda x: x["match_score"],
            reverse=True,
        )

        serializer = RecommendedJobSerializer(
            recommendations,
            many=True,
        )

        return Response(serializer.data)