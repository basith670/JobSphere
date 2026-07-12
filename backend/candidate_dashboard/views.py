from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from applications.models import Application
from interviews.models import Interview
from notifications.models import Notification
from resume_manager.models import Resume
from jobs.models import SavedJob


class CandidateDashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        total_applications = Application.objects.filter(
            applicant=user,
        ).count()

        pending = Application.objects.filter(
            applicant=user,
            status="Pending",
        ).count()

        reviewed = Application.objects.filter(
            applicant=user,
            status="Reviewed",
        ).count()

        shortlisted = Application.objects.filter(
            applicant=user,
            status="Shortlisted",
        ).count()

        rejected = Application.objects.filter(
            applicant=user,
            status="Rejected",
        ).count()

        saved_jobs = SavedJob.objects.filter(
            user=user,
        ).count()

        interviews = Interview.objects.filter(
            application__applicant=user,
        ).count()

        notifications = Notification.objects.filter(
            user=user,
            is_read=False,
        ).count()

        resumes = Resume.objects.filter(
            user=user,
        ).count()

        latest_applications = (
            Application.objects.filter(
                applicant=user,
            )
            .select_related(
                "job",
                "job__company",
            )
            .order_by("-applied_at")[:5]
        )

        data = {
            "total_applications": total_applications,
            "pending_applications": pending,
            "reviewed_applications": reviewed,
            "shortlisted_applications": shortlisted,
            "rejected_applications": rejected,
            "saved_jobs": saved_jobs,
            "interviews": interviews,
            "unread_notifications": notifications,
            "resumes": resumes,
            "latest_applications": [
                {
                    "id": app.id,
                    "job": app.job.title,
                    "company": app.job.company.company_name,
                    "status": app.status,
                    "applied_at": app.applied_at,
                }
                for app in latest_applications
            ],
        }

        return Response(data)