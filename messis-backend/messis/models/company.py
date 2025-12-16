from django.db import models

from messis.models import CompanyManager


class Company(models.Model):
    objects = models.Manager()
    custom_manager = CompanyManager()
    name = models.CharField(max_length=100, unique=True)
    subdomain = models.CharField(max_length=100, unique=True)
    timezone = models.CharField(max_length=50, default='UTC')
    users = models.ManyToManyField('messis.CustomUser', through='messis.UserRole', through_fields=('company', 'user'), related_name='companies')

    class Status(models.TextChoices):
        PAYING = 'PA', 'Paying'
        TRIAL = 'TR', 'Trial'
        EXPIRED = 'EX', 'Expired'
    status = models.CharField(max_length=2, choices=Status, default=Status.TRIAL)
    created_at = models.DateTimeField(auto_now_add=True)
