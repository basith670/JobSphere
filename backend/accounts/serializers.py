from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        exclude = (
            "password",
            "groups",
            "user_permissions",
        )

from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
    )

    password2 = serializers.CharField(
        write_only=True,
    )

    class Meta:

        model = User

        fields = (
            "username",
            "email",
            "password",
            "password2",
            "role",
            "phone",
        )

    def validate(self, attrs):

        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {
                    "password": "Passwords do not match."
                }
            )

        return attrs

    def create(self, validated_data):

        validated_data.pop("password2")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
            phone=validated_data.get("phone"),
        )

        return user