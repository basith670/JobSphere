from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsJobSeeker

from notifications.models import Notification


class ApplicationListCreateAPIView(generics.ListCreateAPIView):

    queryset = (
        Application.objects.select_related(
            "applicant",
            "job",
        ).order_by("-applied_at")
    )

    serializer_class = ApplicationSerializer

    permission_classes = [IsJobSeeker]

    def perform_create(self, serializer):

        application = serializer.save(
            applicant=self.request.user,
        )

        Notification.objects.create(
            user=application.job.recruiter,
            title="New Job Application",
            message=(
                f"{application.applicant.first_name} "
                f"{application.applicant.last_name} "
                f"applied for '{application.job.title}'."
            ),
        )


class ApplicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return (
            Application.objects.filter(
                job__recruiter=self.request.user,
            )
            .select_related(
                "applicant",
                "job",
                "job__company",
            )
        )

    def perform_update(self, serializer):

        previous_status = serializer.instance.status

        application = serializer.save()

        # Candidate Shortlisted
        if (
            previous_status != "Shortlisted"
            and application.status == "Shortlisted"
        ):

            Notification.objects.create(
                user=application.applicant,
                title="Application Shortlisted",
                message=(
                    f"You have been shortlisted for "
                    f"{application.job.title}."
                ),
            )

        # Candidate Rejected
        elif (
            previous_status != "Rejected"
            and application.status == "Rejected"
        ):

            Notification.objects.create(
                user=application.applicant,
                title="Application Rejected",
                message=(
                    f"Your application for "
                    f"{application.job.title} was rejected."
                ),
            )

        # Interview Scheduled
        if application.interview_date:

            Notification.objects.create(
                user=application.applicant,
                title="Interview Scheduled",
                message=(
                    f"Your interview for "
                    f"{application.job.title} has been scheduled on "
                    f"{application.interview_date.strftime('%d %b %Y %I:%M %p')}."
                ),
            )


class RecruiterApplicationsAPIView(generics.ListAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return (
            Application.objects.filter(
                job__recruiter=self.request.user
            )
            .select_related(
                "applicant",
                "job",
                "job__company",
            )
            .order_by("-applied_at")
        )


class JobApplicantsAPIView(generics.ListAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return (
            Application.objects.filter(
                job_id=self.kwargs["job_id"],
                job__recruiter=self.request.user,
            )
            .select_related(
                "applicant",
                "job",
                "job__company",
            )
            .order_by("-applied_at")
        )