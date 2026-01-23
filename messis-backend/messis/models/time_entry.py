from django.db import models

from messis.models import Project, Task, CustomUser


class TimeEntry(models.Model):
    project = models.ForeignKey(Project, related_name='time_entries', on_delete=models.RESTRICT)
    task = models.ForeignKey(Task, related_name='time_entries', on_delete=models.RESTRICT)
    team = models.ForeignKey(CustomUser, related_name='time_entries', on_delete=models.RESTRICT)
    summary = models.TextField()
    entry_at = models.DateField()
    total_seconds = models.BigIntegerField()

    @property
    def total_time(self):
        total_hour =  int(self.total_seconds / 3600)
        total_minutes = int(self.total_seconds / 60)
        total_minutes_in_string = "0" if total_minutes == 60 or total_minutes == 0 else total_minutes
        total_time = f"{total_hour:02}:{total_minutes_in_string:02}"
        return total_time

