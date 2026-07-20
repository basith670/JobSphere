from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .utils import send_jobsphere_email


class SendTestEmailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        # send_jobsphere_email(

        #     subject="JobSphere Test Email",

        #     message="Congratulations! Your email service is working successfully.",

        #     recipient=request.user.email,

        # )

        # return Response(
        #     {
        #         "message": "Email sent successfully."
        #     }
        # )
        print("Skipping email")