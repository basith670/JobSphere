from rest_framework.permissions import BasePermission


class IsJobSeeker(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        return request.user.role == "jobseeker"


class IsRecruiterOwner(BasePermission):

    def has_object_permission(self, request, view, obj):

        return (
            request.user.is_authenticated
            and request.user.role == "recruiter"
            and obj.job.company.owner == request.user
        )