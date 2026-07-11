from django.db import models
from accounts.models import User
from resume_manager.models import Resume


class ResumeAnalysis(models.Model):

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="analyses",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="resume_analyses",
    )

    ats_score = models.PositiveIntegerField(
        default=0,
    )

    skills_found = models.JSONField(
        default=list,
        blank=True,
    )

    missing_skills = models.JSONField(
        default=list,
        blank=True,
    )

    suggestions = models.JSONField(
        default=list,
        blank=True,
    )

    analyzed_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        ordering = [
            "-analyzed_at",
        ]

    def __str__(self):

        return f"{self.user.username} - ATS {self.ats_score}"