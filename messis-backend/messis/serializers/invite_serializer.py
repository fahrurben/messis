from typing import Any, Dict

from django.contrib.auth.models import Group
from rest_framework import serializers

from messis.models import CustomUser, UserProfile, UserRole
import uuid


class InviteSerializer(serializers.Serializer[Any]):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=50)
    firstname = serializers.CharField(max_length=255)
    lastname = serializers.CharField(max_length=255)

    def validate_email(self, value):
        is_exists = CustomUser.objects.filter(email__iexact=value).exists()
        if is_exists:
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data: Dict[str, str]) -> CustomUser:
        company = self.context['company']

        invite_code = str(uuid.uuid4())

        user = CustomUser.objects.create_user(
            str(validated_data.get('email')),
            str(validated_data.get('email')),
            str(validated_data.get('password')),
            invite_code=invite_code,
            is_active=True
        )

        UserRole.objects.create(company=company, user=user, role=UserRole.Role.USER)
        company_owner_group, is_created = Group.objects.get_or_create(name=UserRole.Role.USER)
        user.groups.add(company_owner_group)

        profile = UserProfile()
        profile.user = user
        profile.firstname = str(validated_data.get('firstname'))
        profile.lastname = str(validated_data.get('lastname'))
        profile.save()
        return user
