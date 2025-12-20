from django.db import models

from messis.models import Project, Task, CustomUser


class TimeEntry(models.Model):
    project = models.ForeignKey(Project, related_name='time_entries', on_delete=models.RESTRICT)
    task = models.ForeignKey(Task, related_name='time_entries', on_delete=models.RESTRICT)
    team = models.ForeignKey(CustomUser, related_name='time_entries', on_delete=models.RESTRICT)
    summary = models.TextField()
    entry_at = models.DateField()
    total_seconds = models.BigIntegerField()

