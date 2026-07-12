import datetime

import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job


@pytest.mark.django_db
class TestJobs:

    def setup_method(self):

        self.client = APIClient()

        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

        self.company = Company.objects.create(
            owner=self.recruiter,
            company_name="Google",
            location="Bangalore",
            industry="Software",
            company_size="1000+",
            description="Google Company",
        )

    def test_create_job(self):

        self.client.force_authenticate(user=self.recruiter)

        url = reverse("job-list-create")

        data = {
            "title": "Python Developer",
            "company": self.company.id,
            "location": "Bangalore",
            "job_type": "Full Time",
            "experience": "1-2 Years",
            "salary_min": 50000,
            "salary_max": 100000,
            "description": "Backend Developer",
            "requirements": "Python, Django",
            "skills_required": "Python,Django,REST",
            "vacancies": 2,
            "is_featured": True,
            "deadline": (
                datetime.date.today() + datetime.timedelta(days=30)
            ).isoformat(),
            "is_active": True,
        }

        response = self.client.post(url, data, format="json")

        assert response.status_code == 201
        assert Job.objects.count() == 1

    def test_list_jobs(self):

        Job.objects.create(
            title="Backend Developer",
            company=self.company,
            location="Bangalore",
            job_type="Full Time",
            experience="1-2 Years",
            salary_min=40000,
            salary_max=80000,
            description="Python Backend",
            requirements="Django",
            skills_required="Python,Django",
            vacancies=1,
            is_featured=False,
            deadline=datetime.date.today() + datetime.timedelta(days=30),
            is_active=True,
        )

        url = reverse("job-list-create")

        response = self.client.get(url)

        assert response.status_code == 200
        assert len(response.data["results"]) == 1