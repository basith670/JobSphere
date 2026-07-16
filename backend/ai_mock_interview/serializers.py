from rest_framework import serializers


class MockInterviewSerializer(serializers.Serializer):

    questions = serializers.ListField(
        child=serializers.CharField()
    )

    answers = serializers.ListField(
        child=serializers.CharField()
    )