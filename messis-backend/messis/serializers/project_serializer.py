from rest_framework import serializers
from messis.models import Project, ProjectTeam, Task


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=255)
    is_billable = serializers.BooleanField()

    class Meta:
        model = Task
        fields = ('id', 'name', 'is_billable')


class ProjectTeamSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    project_id = serializers.IntegerField(required=False)
    team_id = serializers.IntegerField()

    class Meta:
        model = ProjectTeam
        fields = ('id', 'project_id', 'team_id', 'is_admin')


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tasks = TaskSerializer(many=True, required=False)
    projectteam_set = ProjectTeamSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'code',
            'start_date',
            'end_date',
            'description',
            'tasks',
            'projectteam_set',
            'is_billable',
            'is_active',
        )

    def create(self, validated_data):
        current_user = self.context['user']
        company = self.context['company']

        tasks = validated_data.pop('tasks') if 'tasks' in validated_data else None
        projectteam_set = validated_data.pop('projectteam_set') if 'projectteam_set' in validated_data else None

        project = Project.objects.create(company=company, **validated_data)

        if tasks:
            for task in tasks:
                Task.objects.create(project=project, **task)

        if projectteam_set:
            for project_team in projectteam_set:
                ProjectTeam.objects.create(project=project, **project_team)

        return project

    def update(self, instance, validated_data):
        current_user = self.context['user']
        company = self.context['company']

        tasks = validated_data.pop('tasks') if 'tasks' in validated_data else None
        projectteam_set = validated_data.pop('projectteam_set') if 'projectteam_set' in validated_data else None

        instance.name = validated_data.get('name')
        instance.code = validated_data.get('code')
        instance.start_date = validated_data.get('start_date')
        instance.end_date = validated_data.get('end_date')
        instance.description = validated_data.get('description')
        instance.is_billable = validated_data.get('is_billable')
        instance.is_active = validated_data.get('is_active')

        # Update tasks
        existing_task_ids = instance.tasks.all().values_list('id', flat=True)
        update_task_ids = [task.get('id') for task in tasks if task.get('id') is not None]
        deleted_task_ids = set(existing_task_ids).difference(set(update_task_ids))

        if tasks:
            for task_datum in tasks:
                if task_datum.get('id') is None:
                    Task.objects.create(project=instance, **task_datum)
                else:
                    Task.objects.filter(id=task_datum.get('id')).update(**task_datum)

        if len(deleted_task_ids) > 0:
            Task.objects.filter(id__in=list(deleted_task_ids)).delete()

        # Update project teams
        existing_project_team_ids = instance.projectteam_set.all().values_list('id', flat=True)
        update_project_team_ids = [project_team.get('id') for project_team in projectteam_set if
                                   project_team.get('id') is not None]
        deleted_project_team_ids = set(existing_project_team_ids).difference(set(update_project_team_ids))

        if projectteam_set:
            for project_team_datum in projectteam_set:
                if project_team_datum.get('id') is None:
                    ProjectTeam.objects.create(project=instance, **project_team_datum)
                else:
                    ProjectTeam.objects.filter(id=project_team_datum.get('id')).update(**project_team_datum)

        if len(deleted_project_team_ids) > 0:
            ProjectTeam.objects.filter(id__in=list(deleted_project_team_ids)).delete()

        return instance
