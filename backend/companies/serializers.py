from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:

        model = Company

        fields = (
            "id",
            "owner",
            "company_name",
            "logo",
            "website",
            "email",
            "phone",
            "location",
            "industry",
            "company_size",
            "founded_year",
            "description",
            "linkedin",
            "twitter",
            "facebook",
            "is_verified",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "owner",
            "is_verified",
            "created_at",
            "updated_at",
        )