from rest_framework import serializers


class DashboardStatsSerializer(serializers.Serializer):
    available_jobs = serializers.IntegerField()
    saved_jobs = serializers.IntegerField()
    applications = serializers.IntegerField()
    profile_strength = serializers.IntegerField()