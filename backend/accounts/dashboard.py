from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from companies.models import Company
from jobs.models import Job
from applications.models import Application


class RecruiterDashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "recruiter":

            return Response(

                {
                    "detail": "Only recruiters can access this dashboard."
                },

                status=403,

            )

        company = Company.objects.filter(
            owner=request.user
        ).first()

        jobs = Job.objects.filter(
            company__owner=request.user
        )

        applications = Application.objects.filter(
            job__company__owner=request.user
        )

        hour = datetime.now().hour

        if hour < 12:

            greeting = "Good Morning"

        elif hour < 17:

            greeting = "Good Afternoon"

        else:

            greeting = "Good Evening"

        active_jobs = jobs.filter(
            is_active=True
        ).count()

        total_jobs = jobs.count()

        total_applications = applications.count()

        pending = applications.filter(
            status="Pending"
        ).count()

        reviewed = applications.filter(
            status="Reviewed"
        ).count()

        shortlisted = applications.filter(
            status="Shortlisted"
        ).count()

        rejected = applications.filter(
            status="Rejected"
        ).count()

        return Response(

            {

                "greeting": greeting,

                "recruiter_name":
                    request.user.first_name
                    or request.user.username,

                "company_name":
                    company.company_name if company else "",

                "stats": {

                    "companies": Company.objects.filter(
                        owner=request.user
                    ).count(),

                    "active_jobs": active_jobs,

                    "total_jobs": total_jobs,

                    "applications": total_applications,

                    "reviewed": reviewed,

                    "shortlisted": shortlisted,

                    "rejected": rejected,

                },

                "pipeline": {

                    "pending": pending,

                    "reviewed": reviewed,

                    "shortlisted": shortlisted,

                    "rejected": rejected,

                },

            }

        )