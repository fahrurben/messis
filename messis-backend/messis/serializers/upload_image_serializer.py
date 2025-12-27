from rest_framework import serializers
from ..models.upload_image_model import UploadImageModel


class UploadImageSerializer(serializers.ModelSerializer[UploadImageModel]):
    class Meta:
        model = UploadImageModel
        fields = '__all__'
