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

        if self.instance:
            return attrs

        applicant = self.context["request"].user
        job = attrs.get("job")

        if Application.objects.filter(
            applicant=applicant,
            job=job,
        ).exists():

            raise serializers.ValidationError(
                "You have already applied for this job."
            )

        return attrs