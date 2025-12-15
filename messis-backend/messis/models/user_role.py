from django.db import models

from .custom_user import CustomUser
from .company import Company
from .role import Role


class UserRole(models.Model):
    user = models.ForeignKey(CustomUser, related_name='roles', on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    role = models.CharField(max_length=2, choices=Role, default=Role.OWNER)
