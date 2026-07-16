from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import MockInterviewSerializer
from .services.evaluator import evaluate_interview


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

        return Response(result)