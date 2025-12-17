from rest_framework.decorators import api_view
from rest_framework.views import Response, status

from messis.serializers.login_serializer import LoginSerializer
from messis.services.auth_service import AuthService


@api_view(['POST'])
def authenticate(request):
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
