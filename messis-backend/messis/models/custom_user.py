from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from messis.models import CustomUserManager


class CustomUser(AbstractUser):
    custom_objects = CustomUserManager()
    email = models.EmailField(_('Email Address'), unique=True)
    is_active = models.BooleanField(default=True)
    invite_code = models.CharField(max_length=36, default='', null=True)
    is_email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    def __str__(self):
        return self.email

    @property
    def fullname(self):
        return f'{self.first_name} {self.last_name}'
