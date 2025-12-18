import pytest

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date
from messis.models import Company, CustomUser, UserProfile, Project, UserRole
from django.contrib.auth.models import Group


@pytest.fixture
def company_A(db):
    company = Company()
    company.name = 'ABC'
    company.subdomain = 'abc'
    company.timezone = 'Asia/Jakarta'
    company.status = Company.Status.TRIAL
    company.save()

    return company


@pytest.fixture
def user_A(db, company_A):
    user = CustomUser.objects.create_user('admin@test.com', 'admin@test.com', 'secret123')
    user.first_name = 'John'
    user.last_name = 'Doe'
    user.save()

    UserRole.objects.create(company=company_A, user=user, role=UserRole.Role.OWNER)
    company_owner_group = Group.objects.get(name=UserRole.Role.OWNER)
    user.groups.add(company_owner_group)

    profile = UserProfile()
    profile.user = user
    profile.firstname = 'John'
    profile.lastname = 'Doe'
    profile.title = 'Programmer'
    profile.capacity = 40.00
    profile.bill_rate = 10.00
    profile.cost_rate = 10.00
    profile.profile_photo = 'abc.jpg'
    profile.save()

    return user

@pytest.fixture
def user_B(db, company_A):
    user = CustomUser.objects.create_user('user1@test.com', 'user1@test.com', 'secret123')
    user.first_name = 'Timmy'
    user.last_name = 'Moe'
    user.save()

    UserRole.objects.create(company=company_A, user=user, role=UserRole.Role.USER)

    profile = UserProfile()
    profile.user = user
    profile.firstname = 'Timmy'
    profile.lastname = 'Moe'
    profile.title = 'Programmer'
    profile.capacity = 40.00
    profile.bill_rate = 10.00
    profile.cost_rate = 10.00
    profile.profile_photo = 'abc.jpg'
    profile.save()

    return user

@pytest.fixture
def project_A(db, company_A):
    project = Project()
    project.company = company_A
    project.name = 'Project Acme'
    project.code = 'ACME'
    project.description = 'Lorem ipsum'
    project.start_date = date(2025, 1, 1)
    project.end_date = date(2025, 1, 31)
    project.is_billable = True
    project.is_active = True
    project.save()

    return project


@pytest.fixture
def api_client(user_A, company_A):
    refresh = RefreshToken.for_user(user_A)
    refresh['company_id'] = user_A.companies.first().id
    access_token = refresh.access_token
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    return client
