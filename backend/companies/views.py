from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Company
from .serializers import CompanySerializer


class CompanyListCreateAPIView(generics.ListCreateAPIView):

    queryset = Company.objects.all().order_by("-created_at")

    serializer_class = CompanySerializer

    permission_classes = [AllowAny]


class CompanyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Company.objects.all().order_by("-created_at")

    serializer_class = CompanySerializer

    permission_classes = [AllowAny]