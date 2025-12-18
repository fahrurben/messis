from django.shortcuts import get_object_or_404
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

    def get_object(self):
        """
        Overrides the default get_object method to retrieve an object
        based on custom criteria or URL kwargs.
        """
        # Example 2: Simple custom field lookup (e.g., using 'slug' as defined in lookup_field)
        # lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        # filter_kwargs = {lookup_url_kwarg: self.kwargs[lookup_url_kwarg]}
        user_id = int(self.kwargs[self.lookup_url_kwarg])

        # Filter the base queryset using the custom criteria
        queryset = self.get_queryset()
        queryset.filter(user__id=user_id)
        obj = get_object_or_404(queryset)

        # Manually check object-level permissions, which is crucial if you override get_object
        self.check_object_permissions(self.request, obj)
        return obj
