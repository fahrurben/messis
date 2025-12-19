from rest_framework import permissions

from messis.models import CustomUser, UserRole


class CompanyOwnerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """ Always has permission, permission check in the query filter by company id"""
        user_role = UserRole.objects.filter(company=request.company, user=request.user).first()

        if user_role is not None and user_role.role == UserRole.Role.OWNER:
            return True

        return False

