from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Interview
from .serializers import InterviewSerializer


class InterviewListCreateAPIView(generics.ListCreateAPIView):

    serializer_class = InterviewSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.role == "recruiter":

            return Interview.objects.filter(
                recruiter=self.request.user,
            )

        return Interview.objects.filter(
            application__applicant=self.request.user,
        )

    def perform_create(self, serializer):

        serializer.save(
            recruiter=self.request.user,
        )


class InterviewDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = InterviewSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.role == "recruiter":

            return Interview.objects.filter(
                recruiter=self.request.user,
            )

        return Interview.objects.filter(
            application__applicant=self.request.user,
        )