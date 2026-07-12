import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from accounts.models import User
from companies.models import Company
from reviews.models import Review


@pytest.mark.django_db
class TestReviews:

    def setup_method(self):

        self.client = APIClient()

        self.user = User.objects.create_user(
            username="john",
            email="john@test.com",
            password="John@12345",
            role="jobseeker",
        )

        self.client.force_authenticate(user=self.user)

        self.owner = User.objects.create_user(
            username="recruiter",
            email="rec@test.com",
            password="Recruiter@123",
            role="recruiter",
        )

        self.company = Company.objects.create(
            owner=self.owner,
            company_name="Google",
            location="Bangalore",
            industry="Software",
            company_size="1000+",
            description="Google",
        )

    def test_create_review(self):

        response = self.client.post(
            reverse("review-list"),
            {
                "company": self.company.id,
                "rating": 5,
                "title": "Excellent Company",
                "review": "Great place to work.",
                "pros": "Learning",
                "cons": "None",
                "is_anonymous": False,
            },
            format="json",
        )

        assert response.status_code == 201
        assert Review.objects.count() == 1

    def test_duplicate_review(self):

        Review.objects.create(
            user=self.user,
            company=self.company,
            rating=5,
            title="Review",
            review="Nice company",
        )

        response = self.client.post(
            reverse("review-list"),
            {
                "company": self.company.id,
                "rating": 4,
                "title": "Another Review",
                "review": "Duplicate",
            },
            format="json",
        )

        assert response.status_code == 400

    def test_company_rating(self):

        Review.objects.create(
            user=self.user,
            company=self.company,
            rating=5,
            title="Review",
            review="Excellent",
        )

        response = self.client.get(
            reverse(
                "company-rating",
                kwargs={
                    "company_id": self.company.id,
                },
            ),
        )

        assert response.status_code == 200
        assert response.data["average_rating"] == 5.0

    def test_top_rated_companies(self):

        Review.objects.create(
            user=self.user,
            company=self.company,
            rating=5,
            title="Review",
            review="Excellent",
        )

        response = self.client.get(
            reverse("top-rated-companies"),
        )

        assert response.status_code == 200
        assert len(response.data) == 1