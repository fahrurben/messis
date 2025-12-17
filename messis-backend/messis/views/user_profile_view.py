from rest_framework import mixins, viewsets
from rest_framework.permissions import DjangoModelPermissions

from messis.models import UserProfile
from messis.serializers import UserProfileSerializer


class UserProfileView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [DjangoModelPermissions]
