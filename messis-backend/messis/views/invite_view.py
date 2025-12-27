from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from messis.permissions import CompanyOwnerPermission
from messis.serializers import InviteSerializer, UserSerializer


class InviteView(APIView):
    permission_classes = [IsAuthenticated, CompanyOwnerPermission]

    def post(self, request: Request) -> HttpResponse:
        user = request.user
        company = request.company
        serializer = InviteSerializer(data=request.data, context={'user': user, 'company': company})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            user_serializer = UserSerializer(instance=user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)