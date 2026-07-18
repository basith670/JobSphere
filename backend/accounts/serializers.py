from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


# =====================================================
# User Serializer
# =====================================================

class UserSerializer(serializers.ModelSerializer):

    profile_completion = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = (
            "id",
            "username",
            "email",

            "first_name",
            "last_name",

            "phone",

            "profile_image",
            "profile_image_url",

            "bio",

            "headline",

            "location",

            "education",

            "skills",

            "experience",

            "preferred_role",

            "preferred_location",

            "expected_salary",

            "years_of_experience",

            "linkedin",

            "github",

            "portfolio",

            "email_new_applicant",
            "email_job_expiry",
            "email_weekly_report",
            "email_marketing",

            "profile_completion",

            "ai_resume_score",
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

    def get_profile_image_url(self, obj):

        request = self.context.get("request")

        if obj.profile_image:

            if request:
                return request.build_absolute_uri(
                    obj.profile_image.url
                )

            return obj.profile_image.url

        return None

    def get_profile_completion(self, obj):

        fields = [
            obj.first_name,
            obj.last_name,
            obj.phone,
            obj.profile_image,
            obj.bio,
            obj.headline,
            obj.location,
            obj.education,
            obj.skills,
            obj.experience,
            obj.preferred_role,
            obj.preferred_location,
            obj.expected_salary,
            obj.years_of_experience,
            obj.linkedin,
            obj.github,
            obj.portfolio,
        ]

        completed = sum(bool(field) for field in fields)

        return round((completed / len(fields)) * 100)


# =====================================================
# Profile Serializer
# =====================================================

class ProfileSerializer(serializers.ModelSerializer):

    profile_completion = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = (
            "id",
            "username",
            "email",

            "first_name",
            "last_name",

            "phone",

            "profile_image",
            "profile_image_url",

            "bio",

            "headline",

            "location",

            "education",

            "skills",

            "experience",

            "preferred_role",

            "preferred_location",

            "expected_salary",

            "years_of_experience",

            "linkedin",

            "github",

            "portfolio",

            "profile_completion",

            "ai_resume_score",
        )

        read_only_fields = (
            "id",
            "username",
            "email",
            "profile_completion",
            "ai_resume_score",
        )

    def get_profile_image_url(self, obj):

        request = self.context.get("request")

        if obj.profile_image:

            if request:
                return request.build_absolute_uri(
                    obj.profile_image.url
                )

            return obj.profile_image.url

        return None

    def get_profile_completion(self, obj):

        fields = [
            obj.first_name,
            obj.last_name,
            obj.phone,
            obj.profile_image,
            obj.bio,
            obj.headline,
            obj.location,
            obj.education,
            obj.skills,
            obj.experience,
            obj.preferred_role,
            obj.preferred_location,
            obj.expected_salary,
            obj.years_of_experience,
            obj.linkedin,
            obj.github,
            obj.portfolio,
        ]

        completed = sum(bool(field) for field in fields)

        return round((completed / len(fields)) * 100)


# =====================================================
# Register
# =====================================================

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


# =====================================================
# Login
# =====================================================

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()

    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        user = authenticate(
            username=attrs.get("username"),
            password=attrs.get("password"),
        )

        if user is None:

            raise serializers.ValidationError(
                "Invalid username or password."
            )

        attrs["user"] = user

        return attrs


# =====================================================
# Change Password
# =====================================================

class ChangePasswordSerializer(serializers.Serializer):

    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
    )

    def validate(self, attrs):

        user = self.context["request"].user

        if not user.check_password(attrs["current_password"]):

            raise serializers.ValidationError(
                {
                    "current_password":
                        "Current password is incorrect."
                }
            )

        return attrs