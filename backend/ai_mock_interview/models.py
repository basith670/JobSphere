from django.db import models
from accounts.models import User


class MockInterviewResult(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="mock_interviews",
    )

    overall_score = models.PositiveIntegerField()

    communication_score = models.PositiveIntegerField(default=0)

    technical_score = models.PositiveIntegerField(default=0)

    confidence_score = models.PositiveIntegerField(default=0)

    feedback = models.JSONField(
        default=list,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.overall_score}%"