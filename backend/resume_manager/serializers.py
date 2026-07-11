from rest_framework import serializers

from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = "__all__"

        read_only_fields = (
            "id",
            "user",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):

        request = self.context["request"]

        if attrs.get("is_default", False):

            Resume.objects.filter(
                user=request.user,
                is_default=True,
            ).update(
                is_default=False,
            )

        return attrs