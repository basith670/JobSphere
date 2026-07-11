from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsRecruiterOrReadOnly(BasePermission):

    def has_permission(self, request, view):

        # Anyone can view jobs
        if request.method in SAFE_METHODS:
            return True

        # Must be logged in
        if not request.user.is_authenticated:
            return False

        # Only recruiters can create/update/delete
        return request.user.role == "recruiter"