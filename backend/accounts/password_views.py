from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import (
    urlsafe_base64_encode,
)

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User
from .password_serializers import (
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)

from email_service.utils import send_jobsphere_email


class ForgotPasswordAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ForgotPasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        email = serializer.validated_data["email"]

        try:

            user = User.objects.get(
                email=email,
            )

        except User.DoesNotExist:

            return Response(
                {
                    "message": "If the email exists, a reset link has been sent."
                }
            )

        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        token = PasswordResetTokenGenerator().make_token(
            user
        )

        reset_link = (
            f"http://127.0.0.1:8000/reset-password/"
            f"{uid}/{token}/"
        )

        send_jobsphere_email(

            subject="JobSphere Password Reset",

            message=(
                f"Hello {user.username},\n\n"
                f"Use the following link to reset your password:\n\n"
                f"{reset_link}"
            ),

            recipient=user.email,

        )

        return Response(
            {
                "message": "Password reset email sent."
            }
        )


class ResetPasswordAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ResetPasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = serializer.validated_data["user"]

        user.set_password(
            serializer.validated_data["password"]
        )

        user.save()

        return Response(
            {
                "message": "Password reset successful."
            }
        )