import json

import pytest
from django.urls import reverse
from rest_framework.views import status

from fixtures import api_client, company_A, user_A, user_B


@pytest.mark.django_db
def test_team_list(api_client, company_A, user_A, user_B):
    url = reverse('team-list')

    response = api_client.get(url)

    data = response.data
    teams = data['results']
    assert response.status_code == status.HTTP_200_OK
    assert len(teams) == 2

@pytest.mark.django_db
def test_team_retrieve(api_client, company_A, user_A, user_B):
    url = reverse('team-detail', args=[user_A.id])

    response = api_client.get(url)

    data = response.data
    assert response.status_code == status.HTTP_200_OK
    assert data['email'] == 'admin@test.com'
    assert data['username'] == 'admin@test.com'