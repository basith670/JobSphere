from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    ProfileSerializer,
    ChangePasswordSerializer,
)
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job, SavedJob
from applications.models import Application


# =====================================================
# Register
# =====================================================

class RegisterAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "message": "User registered successfully."
            },
            status=status.HTTP_201_CREATED,
        )


# =====================================================
# Login
# =====================================================

class LoginAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )


# =====================================================
# Profile
# =====================================================

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

        print("\n========== REQUEST DATA ==========")
        print(request.data)
        print("==================================\n")

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        if not serializer.is_valid():

            print("\n========== SERIALIZER ERRORS ==========")
            print(serializer.errors)
            print("=======================================\n")

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        return Response(serializer.data)


# =====================================================
# Change Password
# =====================================================

class ChangePasswordAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(raise_exception=True)

        request.user.set_password(
            serializer.validated_data["new_password"]
        )

        request.user.save()

        return Response(
            {
                "message": "Password updated successfully."
            },
            status=status.HTTP_200_OK,
        )

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        data = {
            "available_jobs": Job.objects.filter(
                is_active=True
            ).count(),

            "saved_jobs": SavedJob.objects.filter(
                user=user
            ).count(),

            "applications": Application.objects.filter(
                applicant=user
            ).count(),

            "profile_strength": user.profile_completion,
        }

        return Response(data)