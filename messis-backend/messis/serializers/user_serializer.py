from rest_framework import serializers

from messis.models import CustomUser
from messis.serializers import UserProfileSerializer


class UserSerializer(serializers.ModelSerializer[CustomUser]):
    password = serializers.CharField(min_length=6, max_length=100, write_only=True)
    userprofile = UserProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'userprofile', )