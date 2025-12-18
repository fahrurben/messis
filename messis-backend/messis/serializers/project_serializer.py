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
