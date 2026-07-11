from django.db import models

from accounts.models import User
from applications.models import Application


class Interview(models.Model):

    INTERVIEW_TYPES = (
        ("Online", "Online"),
        ("Offline", "Offline"),
        ("Phone", "Phone"),
    )

    STATUS_CHOICES = (
        ("Scheduled", "Scheduled"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="interviews",
    )

    recruiter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="scheduled_interviews",
    )

    interviewer_name = models.CharField(
        max_length=150,
    )

    interview_type = models.CharField(
        max_length=20,
        choices=INTERVIEW_TYPES,
    )

    interview_date = models.DateField()

    interview_time = models.TimeField()

    meeting_link = models.URLField(
        blank=True,
    )

    notes = models.TextField(
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Scheduled",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:

        ordering = [
            "-interview_date",
            "-interview_time",
        ]

    def __str__(self):

        return (
            f"{self.application.applicant.username} - "
            f"{self.interview_date}"
        )