import json

import pytest
from django.urls import reverse
from rest_framework.views import status

from fixtures import api_client, company_A, user_A, user_B, project_A, time_entry_A


@pytest.mark.django_db
def test_time_entry_create(api_client, company_A, user_A, project_A):
    task = project_A.tasks.first()

    url = reverse('timeentry-list')

    post_data = {
        'project_id': project_A.id,
        'task_id': task.id,
        'summary': 'Lorem ipsum',
        'entry_at': '2025-01-01',
        'total_seconds': 600,
    }

    response = api_client.post(url, data=json.dumps(post_data), content_type='application/json')
    data = response.data

    assert response.status_code == status.HTTP_201_CREATED
    assert data['id'] is not None
    assert data['project_id'] == project_A.id
    assert data['task_id'] == task.id
    assert data['summary'] == 'Lorem ipsum'
    assert data['entry_at'] == '2025-01-01'
    assert data['total_seconds'] == 600

@pytest.mark.django_db
def test_time_entry_update(api_client, company_A, user_A, project_A, time_entry_A):
    url = reverse('timeentry-detail', args=[time_entry_A.id])

    post_data = {
        'project_id': project_A.id,
        'task_id': project_A.tasks.first().id,
        'summary': 'Lorem ipsum1',
        'total_seconds': 1200,
    }

    response = api_client.patch(url, data=json.dumps(post_data), content_type='application/json')
    data = response.data

    assert response.status_code == status.HTTP_200_OK
    assert data['id'] is not None
    assert data['project_id'] == project_A.id
    assert data['task_id'] == project_A.tasks.first().id
    assert data['summary'] == 'Lorem ipsum1'
    assert data['total_seconds'] == 1200

@pytest.mark.django_db
def test_time_entry_get(api_client, company_A, user_A, project_A, time_entry_A):
    url = reverse('timeentry-detail', args=[time_entry_A.id])

    response = api_client.get(url)
    data = response.data

    assert response.status_code == status.HTTP_200_OK
    assert data['id'] is not None
    assert data['project_id'] == project_A.id
    assert data['task_id'] == project_A.tasks.first().id
    assert data['summary'] == 'Lorem Ipsum'
    assert data['total_seconds'] == 600

@pytest.mark.django_db
def test_time_entry_get_by_entry_date(api_client, company_A, user_A, project_A, time_entry_A):
    url = reverse('timeentry-get-entry-by-date')

    response = api_client.get(url, {'date': '2025-01-01'})
    data = response.data['results']
    assert response.status_code == status.HTTP_200_OK
    assert len(data) == 1