from django.db import models
from django.apps import apps


class CustomUserManager(models.Manager):

    def get_users_of_company(self, company):
        return self.get_queryset().select_related('userprofile').filter(companies__in=[company]).order_by(
            'userprofile__firstname', 'userprofile__lastname')

    def get_owner_user(self, company):
        UserRole = apps.get_model('messis', 'UserRole')
        return (
            self.get_queryset().select_related('userprofile')
            .filter(companies__in=[company], userrole__role=UserRole.Role.OWNER)
            .first()
        )

