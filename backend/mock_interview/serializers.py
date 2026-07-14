from rest_framework import serializers


class StartInterviewSerializer(serializers.Serializer):

    resume_id = serializers.IntegerField()


class SubmitAnswerSerializer(serializers.Serializer):

    session_id = serializers.IntegerField()

    question = serializers.CharField()

    answer = serializers.CharField()