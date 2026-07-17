from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Company
from .serializers import CompanySerializer


class MyCompanyAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(
            Company,
            owner=self.request.user,
        )