from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from messis.models import TimeEntry
from messis.serializers import TimeEntrySerializer
from messis.permissions import OwnEntryPermission


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
