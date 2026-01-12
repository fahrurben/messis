from rest_framework.decorators import api_view
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny
from messis.serializers.login_serializer import LoginSerializer
from messis.services.auth_service import AuthService



@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate(request: Request) -> HttpResponse:
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        try:
            token_dict = AuthService.authenticate(data.get('email'), data.get('password'), data.get('subdomain'))
            return Response(token_dict, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
