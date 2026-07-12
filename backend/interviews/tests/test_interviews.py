import datetime

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from jobs.models import Job
from applications.models import Application
from interviews.models import Interview


@pytest.mark.django_db
class TestInterviews:

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
        )

        self.application = Application.objects.create(
            applicant=self.jobseeker,
            job=self.job,
            resume=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
        )

    def test_schedule_interview(self):

        self.client.force_authenticate(
            user=self.recruiter,
        )

        response = self.client.post(
            reverse("interview-list"),
            {
                "application": self.application.id,
                "interviewer_name": "HR Manager",
                "interview_type": "Online",
                "interview_date": (
                    datetime.date.today()
                    + datetime.timedelta(days=5)
                ).isoformat(),
                "interview_time": "10:00:00",
                "meeting_link": "https://meet.google.com/demo",
                "notes": "Technical Round",
            },
            format="json",
        )

        assert response.status_code == 201
        assert Interview.objects.count() == 1

    def test_recruiter_list_interviews(self):

        Interview.objects.create(
            application=self.application,
            recruiter=self.recruiter,
            interviewer_name="HR",
            interview_type="Online",
            interview_date=datetime.date.today(),
            interview_time=datetime.time(10, 0),
        )

        self.client.force_authenticate(
            user=self.recruiter,
        )

        response = self.client.get(
            reverse("interview-list"),
        )

        assert response.status_code == 200
        assert len(response.data["results"]) == 1

    def test_candidate_list_interviews(self):

        Interview.objects.create(
            application=self.application,
            recruiter=self.recruiter,
            interviewer_name="HR",
            interview_type="Online",
            interview_date=datetime.date.today(),
            interview_time=datetime.time(10, 0),
        )

        self.client.force_authenticate(
            user=self.jobseeker,
        )

        response = self.client.get(
            reverse("interview-list"),
        )

        assert response.status_code == 200
        assert len(response.data["results"]) == 1