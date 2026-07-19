from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from resume_manager.models import Resume

from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer

from .services.pdf_parser import extract_resume_text
from .services.skill_extractor import extract_skills
from .services.ats_calculator import calculate_ats_score
from .services.suggestion_engine import generate_suggestions
from .services.jd_matcher import match_resume_with_jd


class ResumeAnalysisAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, resume_id):

        resume = Resume.objects.get(
            id=resume_id,
            user=request.user,
        )

        text = extract_resume_text(
            resume.resume_file
        )

        skills = extract_skills(text)

        required_skills = [
            "Python",
            "Django",
            "Django REST Framework",
            "React",
            "JavaScript",
            "PostgreSQL",
            "Git",
            "Docker",
            "AWS",
        ]

        ats_score, found, missing = calculate_ats_score(
            skills,
            required_skills,
        )

        suggestions = generate_suggestions(
            ats_score,
            missing,
            text,
        )

        analysis = ResumeAnalysis.objects.create(
            user=request.user,
            resume=resume,
            ats_score=ats_score,
            skills_found=found,
            missing_skills=missing,
            suggestions=suggestions,
        )
    # Update user's dashboard resume score
        request.user.ai_resume_score = ats_score
        request.user.save(update_fields=["ai_resume_score"])

        serializer = ResumeAnalysisSerializer(
            analysis
        )

        return Response(serializer.data)


class ResumeAnalysisHistoryAPIView(
    generics.ListAPIView
):

    serializer_class = ResumeAnalysisSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return ResumeAnalysis.objects.filter(
            user=self.request.user,
        ).order_by(
            "-analyzed_at",
        )


class ResumeJobMatchAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, resume_id):

        job_description = request.data.get(
            "job_description",
            "",
        )

        resume = Resume.objects.get(
            id=resume_id,
            user=request.user,
        )

        resume_text = extract_resume_text(
            resume.resume_file
        )

        result = match_resume_with_jd(
            resume_text,
            job_description,
        )

        return Response(result)