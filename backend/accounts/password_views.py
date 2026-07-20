from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .password_serializers import (
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)

from email_service.utils import send_jobsphere_email


# =====================================================
# Forgot Password
# =====================================================

class ForgotPasswordAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        print("\n========== FORGOT PASSWORD ==========")

        serializer = ForgotPasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        email = serializer.validated_data["email"]

        print(f"Email received: {email}")

        try:

            user = User.objects.get(
                email=email,
            )

            print(f"User found: {user.username}")

        except User.DoesNotExist:

            print("User not found.")

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
            f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        )

        print(f"Reset Link: {reset_link}")

        try:

            send_jobsphere_email(
                subject="JobSphere Password Reset",
                message=(
                    f"Hello {user.username},\n\n"
                    f"You requested to reset your JobSphere password.\n\n"
                    f"Click the link below:\n\n"
                    f"{reset_link}\n\n"
                    f"If you didn't request this, you can safely ignore this email."
                ),
                recipient=user.email,
            )

            print("Email sent successfully.")

        except Exception as e:

            print("========== EMAIL ERROR ==========")
            print(type(e).__name__)
            print(str(e))
            print("=================================")

            raise

        return Response(
            {
                "message": "Password reset email sent."
            }
        )


# =====================================================
# Reset Password
# =====================================================

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