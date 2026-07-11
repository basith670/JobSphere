from rest_framework import serializers

from companies.models import Company
from companies.serializers import CompanySerializer
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    company = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(),
        write_only=True,
    )

    company_details = CompanySerializer(
        source="company",
        read_only=True,
    )

    class Meta:

        model = Job

        fields = (
            "id",
            "title",
            "company",
            "company_details",
            "location",
            "job_type",
            "experience",
            "salary_min",
            "salary_max",
            "description",
            "requirements",
            "skills_required",
            "vacancies",
            "deadline",
            "is_featured",
            "is_active",
            "created_at",
            "updated_at",
        )