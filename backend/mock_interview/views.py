from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from resume_manager.models import Resume

from ai_resume.services.pdf_parser import extract_resume_text
from ai_resume.services.skill_extractor import extract_skills
from ai_interview.services.question_generator import generate_questions

from .models import InterviewSession, MockInterview
from .serializers import (
    StartInterviewSerializer,
    SubmitAnswerSerializer,
)
from .services.evaluator import evaluate_answer


class StartInterviewAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = StartInterviewSerializer(
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
            resume.resume_file.path
        )

        skills = extract_skills(
            resume_text
        )

        questions = generate_questions(
            skills
        )

        session = InterviewSession.objects.create(
            user=request.user,
            total_questions=len(
                questions["technical_questions"]
            ),
        )

        return Response({
            "session_id": session.id,
            "questions": questions,
        })


class SubmitAnswerAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = SubmitAnswerSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        session = InterviewSession.objects.get(
            id=serializer.validated_data["session_id"],
            user=request.user,
        )

        result = evaluate_answer(
            serializer.validated_data["answer"]
        )

        MockInterview.objects.create(
            session=session,
            user=request.user,
            question=serializer.validated_data["question"],
            answer=serializer.validated_data["answer"],
            score=result["score"],
            feedback=result["feedback"],
        )

        answers = session.answers.all()

        total = sum(
            answer.score
            for answer in answers
        )

        session.total_score = total
        session.save()

        return Response({
            "score": result["score"],
            "feedback": result["feedback"],
            "overall_score": session.total_score,
        })