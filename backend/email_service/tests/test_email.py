import pytest
from unittest.mock import patch

from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User


@pytest.mark.django_db
class TestEmailService:

    def setup_method(self):

        self.client = APIClient()

        self.user = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

    @patch("email_service.views.send_jobsphere_email")
    def test_send_email(self, mock_send):

        self.client.force_authenticate(
            user=self.user,
        )

        response = self.client.post(
            reverse("send-test-email"),
        )

        assert response.status_code == 200

        assert response.data["message"] == "Email sent successfully."

        mock_send.assert_called_once()

    def test_requires_login(self):

        response = self.client.post(
            reverse("send-test-email"),
        )

        assert response.status_code == 401

    @patch("email_service.views.send_jobsphere_email")
    def test_email_sent_to_logged_in_user(self, mock_send):

        self.client.force_authenticate(
            user=self.user,
        )

        self.client.post(
            reverse("send-test-email"),
        )

        _, kwargs = mock_send.call_args

        assert kwargs["recipient"] == "john@test.com"