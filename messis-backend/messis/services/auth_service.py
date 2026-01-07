from typing import Dict

from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

from messis.models import CustomUser, Company


class AuthService:

    @staticmethod
    def authenticate(email: str, password: str, subdomain: str) -> Dict[str, str]:
        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            raise Exception('Wrong email or password')

        if not check_password(password, user.password):
            raise Exception('Wrong email or password')

        company = Company.objects.filter(subdomain=subdomain).first()

        if company is None:
            raise Exception('Wrong subdomain entered')

        refresh = RefreshToken.for_user(user)
        refresh['company_id'] = company.id
        refresh['user_id'] = user.id

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
