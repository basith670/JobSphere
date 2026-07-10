from django.db import models
from accounts.models import User


class Company(models.Model):

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="companies",
    )

    company_name = models.CharField(max_length=200)

    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True,
    )

    website = models.URLField(blank=True)

    email = models.EmailField(
    blank=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    location = models.CharField(max_length=150)

    industry = models.CharField(max_length=100)

    company_size = models.CharField(max_length=50)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name