from django.db import models

from accounts.models import User


class Resume(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="resume",
    )

    resume = models.FileField(
        upload_to="resumes/",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.user.username