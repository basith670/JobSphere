from django.db import models
from accounts.models import User


class Company(models.Model):

    owner = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name="company",
    )

    company_name = models.CharField(max_length=200)

    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True,
    )

    website = models.URLField(blank=True)

    email = models.EmailField(blank=True)

    phone = models.CharField(
        max_length=20,
        blank=True,
    )

    location = models.CharField(max_length=150)

    industry = models.CharField(max_length=100)

    company_size = models.CharField(max_length=50)

    founded_year = models.PositiveIntegerField(
        blank=True,
        null=True,
    )

    description = models.TextField()

    linkedin = models.URLField(blank=True)

    twitter = models.URLField(blank=True)

    facebook = models.URLField(blank=True)

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name