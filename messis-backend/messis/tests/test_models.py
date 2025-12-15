from messis.models import Company, CustomUser, UserProfile, Project, UserRole, Task, ProjectTeam
from datetime import date

from fixtures import company_A, user_A, project_A


def test_company_model(db):
    company = Company()
    company.name = 'ABC'
    company.timezone = 'Asia/Jakarta'
    company.status = Company.Status.TRIAL
    company.save()

    assert company.id is not None
    assert company.name == 'ABC'
    assert company.timezone == 'Asia/Jakarta'
    assert company.status == Company.Status.TRIAL


def test_user_model(db, company_A):
    user = CustomUser.objects.create_user('test@test.com', 'test@test.com', 'secret123', is_active=True)

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

    user_role = UserRole.objects.create(company=company_A, user=user, role=UserRole.Role.OWNER)

    assert user.id is not None
    assert user.username == 'test@test.com'
    assert user.email == 'test@test.com'
    assert user.is_active == True
    assert user.companies.all()[0] == company_A

    assert profile.user_id == user.id
    assert profile.firstname == 'John'
    assert profile.lastname == 'Doe'
    assert profile.title == 'Programmer'
    assert profile.capacity == 40.00
    assert profile.bill_rate == 10.00
    assert profile.cost_rate == 10.00
    assert profile.profile_photo == 'abc.jpg'


def test_project_model(db, company_A, user_A):
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

    project_team = ProjectTeam()
    project_team.project = project
    project_team.team = user_A
    project_team.is_admin = True
    project_team.save()

    assert project.company == company_A
    assert project.name == 'Project Acme'
    assert project.code == 'ACME'
    assert project.description == 'Lorem ipsum'
    assert project.start_date == date(2025, 1, 1)
    assert project.end_date == date(2025, 1, 31)
    assert project.is_billable == True
    assert project.is_active == True

    project_team = project.projectteam_set.first()
    assert project_team.team == user_A
    assert project_team.project == project
    assert project_team.is_admin == True

def test_task_model(db, project_A):
    task = Task()
    task.project = project_A
    task.name = 'Task A'
    task.is_billable = True
    task.save()

    assert task.project == project_A
    assert task.name == 'Task A'
    assert task.is_billable == True
