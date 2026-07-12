import datetime

import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from resume_manager.models import Resume


@pytest.mark.django_db
class TestRecommendations:

    def setup_method(self):

        self.client = APIClient()

        self.user = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(
            user=self.user,
        )

        recruiter = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
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
            description="Python Django REST",
            requirements="Python Django",
            skills_required="Python Django REST",
            vacancies=1,
            deadline=datetime.date.today()
            + datetime.timedelta(days=30),
            is_active=True,
        )

    def test_no_default_resume(self):

        response = self.client.get(
            reverse("job-recommendations"),
        )

        assert response.status_code == 400

    def test_job_recommendations(self):

        Resume.objects.create(
            user=self.user,
            title="Resume",
            full_name="John Doe",
            email="john@test.com",
            phone="9999999999",
            location="Bangalore",
            summary="Python Django REST Developer",
            skills="Python Django REST PostgreSQL Git",
            experience="2 Years",
            education="B.Tech",
            projects="Job Portal",
            certifications="AWS",
            is_default=True,
        )

        response = self.client.get(
            reverse("job-recommendations"),
        )

        assert response.status_code == 200

        assert len(response.data) == 1

    def test_match_score_exists(self):

        Resume.objects.create(
            user=self.user,
            title="Resume",
            full_name="John Doe",
            email="john@test.com",
            phone="9999999999",
            location="Bangalore",
            summary="Python Django REST Developer",
            skills="Python Django REST PostgreSQL Git",
            experience="2 Years",
            education="B.Tech",
            projects="Job Portal",
            certifications="AWS",
            is_default=True,
        )

        response = self.client.get(
            reverse("job-recommendations"),
        )

        assert response.status_code == 200

        assert "match_score" in response.data[0]