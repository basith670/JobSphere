from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    class Meta:

        model = Review

        fields = (
            "id",
            "username",
            "company",
            "rating",
            "title",
            "review",
            "pros",
            "cons",
            "is_anonymous",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
            "username",
        )

    def get_username(self, obj):

        if obj.is_anonymous:
            return "Anonymous"

        return obj.user.username

    def validate(self, attrs):

        request = self.context["request"]

        if self.instance:
            return attrs

        company = attrs["company"]

        if Review.objects.filter(
            user=request.user,
            company=company,
        ).exists():

            raise serializers.ValidationError(
                "You have already reviewed this company."
            )

        return attrs

    def create(self, validated_data):

        return Review.objects.create(
            user=self.context["request"].user,
            **validated_data,
        )