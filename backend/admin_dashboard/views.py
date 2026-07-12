from django.db.models import Count
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from applications.models import Application
from interviews.models import Interview
from reviews.models import Review
from notifications.models import Notification


class AdminDashboardAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        data = {
            "users": {
                "total": User.objects.count(),
                "jobseekers": User.objects.filter(role="jobseeker").count(),
                "recruiters": User.objects.filter(role="recruiter").count(),
                "admins": User.objects.filter(role="admin").count(),
            },

            "companies": Company.objects.count(),

            "jobs": {
                "total": Job.objects.count(),
                "active": Job.objects.filter(is_active=True).count(),
                "inactive": Job.objects.filter(is_active=False).count(),
                "featured": Job.objects.filter(is_featured=True).count(),
            },

            "applications": {
                "total": Application.objects.count(),
                "pending": Application.objects.filter(status="Pending").count(),
                "reviewed": Application.objects.filter(status="Reviewed").count(),
                "shortlisted": Application.objects.filter(status="Shortlisted").count(),
                "rejected": Application.objects.filter(status="Rejected").count(),
            },

            "interviews": Interview.objects.count(),

            "reviews": Review.objects.count(),

            "notifications": Notification.objects.count(),
        }

        return Response(data)