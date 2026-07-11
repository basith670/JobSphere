from rest_framework import serializers
from .models import ResumeAnalysis


class ResumeAnalysisSerializer(serializers.ModelSerializer):

    class Meta:

        model = ResumeAnalysis

        fields = "__all__"

        read_only_fields = (
            "id",
            "user",
            "resume",
            "ats_score",
            "skills_found",
            "missing_skills",
            "suggestions",
            "analyzed_at",
        )