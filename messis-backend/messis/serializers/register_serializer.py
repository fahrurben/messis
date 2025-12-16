from rest_framework import serializers

from messis.models import Company, CustomUser, UserProfile, UserRole
from messis.services import CompanyService


class RegisterSerializer(serializers.Serializer):
    company_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    firstname = serializers.CharField(max_length=255)
    lastname = serializers.CharField(max_length=255)
    timezone = serializers.CharField(max_length=50)

    def validate_company_name(self, value):
        is_exists = Company.objects.filter(name__iexact=value).exists()
        if is_exists:
            raise serializers.ValidationError("Company name already registered")
        return value

    def validate_email(self, value):
        is_exists = CustomUser.objects.filter(email__iexact=value).exists()
        if is_exists:
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        company_service = CompanyService()
        user = company_service.register(validated_data)
        return user
