from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import traceback


def custom_exception_handler(exc, context):

    print("\n==============================")
    print("CUSTOM EXCEPTION HANDLER CALLED")
    print("==============================\n")

    response = exception_handler(exc, context)

    if response is None:
        print("\n========== REAL EXCEPTION ==========")
        traceback.print_exc()
        print("====================================\n")

        return Response(
            {
                "success": False,
                "status_code": 500,
                "message": str(exc),
                "errors": [],
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {
            "success": False,
            "status_code": response.status_code,
            "message": "Validation Error",
            "errors": response.data,
        },
        status=response.status_code,
    )