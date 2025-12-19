import pytest
from django.urls import reverse
from fixtures import api_client, company_A, user_A
from messis.models import CustomUser


@pytest.mark.django_db
def test_invite_success(api_client):
    url = reverse('invite')
    data = {
        'email': 'test3@test.com',
        'password': 'secret123',
        'firstname': 'Elton',
        'lastname': 'John',
    }
    response = api_client.post(url, data)

    user_created = CustomUser.objects.get(email='test3@test.com')

    assert response.status_code == 200
    assert user_created.email == 'test3@test.com'
    assert user_created.username == 'test3@test.com'

    profile = user_created.userprofile
    assert profile.firstname == 'Elton'
    assert profile.lastname == 'John'