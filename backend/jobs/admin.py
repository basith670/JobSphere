from django.contrib import admin

from .models import Job, SavedJob


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "company",
        "recruiter",
        "location",
        "job_type",
        "experience",
        "salary_min",
        "salary_max",
        "vacancies",
        "is_featured",
        "is_active",
        "deadline",
    )

    search_fields = (
        "title",
        "company__name",
        "location",
        "skills_required",
    )

    list_filter = (
        "job_type",
        "experience",
        "is_featured",
        "is_active",
        "company",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "views",
        "created_at",
        "updated_at",
    )

    fieldsets = (

        ("Basic Information", {
            "fields": (
                "title",
                "company",
                "recruiter",
                "location",
            )
        }),

        ("Job Details", {
            "fields": (
                "job_type",
                "experience",
                "vacancies",
                "deadline",
            )
        }),

        ("Salary", {
            "fields": (
                "salary_min",
                "salary_max",
            )
        }),

        ("Description", {
            "fields": (
                "description",
                "requirements",
                "responsibilities",
                "benefits",
                "skills_required",
            )
        }),

        ("Status", {
            "fields": (
                "is_featured",
                "is_active",
                "views",
            )
        }),

        ("Timestamps", {
            "fields": (
                "created_at",
                "updated_at",
            )
        }),

    )


@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "job",
        "saved_at",
    )

    search_fields = (
        "user__username",
        "job__title",
    )

    ordering = (
        "-saved_at",
    )