from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions

from messis.serializers import ProjectSerializer
from messis.models import Project


class ProjectView(viewsets.ModelViewSet[Project]):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    permission_classes = [DjangoModelPermissions]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user, 'company': self.request.company})
        return context

    def get_queryset(self):
        return Project.objects.filter(company=self.request.company)

    # Todo: Implement get object if user can access other company projects
    # def get_object(self):
