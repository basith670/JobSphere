import datetime

import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job


@pytest.mark.django_db
class TestHomepage:

    def setup_method(self):

        self.client = APIClient()

        recruiter = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

        User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        company = Company.objects.create(
            owner=recruiter,
            company_name="Google",
            location="Bangalore",
            industry="Software",
            company_size="1000+",
            description="Google",
        )

        Job.objects.create(
            title="Python Developer",
            company=company,
            location="Bangalore",
            job_type="Full Time",
            experience="1-2 Years",
            salary_min=50000,
            salary_max=100000,
            description="Python Backend",
            requirements="Python Django",
            skills_required="Python,Django",
            vacancies=2,
            deadline=datetime.date.today() + datetime.timedelta(days=30),
            is_active=True,
            is_featured=True,
        )

    def test_homepage_api(self):

        response = self.client.get(
            reverse("homepage"),
        )

        assert response.status_code == 200

    def test_homepage_statistics(self):

        response = self.client.get(
            reverse("homepage"),
        )

        assert response.status_code == 200

        assert response.data["statistics"]["jobs"] == 1
        assert response.data["statistics"]["companies"] == 1
        assert response.data["statistics"]["candidates"] == 1
        assert response.data["statistics"]["recruiters"] == 1

    def test_homepage_lists(self):

        response = self.client.get(
            reverse("homepage"),
        )

        assert response.status_code == 200

        assert len(response.data["featured_jobs"]) == 1
        assert len(response.data["latest_jobs"]) == 1
        assert len(response.data["top_companies"]) == 1