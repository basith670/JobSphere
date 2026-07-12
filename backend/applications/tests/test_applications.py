import datetime
from pathlib import Path

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from applications.models import Application


@pytest.mark.django_db
class TestApplications:

    def setup_method(self):

        self.client = APIClient()

        self.jobseeker = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

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
            skills_required="Python,Django",
            vacancies=1,
            deadline=datetime.date.today()
            + datetime.timedelta(days=30),
        )

    def test_apply_job(self):

        self.client.force_authenticate(
            user=self.jobseeker,
        )

        resume = SimpleUploadedFile(
            "resume.pdf",
            b"dummy resume",
            content_type="application/pdf",
        )

        response = self.client.post(
            reverse("application-list"),
            {
                "job": self.job.id,
                "resume": resume,
                "cover_letter": "Interested in this role",
            },
        )

        assert response.status_code == 201
        assert Application.objects.count() == 1

    def test_duplicate_application(self):

        Application.objects.create(
            applicant=self.jobseeker,
            job=self.job,
            resume=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
        )

        self.client.force_authenticate(
            user=self.jobseeker,
        )

        resume = SimpleUploadedFile(
            "resume2.pdf",
            b"resume",
        )

        response = self.client.post(
            reverse("application-list"),
            {
                "job": self.job.id,
                "resume": resume,
                "cover_letter": "Again",
            },
        )

        assert response.status_code == 400

    def test_list_applications(self):

        Application.objects.create(
            applicant=self.jobseeker,
            job=self.job,
            resume=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
        )

        self.client.force_authenticate(
            user=self.jobseeker,
        )

        response = self.client.get(
            reverse("application-list"),
        )

        assert response.status_code == 200