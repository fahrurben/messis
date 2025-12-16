from django.db import models

from .custom_user import CustomUser
from .company import Company




class UserRole(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Role(models.TextChoices):
        OWNER = 'OWNER', 'Owner'
        USER = 'USER', 'User'

    role = models.CharField(max_length=5, choices=Role, default=Role.USER)
