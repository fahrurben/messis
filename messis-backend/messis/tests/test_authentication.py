import pytest
from django.urls import reverse

from fixtures import company_A, user_A
from rest_framework.views import status

@pytest.mark.django_db
def test_authenticate_success(client, company_A, user_A):
    url = reverse('authenticate')

    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'subdomain': 'abc',
    }

    response = client.post(url, data)
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_authenticate_wrong_email_password(client, company_A, user_A):
    url = reverse('authenticate')

    data = {
        'email': 'test@test.com',
        'password': 'wrong',
        'subdomain': 'abc',
    }

    response = client.post(url, data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.data.get('message') == 'Wrong email or password'

@pytest.mark.django_db
def test_authenticate_wrong_subdomain(client, company_A, user_A):
    url = reverse('authenticate')

    data = {
        'email': 'test@test.com',
        'password': 'secret123',
        'subdomain': 'aaa',
    }

    response = client.post(url, data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.data.get('message') == 'Wrong subdomain entered'