import pytest
from django.urls import reverse
from fixtures import company_A, user_A
from messis.models import CustomUser

from datetime import date

@pytest.mark.django_db
def test_register_user_success(client):
    url = reverse('register')
    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'firstname': 'John',
        'lastname': 'Doe',
        'company_name': 'Acme',
        'timezone': 'Asia/Jakarta',
    }
    response = client.post(url, data)

    user_created = CustomUser.objects.get(email='test@test.com')

    assert response.status_code == 200
    assert user_created.email == 'test@test.com'
    assert user_created.username == 'test@test.com'

    company = user_created.companies.first()
    assert company is not None
    assert company.name == 'Acme'
    assert company.timezone == 'Asia/Jakarta'

    profile = user_created.userprofile
    assert profile.firstname == 'John'
    assert profile.lastname == 'Doe'

@pytest.mark.django_db
def test_register_user_existing_company(client, company_A):
    url = reverse('register')
    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'firstname': 'John',
        'lastname': 'Doe',
        'company_name': 'ABC',
        'timezone': 'Asia/Jakarta',
    }
    response = client.post(url, data)
    assert response.status_code == 400

@pytest.mark.django_db
def test_register_user_existing_email(client, user_A):
    url = reverse('register')
    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'firstname': 'John',
        'lastname': 'Doe',
        'company_name': 'ABC',
        'timezone': 'Asia/Jakarta',
    }
    response = client.post(url, data)
    assert response.status_code == 400