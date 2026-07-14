from rest_framework import serializers


class InterviewRequestSerializer(serializers.Serializer):

    resume_id = serializers.IntegerField()

    job_description = serializers.CharField(
        required=False,
        allow_blank=True,
    )