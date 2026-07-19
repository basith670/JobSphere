from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from resume_manager.models import Resume

from ai_resume.services.pdf_parser import extract_resume_text
from ai_resume.services.skill_extractor import extract_skills

from .serializers import InterviewRequestSerializer
from .services.question_generator import generate_questions


class InterviewQuestionAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = InterviewRequestSerializer(
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

        questions = generate_questions(
            skills
        )

        return Response(questions)