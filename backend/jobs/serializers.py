from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    application_count = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    company_name = serializers.CharField(
        source="company.company_name",
        read_only=True,
    )

    company_logo = serializers.ImageField(
        source="company.logo",
        read_only=True,
    )

    def get_application_count(self, obj):
        return obj.applications.count()

    def get_status(self, obj):
        return "Open" if obj.is_active else "Closed"

    class Meta:
        model = Job

        fields = [
            "id",
            "recruiter",
            "company",
            "company_name",
            "company_logo",
            "title",
            "location",
            "application_count",
            "status",
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
            "is_active",
            "created_at",
        ]

        extra_kwargs = {
            "recruiter": {
                "read_only": True,
            },
        }