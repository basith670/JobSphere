from rest_framework import serializers

from .models import Interview


class InterviewSerializer(serializers.ModelSerializer):

    applicant = serializers.CharField(
        source="application.applicant.username",
        read_only=True,
    )

    job_title = serializers.CharField(
        source="application.job.title",
        read_only=True,
    )

    class Meta:

        model = Interview

        fields = (
            "id",
            "application",
            "applicant",
            "job_title",
            "recruiter",
            "interviewer_name",
            "interview_type",
            "interview_date",
            "interview_time",
            "meeting_link",
            "notes",
            "status",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "recruiter",
            "created_at",
            "updated_at",
        )