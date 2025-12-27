from django.db import models

from messis.models import CustomUser, Company

from typing import Any

class Project(models.Model):
    company = models.ForeignKey(Company, related_name='projects', on_delete=models.RESTRICT)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(blank=True)
    is_billable = models.BooleanField()
    task_counter = models.IntegerField(default=1)
    teams: Any = models.ManyToManyField(CustomUser, through='ProjectTeam', through_fields=('project', 'team'))
    is_active = models.BooleanField()

    def __str__(self):
        return self.name
