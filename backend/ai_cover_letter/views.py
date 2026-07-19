from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from resume_manager.models import Resume

from ai_resume.services.pdf_parser import extract_resume_text
from ai_resume.services.skill_extractor import extract_skills

from .services.generator import generate_cover_letter
from .serializers import CoverLetterRequestSerializer


class CoverLetterAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CoverLetterRequestSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        resume = Resume.objects.get(
            id=serializer.validated_data["resume_id"],
            user=request.user,
        )

        resume_text = extract_resume_text(
            resume.resume_file
        )

        skills = extract_skills(
            resume_text
        )

        cover_letter = generate_cover_letter(
            full_name=resume.full_name,
            job_description=serializer.validated_data[
                "job_description"
            ],
            skills=skills,
        )

        return Response(
            {
                "cover_letter": cover_letter,
            }
        )