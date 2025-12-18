from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..models.upload_image_model import UploadImageModel
from ..serializers.upload_image_serializer import UploadImageSerializer


class ImageUploadView(APIView):
    # authentication_classes = [Authenticated]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        qs_serializer = UploadImageSerializer(data=request.data, context={'request': request})
        if qs_serializer.is_valid():
            qs_serializer.save()
            return Response(qs_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': qs_serializer.errors,
                'data': None
            },status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        qs = UploadImageModel.objects.all()
        qs_serializer = UploadImageSerializer(qs, many=True)
        return Response(qs_serializer.data, status=status.HTTP_200_OK)