import resend
from django.conf import settings


resend.api_key = settings.RESEND_API_KEY


def send_jobsphere_email(subject, message, recipient):

    print("========== SEND EMAIL (Resend) ==========")
    print(f"Recipient: {recipient}")
    print(f"From: {settings.DEFAULT_FROM_EMAIL}")

    try:
        response = resend.Emails.send({
            "from": settings.DEFAULT_FROM_EMAIL,
            "to": [recipient],
            "subject": subject,
            "text": message,
        })

        print("Email sent successfully:", response)

        return response

    except Exception as e:
        print("========== RESEND EMAIL ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("==========================================")
        raise