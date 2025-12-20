import pytest

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date
from messis.models import Company, CustomUser, UserProfile, Project, UserRole, Task, ProjectTeam, TimeEntry
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
def user_C(db, company_A):
    user = CustomUser.objects.create_user('user2@test.com', 'user2@test.com', 'secret123')
    user.first_name = 'Danny'
    user.last_name = 'Darko'
    user.save()

    UserRole.objects.create(company=company_A, user=user, role=UserRole.Role.USER)

    profile = UserProfile()
    profile.user = user
    profile.firstname = 'Danny'
    profile.lastname = 'Darko'
    profile.title = 'Programmer'
    profile.capacity = 40.00
    profile.bill_rate = 10.00
    profile.cost_rate = 10.00
    profile.profile_photo = 'abc.jpg'
    profile.save()

    return user

@pytest.fixture
def project_A(db, company_A, user_B):
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

    Task.objects.create(project=project, name='Design', is_billable=True)

    ProjectTeam.objects.create(project=project, team=user_B, is_admin=False)

    return project

@pytest.fixture
def time_entry_A(db, company_A, user_A, user_B, project_A):
    time_entry = TimeEntry()
    time_entry.project = project_A
    time_entry.task = project_A.tasks.first()
    time_entry.team = user_A
    time_entry.summary = 'Lorem Ipsum'
    time_entry.total_seconds = 600
    time_entry.entry_at = date(2025, 1, 1)
    time_entry.save()

    return time_entry

@pytest.fixture
def api_client(user_A, company_A):
    refresh = RefreshToken.for_user(user_A)
    refresh['company_id'] = user_A.companies.first().id
    access_token = refresh.access_token
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    return client
