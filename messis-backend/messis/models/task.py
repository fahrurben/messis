from django.db import models

from messis.models import Project


class Task(models.Model):
    project = models.ForeignKey(Project, related_name="tasks", on_delete=models.RESTRICT)
    name = models.CharField(255)
    is_billable = models.BooleanField()
