from messis.models import Company, UserRole
from messis.services import CompanyService


def test_register(db):
    company_service = CompanyService()

    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'firstname': 'John',
        'lastname': 'Doe',
        'company_name': 'Acme',
        'timezone': 'Asia/Jakarta',
    }

    user = company_service.register(data)

    assert user.id is not None
    assert user.username == 'test@test.com'
    assert user.companies.first().name == 'Acme'
    assert user.companies.first().timezone == 'Asia/Jakarta'
    assert user.groups.first().name == UserRole.Role.OWNER
    user_profile = user.userprofile
    assert user_profile.firstname == 'John'
    assert user_profile.lastname == 'Doe'