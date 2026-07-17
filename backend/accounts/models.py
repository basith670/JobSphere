from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("jobseeker", "Job Seeker"),
        ("recruiter", "Recruiter"),
        ("admin", "Admin"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="jobseeker",
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    bio = models.TextField(
        blank=True,
        null=True,
    )

    linkedin = models.URLField(
        blank=True,
        null=True,
    )

    github = models.URLField(
        blank=True,
        null=True,
    )

    # ---------- EMAIL NOTIFICATIONS ----------

    email_new_applicant = models.BooleanField(
        default=True,
    )

    email_job_expiry = models.BooleanField(
        default=True,
    )

    email_weekly_report = models.BooleanField(
        default=True,
    )

    email_marketing = models.BooleanField(
        default=False,
    )

    # ---------- NEW PROFESSIONAL FIELDS ----------

    headline = models.CharField(
        max_length=120,
        blank=True,
        null=True,
    )

    location = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    education = models.CharField(
        max_length=200,
        blank=True,
        null=True,
    )

    skills = models.TextField(
        blank=True,
        null=True,
        help_text="Comma separated skills",
    )

    experience = models.TextField(
        blank=True,
        null=True,
    )

    portfolio = models.URLField(
        blank=True,
        null=True,
    )

    preferred_role = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    preferred_location = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    expected_salary = models.PositiveIntegerField(
        blank=True,
        null=True,
    )

    years_of_experience = models.PositiveIntegerField(
        default=0,
    )

    profile_completion = models.PositiveIntegerField(
        default=0,
    )

    ai_resume_score = models.PositiveIntegerField(
        default=0,
    )

    # ---------- TIMESTAMPS ----------

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.username