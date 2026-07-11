from django.shortcuts import render

# Create your views here.
from django.db.models import Avg

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from companies.models import Company

from .models import Review
from .serializers import ReviewSerializer


class ReviewListCreateAPIView(generics.ListCreateAPIView):

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = Review.objects.all()

        company = self.request.query_params.get("company")

        if company:
            queryset = queryset.filter(company=company)

        return queryset

    def perform_create(self, serializer):

        serializer.save()


class ReviewDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Review.objects.filter(
            user=self.request.user
        )


class CompanyRatingAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, company_id):

        company = Company.objects.get(id=company_id)

        reviews = company.reviews.all()

        average = reviews.aggregate(
            average=Avg("rating")
        )

        return Response({

            "company": company.company_name,
            "average_rating": average["average"],
            "total_reviews": reviews.count(),

        })


class TopRatedCompaniesAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        companies = Company.objects.annotate(

            average_rating=Avg("reviews__rating")

        ).order_by("-average_rating")

        data = []

        for company in companies:

            data.append({

                "id": company.id,
                "company": company.company_name,
                "rating": company.average_rating,

            })

        return Response(data)