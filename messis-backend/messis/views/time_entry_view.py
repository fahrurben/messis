from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.views import status


from messis.models import TimeEntry
from messis.serializers import TimeEntrySerializer
from messis.permissions import OwnEntryPermission

from datetime import date
from django.utils.dateparse import parse_date
from rest_framework.response import Response

class TimeEntryView(viewsets.ModelViewSet):
    serializer_class = TimeEntrySerializer
    queryset = TimeEntry.objects.all()
    permission_classes = [IsAuthenticated, OwnEntryPermission]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user, 'company': self.request.company})
        return context

    def get_queryset(self):
        return TimeEntry.objects.filter(project__company=self.request.company).order_by('id')

    @action(detail=False, methods=['get'])
    def get_entry_by_date(self, request):
        date_param = request.query_params.get('date')
        entry_at = parse_date(date_param) if date_param is not None else date.today()

        qs = TimeEntry.objects.filter(team=self.request.user, project__company=self.request.company, entry_at=entry_at).order_by('id')
        serializer = TimeEntrySerializer(qs, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
