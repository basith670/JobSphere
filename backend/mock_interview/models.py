from django.db import models
from django.conf import settings


class InterviewSession(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    total_score = models.IntegerField(
        default=0,
    )

    total_questions = models.IntegerField(
        default=0,
    )

    def __str__(self):
        return f"Session {self.id} - {self.user.username}"


class MockInterview(models.Model):

    session = models.ForeignKey(
    InterviewSession,
    on_delete=models.CASCADE,
    related_name="answers",
    null=True,
    blank=True,
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    question = models.TextField()

    answer = models.TextField()

    score = models.IntegerField()

    feedback = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"Session {self.session.id} - "
            f"{self.score}/10"
        )