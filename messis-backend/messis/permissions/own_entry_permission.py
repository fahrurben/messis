from ..models import CustomUser, UserRole
from django.urls import reverse
from rest_framework import permissions


class OwnEntryPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """ Always has permission, permission check in the query filter by company id"""
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """ Check if model is allow to access by user """
        user_role = UserRole.objects.filter(user=request.user, company=request.company).first()

        if user_role is not None and user_role == UserRole.Role.OWNER:
            return True

        if request.user.id == obj.team.id:
            return True

        return False
