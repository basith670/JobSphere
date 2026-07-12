import datetime

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from applications.models import Application


@pytest.mark.django_db
class TestAnalytics:

    def setup_method(self):

        self.client = APIClient()

        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

        self.jobseeker = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(
            user=self.recruiter,
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
            deadline=datetime.date.today()
            + datetime.timedelta(days=30),
            is_active=True,
            is_featured=True,
        )

        self.application = Application.objects.create(
            applicant=self.jobseeker,
            job=self.job,
            resume=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
        )

    def test_dashboard(self):

        response = self.client.get(
            reverse("analytics-dashboard"),
        )

        assert response.status_code == 200

        assert response.data["total_companies"] == 1
        assert response.data["total_jobs"] == 1
        assert response.data["total_applications"] == 1

    def test_recent_applications(self):

        response = self.client.get(
            reverse("recent-applications"),
        )

        assert response.status_code == 200

        assert len(response.data["results"]) == 1

    def test_job_statistics(self):

        response = self.client.get(
            reverse("job-statistics"),
        )

        assert response.status_code == 200

        assert len(response.data) == 1

        assert response.data[0]["applications"] == 1