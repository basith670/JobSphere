from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "username",
        "email",
        "role",
        "location",
        "preferred_role",
        "profile_completion",
        "ai_resume_score",
        "is_staff",
        "is_active",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
        "phone",
        "location",
        "preferred_role",
    )

    fieldsets = UserAdmin.fieldsets + (

        (
            "Basic Information",
            {
                "fields": (
                    "role",
                    "phone",
                    "profile_image",
                    "bio",
                ),
            },
        ),

        (
            "Professional Profile",
            {
                "fields": (
                    "headline",
                    "location",
                    "education",
                    "skills",
                    "experience",
                    "portfolio",
                    "linkedin",
                    "github",
                    "preferred_role",
                    "preferred_location",
                    "expected_salary",
                    "years_of_experience",
                    "profile_completion",
                    "ai_resume_score",
                ),
            },
        ),

        (
            "Timeline",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "profile_completion",
        "ai_resume_score",
    )