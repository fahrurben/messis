from django.db import models

OWNER = 'O'
USER = 'U'


class Role(models.TextChoices):
    OWNER = 'O', 'Owner'
    USER = 'U', 'User'
