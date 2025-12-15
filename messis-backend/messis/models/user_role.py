from django.db import models

from .custom_user import CustomUser
from .company import Company


class UserRole(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Role(models.TextChoices):
        OWNER = 'O', 'Owner'
        USER = 'U', 'User'

    role = models.CharField(max_length=2, choices=Role, default=Role.USER)
