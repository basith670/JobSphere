from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from resume_manager.models import Resume
from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer


class ResumeAnalysisAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, resume_id):

        resume = Resume.objects.get(
            id=resume_id,
            user=request.user,
        )

        text = " ".join([
            resume.summary or "",
            resume.skills or "",
            resume.experience or "",
            resume.projects or "",
            resume.certifications or "",
        ]).lower()

        required_skills = [
            "python",
            "django",
            "rest",
            "postgresql",
            "git",
            "docker",
            "aws",
            "react",
        ]

        found = []
        missing = []

        for skill in required_skills:

            if skill in text:
                found.append(skill.title())
            else:
                missing.append(skill.title())

        ats_score = int(
            len(found) / len(required_skills) * 100
        )

        suggestions = []

        if "docker" not in text:
            suggestions.append(
                "Add Docker experience."
            )

        if "aws" not in text:
            suggestions.append(
                "Mention AWS or Cloud skills."
            )

        if len(resume.summary or "") < 100:
            suggestions.append(
                "Write a stronger professional summary."
            )

        if len(resume.projects or "") < 50:
            suggestions.append(
                "Describe projects with measurable achievements."
            )

        analysis = ResumeAnalysis.objects.create(
            user=request.user,
            resume=resume,
            ats_score=ats_score,
            skills_found=found,
            missing_skills=missing,
            suggestions=suggestions,
        )

        serializer = ResumeAnalysisSerializer(analysis)

        return Response(serializer.data)
    
from rest_framework import generics


class ResumeAnalysisHistoryAPIView(generics.ListAPIView):

    serializer_class = ResumeAnalysisSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return ResumeAnalysis.objects.filter(
            user=self.request.user,
        ).order_by(
            "-analyzed_at",
        )