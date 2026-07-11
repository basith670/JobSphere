from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.password_validation import validate_password
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from rest_framework import serializers

from .models import User


class ForgotPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):

    uid = serializers.CharField()

    token = serializers.CharField()

    password = serializers.CharField(
        validators=[validate_password],
    )

    confirm_password = serializers.CharField()

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError(
                "Passwords do not match."
            )

        try:

            uid = force_str(
                urlsafe_base64_decode(
                    attrs["uid"]
                )
            )

            user = User.objects.get(
                pk=uid
            )

        except Exception:

            raise serializers.ValidationError(
                "Invalid user."
            )

        if not PasswordResetTokenGenerator().check_token(
            user,
            attrs["token"],
        ):

            raise serializers.ValidationError(
                "Invalid or expired token."
            )

        attrs["user"] = user

        return attrs