import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company


@pytest.mark.django_db
class TestCompanies:

    def setup_method(self):

        self.client = APIClient()

        self.owner = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

    def test_create_company(self):

        url = reverse("company-list-create")

        data = {
            "owner": self.owner.id,
            "company_name": "Google",
            "location": "Bangalore",
            "industry": "Software",
            "company_size": "1000+",
            "description": "Google Company",
            "website": "https://google.com",
            "email": "hr@google.com",
            "is_verified": True,
        }

        response = self.client.post(
            url,
            data,
            format="json",
        )

        assert response.status_code == 201
        assert Company.objects.count() == 1

    def test_list_companies(self):

        Company.objects.create(
            owner=self.owner,
            company_name="Google",
            location="Bangalore",
            industry="Software",
            company_size="1000+",
            description="Google Company",
            website="https://google.com",
            email="hr@google.com",
            is_verified=True,
        )

        url = reverse("company-list-create")

        response = self.client.get(url)

        assert response.status_code == 200
        assert len(response.data["results"]) == 1