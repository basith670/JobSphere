from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ProfileSerializer


class ProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get(self, request):

        serializer = ProfileSerializer(
            request.user,
            context={"request": request},
        )

        return Response(serializer.data)

    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )