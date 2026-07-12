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
            "is_verified",
            "location",
            "industry",
            "company_size",
            "description",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )