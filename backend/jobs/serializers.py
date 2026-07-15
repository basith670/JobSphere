from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(
    source="company.company_name",
    read_only=True,
    )

    company_logo = serializers.ImageField(
        source="company.logo",
        read_only=True,
    )

    class Meta:
        model = Job

        fields = [
            "id",

            "title",

            "company",

            "company_name",

            "company_logo",

            "location",

            "job_type",

            "experience",

            "salary_min",

            "salary_max",

            "description",

            "requirements",

            "responsibilities",

            "benefits",

            "skills_required",

            "vacancies",

            "views",

            "deadline",

            "is_featured",

            "created_at",
        ]