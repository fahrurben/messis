import json

import pytest
from datetime import date
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import status

from fixtures import api_client, company_A, user_A, user_B


@pytest.mark.django_db
def test_project_create_success(api_client, company_A, user_A, user_B):
    url = reverse('project-list')
    tasks = [{'name': 'Design', 'is_billable': True}]
    projectteam_set = [{'team_id': user_B.id, 'is_admin': False}]

    post_data = {
        'name': 'General',
        'code': 'GEN',
        'start_date': "2025-01-01",
        'end_date': "2025-02-01",
        'description': 'Lorem ipsum',
        'is_billable': True,
        'tasks': tasks,
        'projectteam_set': projectteam_set,
        'is_active': True
    }

    response = api_client.post(url, data=json.dumps(post_data), content_type='application/json')
    data = response.data

    assert response.status_code == status.HTTP_201_CREATED
    assert data['id'] is not None
    assert data['name'] == 'General'
    assert data['code'] == 'GEN'
    assert data['start_date'] == "2025-01-01"
    assert data['end_date'] == "2025-02-01"
    assert data['description'] == 'Lorem ipsum'
    assert data['is_billable'] is True
    assert data['is_active'] is True

    tasks = data['tasks']
    task = tasks[0]
    assert task['id'] is not None
    assert task['name'] == 'Design'
    assert task['is_billable'] == True

    projectteam_set = data['projectteam_set']
    project_team = projectteam_set[0]
    assert project_team['id'] is not None
    assert project_team['team_id'] == user_B.id
    assert project_team['project_id'] == data['id']
    assert project_team['is_admin'] is False

