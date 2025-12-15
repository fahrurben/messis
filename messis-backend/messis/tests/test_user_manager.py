from messis.models import CustomUser

from fixtures import company_A, user_A


def test_get_users_of_company(db, company_A, user_A):
    users = CustomUser.custom_objects.get_users_of_company(company_A)
    assert len(users) == 1
    assert users[0] == user_A


def test_get_owner_of_company(db, company_A, user_A):
    user = CustomUser.custom_objects.get_owner_user(company_A)
    assert user == user_A
