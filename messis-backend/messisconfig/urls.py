"""
URL configuration for messisconfig project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


from messis.views import RegisterView
from messis.views import UserProfileView
from messis.views import ImageUploadView
from messis.views import ProjectView
from messis.views import InviteView
from messis.views import TeamView
from messis.views import TimeEntryView

from messis.views.auth_view import authenticate
from rest_framework.routers import SimpleRouter

router = SimpleRouter(trailing_slash=False)
router.register(r'user-profiles', UserProfileView, basename='userprofile')
router.register(r'projects', ProjectView, basename='project')
router.register(r'teams', TeamView, basename='team')
router.register(r'time-entries', TimeEntryView, basename='timeentry')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', RegisterView.as_view(), name='register'),
    path('api/authenticate', authenticate, name='authenticate'),
    path('api/media_upload', ImageUploadView.as_view(), name='media_upload'),
    path('api/invite', InviteView.as_view(), name='invite'),

    path('api/', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)