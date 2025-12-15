from django.db import models

from messis.models import CustomUser, Project


class ProjectTeam(models.Model):
    project = models.ForeignKey(Project, on_delete=models.RESTRICT)
    team = models.ForeignKey(CustomUser, on_delete=models.RESTRICT)
    is_admin = models.BooleanField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['team', 'project'], name='unique_team')
        ]