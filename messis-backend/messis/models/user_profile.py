from django.db import models

from messis.models import CustomUser


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.RESTRICT)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    capacity = models.DecimalField(max_digits=13, decimal_places=2)
    bill_rate = models.DecimalField(max_digits=13, decimal_places=2)
    cost_rate = models.DecimalField(max_digits=13, decimal_places=2)
    profile_photo = models.CharField(max_length=255)

    @property
    def fullname(self):
        return f"{self.firstname} {self.lastname}"
