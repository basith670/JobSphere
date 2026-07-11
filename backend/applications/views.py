from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]


class ApplicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]