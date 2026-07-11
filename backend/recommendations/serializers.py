from rest_framework import serializers
from jobs.serializers import JobSerializer


class RecommendedJobSerializer(serializers.Serializer):

    job = JobSerializer()

    match_score = serializers.IntegerField()