from django.contrib import admin

from .models import Job, SavedJob


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "company",
        "job_type",
        "location",
        "is_active",
    )

    list_filter = (
        "job_type",
        "is_active",
    )

    search_fields = (
        "title",
        "location",
    )


admin.site.register(SavedJob)