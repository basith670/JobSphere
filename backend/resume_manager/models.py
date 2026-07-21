from django.db import models
from accounts.models import User


class Resume(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="resumes",
    )

    title = models.CharField(
        max_length=100,
    )

    full_name = models.CharField(
        max_length=100,
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20,
    )

    location = models.CharField(
        max_length=100,
    )

    summary = models.TextField(
        blank=True,
        default="",
    )

    skills = models.TextField(
        blank=True,
        default="",
    )

    experience = models.TextField(
        blank=True,
        default="",
    )

    education = models.TextField(
        blank=True,
        default="",
    )

    projects = models.TextField(
        blank=True,
        default="",
    )

    certifications = models.TextField(
        blank=True,
        default="",
    )

    linkedin = models.URLField(
        blank=True,
    )

    github = models.URLField(
        blank=True,
    )

    portfolio = models.URLField(
        blank=True,
    )

    resume_file = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True,
    )

    is_default = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.full_name} - {self.title}"