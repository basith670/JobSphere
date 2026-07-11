from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from companies.models import Company
from jobs.models import Job
from applications.models import Application


class RecruiterDashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "recruiter":
            return Response(
                {"detail": "Only recruiters can access this dashboard."},
                status=403,
            )

        companies = Company.objects.filter(owner=request.user).count()

        jobs = Job.objects.filter(
            company__owner=request.user,
        ).count()

        applications = Application.objects.filter(
            job__company__owner=request.user,
        ).count()

        return Response(
            {
                "companies": companies,
                "jobs": jobs,
                "applications": applications,
            }
        )