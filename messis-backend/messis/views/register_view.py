from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request

from messis.serializers.register_serializer import RegisterSerializer
from messis.serializers.user_serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> HttpResponse:
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            user_serializer = UserSerializer(instance=user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
