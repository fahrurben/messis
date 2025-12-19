from rest_framework.views import APIView, Response, status

from rest_framework.permissions import IsAuthenticated
from messis.permissions import CompanyOwnerPermission
from messis.serializers import InviteSerializer, UserSerializer


class InviteView(APIView):
    permission_classes = [IsAuthenticated, CompanyOwnerPermission]

    def post(self, request):
        user = request.user
        company = request.company
        serializer = InviteSerializer(data=request.data, context={'user': user, 'company': company})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            user_serializer = UserSerializer(instance=user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)