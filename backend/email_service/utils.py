from django.core.mail import send_mail
from django.conf import settings
import traceback


def send_jobsphere_email(subject, message, recipient):

    print("========== SEND EMAIL ==========")
    print("Recipient:", recipient)
    print("From:", settings.DEFAULT_FROM_EMAIL)

    try:
        result = send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient],
            fail_silently=False,
        )

        print("send_mail returned:", result)

        return result

    except Exception as e:
        print("EMAIL ERROR:")
        print(type(e))
        print(e)
        traceback.print_exc()
        raise