from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Company
from .serializers import CompanySerializer


class MyCompanyAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        company, created = Company.objects.get_or_create(
            owner=self.request.user,
            defaults={
                "company_name": "",
            },
        )

        return company
    
from rest_framework.permissions import AllowAny


class CompanyListAPIView(generics.ListAPIView):
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]

    queryset = (
        Company.objects
        .exclude(company_name="")
        .order_by("-created_at")
    )