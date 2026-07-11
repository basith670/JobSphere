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

from rest_framework import serializers
from .models import SavedJob, Job
from .serializers import JobSerializer


class SavedJobSerializer(serializers.ModelSerializer):

    # Read (GET)
    job = JobSerializer(read_only=True)

    # Write (POST)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(),
        source="job",
        write_only=True,
    )

    class Meta:
        model = SavedJob
        fields = (
            "id",
            "job",
            "job_id",
            "saved_at",
        )

        read_only_fields = (
            "id",
            "saved_at",
        )

    def create(self, validated_data):
        return SavedJob.objects.create(
            user=self.context["request"].user,
            **validated_data,
        )

    def validate(self, attrs):

        user = self.context["request"].user
        job = attrs["job"]

        if SavedJob.objects.filter(
            user=user,
            job=job,
        ).exists():
            raise serializers.ValidationError(
                "Job already saved."
            )

        return attrs