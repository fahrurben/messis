from rest_framework import serializers

from messis.models import TimeEntry, Project, Task


class TimeEntrySerializer(serializers.ModelSerializer):
    project_id = serializers.IntegerField()
    project = serializers.PrimaryKeyRelatedField(read_only=True)
    task_id = serializers.IntegerField()
    task = serializers.PrimaryKeyRelatedField(read_only=True)
    team_id = serializers.IntegerField(read_only=True)
    team = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TimeEntry
        fields = (
        'id', 'project_id', 'project', 'team_id', 'team', 'task_id', 'task', 'summary', 'entry_at', 'total_seconds')

    def create(self, validated_data):
        current_user = self.context['user']
        company = self.context['company']

        project_id = validated_data.get('project_id')
        task_id = validated_data.get('task_id')

        project = Project.objects.get(id=project_id)
        task = Task.objects.get(id=task_id)

        time_entry = TimeEntry.objects.create(project=project, task=task, team=current_user, **validated_data)
        return time_entry

    def update(self, instance, validated_data):
        project_id = validated_data.get('project_id')
        task_id = validated_data.get('task_id')

        project = Project.objects.get(id=project_id)
        task = Task.objects.get(id=task_id)

        instance.project = project
        instance.task = task
        instance.summary = validated_data.get('summary')
        instance.total_seconds = validated_data.get('total_seconds')
        instance.save()

        return instance