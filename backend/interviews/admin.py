from django.contrib import admin

from .models import Interview


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "application",
        "interviewer_name",
        "interview_date",
        "interview_time",
        "status",
    )

    list_filter = (
        "status",
        "interview_type",
    )

    search_fields = (
        "application__applicant__username",
    )