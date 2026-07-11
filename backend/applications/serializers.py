from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = "__all__"

        read_only_fields = (
            "id",
            "applicant",
            "applied_at",
            "updated_at",
        )

    def validate(self, attrs):

        request = self.context["request"]

        applicant = request.user
        job = attrs["job"]

        if Application.objects.filter(
            applicant=applicant,
            job=job,
        ).exists():

            raise serializers.ValidationError(
                "You have already applied for this job."
            )

        return attrs