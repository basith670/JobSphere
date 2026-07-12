import datetime

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job, SavedJob
from applications.models import Application
from resume_manager.models import Resume
from notifications.models import Notification
from interviews.models import Interview


@pytest.mark.django_db
class TestCandidateDashboard:

    def setup_method(self):

        self.client = APIClient()

        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

        self.candidate = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(
            user=self.candidate,
        )

        self.company = Company.objects.create(
            owner=self.recruiter,
            company_name="Google",
            location="Bangalore",
            industry="Software",
            company_size="1000+",
            description="Google",
        )

        self.job = Job.objects.create(
            title="Python Developer",
            company=self.company,
            location="Bangalore",
            job_type="Full Time",
            experience="1-2 Years",
            salary_min=50000,
            salary_max=100000,
            description="Backend",
            requirements="Python",
            skills_required="Python Django",
            vacancies=1,
            deadline=datetime.date.today() + datetime.timedelta(days=30),
        )

        self.application = Application.objects.create(
            applicant=self.candidate,
            job=self.job,
            resume=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
            status="Pending",
        )

        SavedJob.objects.create(
            user=self.candidate,
            job=self.job,
        )

        Resume.objects.create(
            user=self.candidate,
            title="Resume",
            full_name="John Doe",
            email="john@test.com",
            phone="9999999999",
            location="Bangalore",
            summary="Python Developer",
            skills="Python",
            experience="2 Years",
            education="B.Tech",
        )

        Notification.objects.create(
            user=self.candidate,
            title="Interview",
            message="Interview Scheduled",
        )

        Interview.objects.create(
            application=self.application,
            recruiter=self.recruiter,
            interviewer_name="HR",
            interview_type="Online",
            interview_date=datetime.date.today(),
            interview_time=datetime.time(10, 0),
        )

    def test_candidate_dashboard(self):

        response = self.client.get(
            reverse("candidate-dashboard"),
        )

        assert response.status_code == 200

        assert response.data["total_applications"] == 1
        assert response.data["pending_applications"] == 1
        assert response.data["saved_jobs"] == 1
        assert response.data["interviews"] == 1
        assert response.data["resumes"] == 1
        assert response.data["unread_notifications"] == 1

    def test_latest_applications(self):

        response = self.client.get(
            reverse("candidate-dashboard"),
        )

        assert response.status_code == 200

        assert len(response.data["latest_applications"]) == 1

        assert (
            response.data["latest_applications"][0]["job"]
            == "Python Developer"
        )

    def test_dashboard_requires_login(self):

        client = APIClient()

        response = client.get(
            reverse("candidate-dashboard"),
        )

        assert response.status_code == 401