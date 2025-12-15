from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=100)
    subdomain = models.CharField(max_length=100)
    timezone = models.CharField(max_length=50, default='UTC')
    users = models.ManyToManyField('messis.CustomUser', through='messis.UserRole', through_fields=('company', 'user'), related_name='companies')

    class Status(models.TextChoices):
        PAYING = 'PA', 'Paying'
        TRIAL = 'TR', 'Trial'
        EXPIRED = 'EX', 'Expired'
    status = models.CharField(max_length=2, choices=Status, default=Status.TRIAL)
    created_at = models.DateTimeField(auto_now_add=True)
