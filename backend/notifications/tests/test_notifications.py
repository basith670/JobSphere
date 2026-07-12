import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from notifications.models import Notification


@pytest.mark.django_db
class TestNotifications:

    def setup_method(self):

        self.client = APIClient()

        self.user = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.other_user = User.objects.create_user(
            username="alice",
            email="alice@test.com",
            password="Alice@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(
            user=self.user,
        )

    def test_list_notifications(self):

        Notification.objects.create(
            user=self.user,
            title="Application Update",
            message="Your application has been reviewed.",
        )

        response = self.client.get(
            "/api/notifications/",
        )

        assert response.status_code == 200
        assert len(response.data["results"]) == 1

    def test_user_only_sees_own_notifications(self):

        Notification.objects.create(
            user=self.user,
            title="My Notification",
            message="Hello",
        )

        Notification.objects.create(
            user=self.other_user,
            title="Other Notification",
            message="Secret",
        )

        response = self.client.get(
            "/api/notifications/",
        )

        assert response.status_code == 200
        assert len(response.data["results"]) == 1
        assert response.data["results"][0]["title"] == "My Notification"

    def test_mark_notification_as_read(self):

        notification = Notification.objects.create(
            user=self.user,
            title="Interview",
            message="Interview scheduled",
            is_read=False,
        )

        response = self.client.patch(
            f"/api/notifications/{notification.id}/",
            {
                "is_read": True,
            },
            format="json",
        )

        assert response.status_code == 200

        notification.refresh_from_db()

        assert notification.is_read is True