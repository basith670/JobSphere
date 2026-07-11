from rest_framework import serializers

from .models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:

        model = Company

        fields = (
            "id",
            "company_name",
            "logo",
            "location",
            "industry",
            "company_size",
            "website",
            "is_verified",
        )