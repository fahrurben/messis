from rest_framework.views import Response, status

from rest_framework.decorators import api_view

from messis.serializers.login_serializer import LoginSerializer
from messis.services.auth_service import AuthService


@api_view(['POST'])
def authenticate(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        try:
            user = AuthService.authenticate(data.get('email'), data.get('password'), data.get('subdomain'))
            return Response('success', status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)