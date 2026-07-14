from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    profile_completion = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = (
            "id",
            "username",
            "email",
            "role",
            "phone",
            "profile_image",
            "bio",
            "linkedin",
            "github",
            "portfolio",
            "location",
            "preferred_role",
            "preferred_location",
            "expected_salary",
            "years_of_experience",
            "skills",
            "education",
            "profile_completion",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "username",
            "email",
            "role",
            "created_at",
            "updated_at",
            "profile_completion",
        )

    def get_profile_completion(self, obj):

        fields = [
            obj.phone,
            obj.bio,
            obj.profile_image,
            obj.linkedin,
            obj.github,
            obj.portfolio,
            obj.location,
            obj.preferred_role,
            obj.preferred_location,
            obj.expected_salary,
            obj.years_of_experience,
            obj.skills,
            obj.education,
        ]

        completed = sum(bool(field) for field in fields)

        return round((completed / len(fields)) * 100)


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


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()

    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(
            username=username,
            password=password,
        )

        if user is None:

            raise serializers.ValidationError(
                "Invalid username or password."
            )

        attrs["user"] = user

        return attrs