from django.db.models import Q
from django.db.models.aggregates import Sum
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from messis.models import CustomUser, TimeEntry
from messis.serializers import UserProfileSerializer


class ReportView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def get_summary(self, request):
        project_id = request.query_params.get('project_id')
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')

        summary_dict = []
        users = (CustomUser.objects.filter(companies__in=[self.request.company])
                 .order_by('userprofile__firstname', 'userprofile__lastname'))

        for user in users:
            time_entry_filters = Q(
                Q(team_id=user.id) & Q(project_id=project_id) & Q(entry_at__gte=from_date) & Q(entry_at__lte=to_date))

            entries = (TimeEntry.objects.values('entry_at', 'task_id', 'task__name')
                       .annotate(total_seconds=Sum('total_seconds')).filter(time_entry_filters))

            total_seconds_summary = 0

            for entry in entries:
                entry['total_time'] = TimeEntry.total_seconds_to_time(entry['total_seconds'])
                total_seconds_summary += entry['total_seconds']

            profile_serializer = UserProfileSerializer()
            summary_dict.append({
                'user_details': profile_serializer.to_representation(instance=user.userprofile),
                'entries': entries,
                'total_time_summary': TimeEntry.total_seconds_to_time(total_seconds_summary),
            })

        return Response(summary_dict)