from django.contrib import admin

from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):

    list_display = (
        "company_name",
        "industry",
        "location",
        "is_verified",
    )

    search_fields = (
        "company_name",
        "industry",
        "location",
    )