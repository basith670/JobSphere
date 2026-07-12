import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from resume_manager.models import Resume
from ai_resume.models import ResumeAnalysis


@pytest.mark.django_db
class TestAIResume:

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

        self.resume = Resume.objects.create(
            user=self.user,
            title="Software Engineer",
            full_name="John Doe",
            email="john@test.com",
            phone="9876543210",
            location="Bangalore",
            summary="Python Django REST developer with AWS and Docker experience.",
            skills="Python, Django, REST, PostgreSQL, Git, Docker, AWS, React",
            experience="2 Years Python Developer",
            education="B.Tech",
            projects="Built JobSphere using Django REST Framework and React.",
            certifications="AWS Cloud Practitioner",
        )

    def test_analyze_resume(self):

        url = reverse(
            "resume-analyze",
            kwargs={
                "resume_id": self.resume.id,
            },
        )

        response = self.client.post(url)

        assert response.status_code == 200

        assert ResumeAnalysis.objects.count() == 1

    def test_analysis_history(self):

        ResumeAnalysis.objects.create(
            user=self.user,
            resume=self.resume,
            ats_score=95,
            skills_found=[
                "Python",
                "Django",
            ],
            missing_skills=[],
            suggestions=[],
        )

        response = self.client.get(
            reverse("resume-analysis-history"),
        )

        assert response.status_code == 200

        assert len(response.data["results"]) == 1

    def test_only_user_history(self):

        other = User.objects.create_user(
            username="alice",
            email="alice@test.com",
            password="Alice@12345",
            role="jobseeker",
        )

        ResumeAnalysis.objects.create(
            user=self.user,
            resume=self.resume,
            ats_score=90,
        )

        other_resume = Resume.objects.create(
            user=other,
            title="Resume",
            full_name="Alice",
            email="alice@test.com",
            phone="9999999999",
            location="Chennai",
            summary="Python",
            skills="Python",
            experience="1 Year",
            education="B.Tech",
        )

        ResumeAnalysis.objects.create(
            user=other,
            resume=other_resume,
            ats_score=80,
        )

        response = self.client.get(
            reverse("resume-analysis-history"),
        )

        assert response.status_code == 200

        assert len(response.data["results"]) == 1