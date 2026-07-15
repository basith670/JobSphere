"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

def health(request):
    return JsonResponse(
        {
            "status": "ok",
            "application": "JobSphere API",
            "version": "1.0.0",
        }
    )

urlpatterns = [

    path("", health),
    path("admin/", admin.site.urls),

    path("api/accounts/", include("accounts.urls")),
    path("api/companies/", include("companies.urls")),
    path("api/jobs/", include("jobs.urls")),
    path("api/applications/", include("applications.urls")),
    path("api/core/", include("core.urls")),
    path("api/resumes/", include("resume_manager.urls")),
    path("api/analytics/", include("analytics.urls")),
    path("api/notifications/", include("notifications.urls")),
    path("api/ai-resume/",include("ai_resume.urls"),),
    path("api/recommendations/",include("recommendations.urls"),),
    path("api/interviews/",include("interviews.urls"),),
    path("api/email/",include("email_service.urls"),),
    path("api/reviews/",include("reviews.urls"),),

    path("api/schema/",SpectacularAPIView.as_view(),name="schema",),
    path("api/docs/",SpectacularSwaggerView.as_view(url_name="schema"),name="swagger-ui",),
    path("api/redoc/",SpectacularRedocView.as_view(url_name="schema"),name="redoc",),

    path("api/candidate-dashboard/",include("candidate_dashboard.urls"),),
    path("api/home/", include("homepage.urls")),
    path("api/admin-dashboard/", include("admin_dashboard.urls")),
    path("api/cover-letter/",include("ai_cover_letter.urls"),),

    path("api/interview/",include("ai_interview.urls"),),
    path("api/mock-interview/",include("mock_interview.urls"),),
    path("api/dashboard/",include("accounts.dashboard_urls"),),
    path("api/profile/",include("accounts.profile_urls"),),
]
