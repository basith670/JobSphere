from rest_framework import serializers

from companies.serializers import CompanySerializer
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    company = CompanySerializer(read_only=True)

    class Meta:

        model = Job

        fields = (
            "id",
            "title",
            "company",
            "location",
            "job_type",
            "experience",
            "salary_min",
            "salary_max",
            "skills_required",
            "deadline",
            "is_featured",
            "is_active",
        )