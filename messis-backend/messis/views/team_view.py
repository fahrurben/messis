from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from messis.models import CustomUser
from messis.serializers import UserSerializer


class TeamView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(companies__in=[self.request.company]).order_by('userprofile__firstname', 'userprofile__lastname')