from django.contrib import admin
from .models import ResumeAnalysis


@admin.register(ResumeAnalysis)
class ResumeAnalysisAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "resume",
        "ats_score",
        "analyzed_at",
    )

    list_filter = (
        "ats_score",
    )

    search_fields = (
        "user__username",
    )