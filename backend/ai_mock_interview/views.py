from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import MockInterviewSerializer
from .services.evaluator import evaluate_interview
from .models import MockInterviewResult

class MockInterviewEvaluateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = MockInterviewSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        result = evaluate_interview(

            serializer.validated_data["questions"],

            serializer.validated_data["answers"],

        )

        MockInterviewResult.objects.create(
                user=request.user,
                overall_score=result.get("overall_score", 0),
                communication_score=result.get("communication_score", 0),
                technical_score=result.get("technical_score", 0),
                confidence_score=result.get("confidence_score", 0),
                feedback=result.get("feedback", []),
)

        return Response(result)