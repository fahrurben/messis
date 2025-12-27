from typing import Dict, Any

from messis.models import Company, CustomUser, UserProfile, UserRole
from django.contrib.auth.models import Group
from django.utils.text import slugify


class CompanyService:

    def register(self, validated_data: Dict[Any, Any]) -> CustomUser:
        company = Company()
        company.name = str(validated_data.get('company_name'))
        company.timezone = str(validated_data.get('timezone'))
        company.status = Company.Status.TRIAL
        company.subdomain = slugify(company.name)
        company.save()

        user = CustomUser.objects.create_user(
            str(validated_data.get('email')),
            validated_data.get('email'),
            validated_data.get('password'),
            is_active=True
        )

        UserRole.objects.create(company=company, user=user, role=UserRole.Role.OWNER)
        company_owner_group = Group.objects.get(name=UserRole.Role.OWNER)
        user.groups.add(company_owner_group)

        profile = UserProfile()
        profile.user = user
        profile.firstname = str(validated_data.get('firstname'))
        profile.lastname = str(validated_data.get('lastname'))
        profile.save()

        return user
