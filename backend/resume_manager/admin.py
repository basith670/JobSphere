from django.contrib import admin
from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "full_name",
        "user",
        "is_default",
        "created_at",
    )

    search_fields = (
        "title",
        "full_name",
        "email",
    )

    list_filter = (
        "is_default",
        "created_at",
    )