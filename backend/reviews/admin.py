from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):

    list_display = (
        "company",
        "user",
        "rating",
        "created_at",
    )

    list_filter = (
        "rating",
        "company",
    )

    search_fields = (
        "company__company_name",
        "user__username",
    )