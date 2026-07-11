from django.db import models
from django.conf import settings

from companies.models import Company


class Review(models.Model):

    RATING_CHOICES = [
        (1, "1 Star"),
        (2, "2 Stars"),
        (3, "3 Stars"),
        (4, "4 Stars"),
        (5, "5 Stars"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    rating = models.IntegerField(
        choices=RATING_CHOICES,
    )

    title = models.CharField(
        max_length=200,
    )

    review = models.TextField()

    pros = models.TextField(
        blank=True,
    )

    cons = models.TextField(
        blank=True,
    )

    is_anonymous = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:

        ordering = ["-created_at"]

        unique_together = (
            "user",
            "company",
        )

    def __str__(self):

        return f"{self.company.company_name} - {self.rating}★"