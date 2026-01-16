from rest_framework import serializers

from messis.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer[UserProfile]):

    class Meta:
        model = UserProfile
        fields = ["firstname", "lastname", "title", "capacity", "bill_rate", "cost_rate", "profile_photo", "fullname"]