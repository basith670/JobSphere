from django.db import models

from companies.models import Company
from accounts.models import User


class Job(models.Model):

    JOB_TYPE_CHOICES = (
        ("Full Time", "Full Time"),
        ("Part Time", "Part Time"),
        ("Internship", "Internship"),
        ("Contract", "Contract"),
        ("Remote", "Remote"),
    )

    EXPERIENCE_CHOICES = (
        ("0-1 Years", "0-1 Years"),
        ("1-2 Years", "1-2 Years"),
        ("3-5 Years", "3-5 Years"),
        ("5+ Years", "5+ Years"),
    )

    recruiter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posted_jobs",
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs",
    )

    title = models.CharField(
        max_length=200,
    )

    location = models.CharField(
        max_length=150,
    )

    job_type = models.CharField(
        max_length=30,
        choices=JOB_TYPE_CHOICES,
    )

    experience = models.CharField(
        max_length=30,
        choices=EXPERIENCE_CHOICES,
    )

    salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    description = models.TextField()

    requirements = models.TextField()

    responsibilities = models.TextField(
        blank=True,
    )

    benefits = models.TextField(
        blank=True,
    )

    skills_required = models.TextField()

    vacancies = models.PositiveIntegerField(
        default=1,
    )

    views = models.PositiveIntegerField(
        default=0,
    )

    is_featured = models.BooleanField(
        default=False,
    )

    deadline = models.DateField()

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title


class SavedJob(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="saved_jobs",
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="saved_by",
    )

    saved_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        unique_together = ("user", "job")

    def __str__(self):
        return f"{self.user.username} saved {self.job.title}"