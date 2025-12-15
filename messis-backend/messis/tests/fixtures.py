import pytest

from datetime import date
from messis.models import Company, CustomUser, UserProfile, Project


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
    user = CustomUser.objects.create_user('test@test.com', 'test@test.com', 'secret123')
    user.first_name = 'John'
    user.last_name = 'Doe'
    user.company_set.add(company_A)
    user.save()

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
