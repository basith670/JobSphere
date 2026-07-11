from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Job
from .serializers import JobSerializer


class JobListCreateAPIView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]


class JobDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]