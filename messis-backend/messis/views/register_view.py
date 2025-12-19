from rest_framework.views import APIView, Response, status

from messis.serializers.register_serializer import RegisterSerializer
from messis.serializers.user_serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            user_serializer = UserSerializer(instance=user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
