from django.urls import reverse
from rest_framework_simplejwt import authentication

from messis.models import Company


class CompanyCheckMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        self.exempt_urls = [
            reverse('register'),
            reverse('token_obtain_pair'),
            reverse('token_refresh'),
        ]

    def __call__(self, request):
        if request.path in self.exempt_urls:
            return self.get_response(request)

        user, token = authentication.JWTAuthentication().authenticate(request)
        company_id = int(token.claims.get('company_id'))

        company = Company.objects.get(pk=company_id)
        request.company = company

        return self.get_response(request)
