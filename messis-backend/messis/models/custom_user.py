from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from messis.models import CustomUserManager


class CustomUser(AbstractUser):
    custom_objects = CustomUserManager()
    email = models.EmailField(_('Email Address'), unique=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    def __str__(self):
        return self.email

    @property
    def fullname(self):
        return f'{self.first_name} {self.last_name}'
