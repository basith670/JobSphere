import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from resume_manager.models import Resume


@pytest.mark.django_db
class TestResume:

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

    def test_upload_resume(self):

        resume = SimpleUploadedFile(
            "resume.pdf",
            b"dummy resume",
            content_type="application/pdf",
        )

        response = self.client.post(
            reverse("resume-list-create"),
            {
                "title": "Software Engineer Resume",
                "full_name": "John Doe",
                "email": "john@test.com",
                "phone": "9876543210",
                "location": "Bangalore",
                "summary": "Python Developer",
                "skills": "Python, Django, REST",
                "experience": "2 Years",
                "education": "B.Tech Computer Science",
                "projects": "JobSphere",
                "certifications": "AWS CCP",
                "linkedin": "https://linkedin.com/in/john",
                "github": "https://github.com/john",
                "portfolio": "https://john.dev",
                "resume_file": resume,
                "is_default": True,
            },
            format="multipart",
        )

        assert response.status_code == 201
        assert Resume.objects.count() == 1

    def test_list_resumes(self):

        Resume.objects.create(
            user=self.user,
            title="Resume",
            full_name="John Doe",
            email="john@test.com",
            phone="9876543210",
            location="Bangalore",
            summary="Python Developer",
            skills="Python, Django",
            experience="2 Years",
            education="B.Tech",
            projects="JobSphere",
            certifications="AWS",
            linkedin="https://linkedin.com/in/john",
            github="https://github.com/john",
            portfolio="https://john.dev",
            resume_file=SimpleUploadedFile(
                "resume.pdf",
                b"resume",
            ),
            is_default=True,
        )

        response = self.client.get(
            reverse("resume-list-create"),
        )

        assert response.status_code == 200
        assert len(response.data["results"]) == 1

    def test_default_resume(self):

        Resume.objects.create(
            user=self.user,
            title="Resume 1",
            full_name="John Doe",
            email="john@test.com",
            phone="9876543210",
            location="Bangalore",
            summary="Python Developer",
            skills="Python",
            experience="2 Years",
            education="B.Tech",
            projects="Project 1",
            certifications="AWS",
            linkedin="https://linkedin.com/in/john",
            github="https://github.com/john",
            portfolio="https://john.dev",
            resume_file=SimpleUploadedFile(
                "resume1.pdf",
                b"resume",
            ),
            is_default=True,
        )

        resume = SimpleUploadedFile(
            "resume2.pdf",
            b"resume",
            content_type="application/pdf",
        )

        response = self.client.post(
            reverse("resume-list-create"),
            {
                "title": "Resume 2",
                "full_name": "John Doe",
                "email": "john@test.com",
                "phone": "9876543210",
                "location": "Bangalore",
                "summary": "Senior Python Developer",
                "skills": "Python, Django",
                "experience": "3 Years",
                "education": "B.Tech",
                "projects": "JobSphere",
                "certifications": "AWS",
                "linkedin": "https://linkedin.com/in/john",
                "github": "https://github.com/john",
                "portfolio": "https://john.dev",
                "resume_file": resume,
                "is_default": True,
            },
            format="multipart",
        )

        assert response.status_code == 201

        assert Resume.objects.filter(
            user=self.user,
            is_default=True,
        ).count() == 1