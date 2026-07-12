import pytest

from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from applications.models import Application


@pytest.mark.django_db
class TestRecruiterDashboard:

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
            password="John@123",
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
            description="Google Company",
            website="https://google.com",
            email="hr@google.com",
        )

        self.job = Job.objects.create(
            title="Python Developer",
            company=self.company,
            location="Bangalore",
            job_type="Full Time",
            experience="1-2 Years",
            salary_min=50000,
            salary_max=100000,
            description="Python Job",
            requirements="Django",
            skills_required="Python,Django",
            vacancies=2,
            deadline="2030-12-31",
        )

        Application.objects.create(
            applicant=self.jobseeker,
            job=self.job,
            cover_letter="Interested",
            resume="resumes/test.pdf",
        )

    def test_dashboard_counts(self):

        response = self.client.get(
            reverse("recruiter-dashboard"),
        )

        assert response.status_code == 200
        assert response.data["companies"] == 1
        assert response.data["jobs"] == 1
        assert response.data["applications"] == 1

    def test_jobseeker_cannot_access_dashboard(self):

        client = APIClient()

        client.force_authenticate(
            user=self.jobseeker,
        )

        response = client.get(
            reverse("recruiter-dashboard"),
        )

        assert response.status_code == 403

    def test_dashboard_requires_login(self):

        client = APIClient()

        response = client.get(
            reverse("recruiter-dashboard"),
        )

        assert response.status_code == 401