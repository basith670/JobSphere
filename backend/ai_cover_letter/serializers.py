from rest_framework import serializers


class CoverLetterRequestSerializer(serializers.Serializer):

    resume_id = serializers.IntegerField()

    job_description = serializers.CharField()