from django.conf import settings
from django.core.mail import EmailMessage, get_connection


def send_jobsphere_email(subject, message, recipient):
    connection = get_connection(timeout=10)

    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[recipient],
        connection=connection,
    )

    return email.send()