from django.db import models

from accounts.models import User
from jobs.models import Job


class Application(models.Model):

    STATUS_CHOICES = (
    ("Pending", "Pending"),
    ("Reviewed", "Reviewed"),
    ("Shortlisted", "Shortlisted"),
    ("Rejected", "Rejected"),
    )

    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications",
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications",
    )

    resume = models.FileField(
        upload_to="resumes/",
    )

    cover_letter = models.TextField(
        blank=True,
    )

    recruiter_notes = models.TextField(
    blank=True,
    )

    interview_date = models.DateTimeField(
    blank=True,
    null=True,
    )



    status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default="Pending",
    )

    applied_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        unique_together = ("applicant", "job")

    def __str__(self):
        return f"{self.applicant.username} - {self.job.title}"