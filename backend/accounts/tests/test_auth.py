import pytest
from rest_framework.test import APIClient
from django.urls import reverse

from accounts.models import User


@pytest.mark.django_db
class TestAuthentication:

    def setup_method(self):
        self.client = APIClient()

    def test_register_user(self):

        url = reverse("register")

        data = {
            "username": "john",
            "email": "john@test.com",
            "password": "John@12345",
            "password2": "John@12345",
            "role": "jobseeker",
            "phone": "9876543210",
        }

        response = self.client.post(
            url,
            data,
            format="json",
        )

        assert response.status_code == 201
        assert User.objects.filter(username="john").exists()

    def test_login_user(self):

        User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        url = reverse("login")

        response = self.client.post(
            url,
            {
                "username": "john",
                "password": "John@12345",
            },
            format="json",
        )

        assert response.status_code == 200
        assert "access" in response.data
        assert "refresh" in response.data

    def test_profile_api(self):

        user = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(user=user)

        url = reverse("profile")

        response = self.client.get(url)

        assert response.status_code == 200
        assert response.data["username"] == "john"