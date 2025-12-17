import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from fixtures import company_A, user_A


@pytest.mark.django_db
def test_update_profile_success(company_A, user_A):
    print(user_A.groups.first())
    url = reverse('userprofile-detail', args=[user_A.id])
    data = {
        'firstname': 'John1',
        'lastname': 'Doe1',
        'title': 'Programmer',
        'capacity': 20.00,
        'bill_rate': 10.00,
        'cost_rate': 10.00,
    }
    refresh = RefreshToken.for_user(user_A)
    refresh['company_id'] = user_A.companies.first().id
    access_token = refresh.access_token

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    response = client.patch(url, data)
    data = response.data

    assert response.status_code == 200
    assert data.get('firstname') == 'John1'
    assert data.get('lastname') == 'Doe1'
    assert data.get('title') == 'Programmer'
    assert data.get('capacity') == 20.00
    assert data.get('bill_rate') == 10.00
    assert data.get('cost_rate') == 10.00

