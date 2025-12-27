from django.urls import reverse
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.tokens import AccessToken

from django.http import HttpResponseForbidden

from messis.models import Company


class CompanyCheckMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        self.exempt_urls = [
            reverse('register'),
            reverse('authenticate'),
        ]

    def __call__(self, request):
        if request.path in self.exempt_urls:
            return self.get_response(request)

        user, token = authentication.JWTAuthentication().authenticate(request)

        company = Company.objects.get(pk=int(token.payload.get('company_id')))
        request.company = company
        request.user = user

        if not request.user.is_authenticated:
            return HttpResponseForbidden("You are not authorized to access this resource.")

        return self.get_response(request)
