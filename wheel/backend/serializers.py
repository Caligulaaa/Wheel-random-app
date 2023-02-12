from rest_framework import serializers
from .models import *
from .randomwheel import *

class CombackBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombackBox
        fields = '__all__'

class GetCaseSerializer(serializers.Serializer):
    name = serializers.CharField()
    # otp = serializers.CharField()

class UserCaseSerializers(serializers.ModelSerializer):
    # product_rating = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    users_case = serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = User
        fields = '__all__'

    def __init__(self,*agrs,**kwargs):
        super(UserCaseSerializers,self).__init__(*agrs,**kwargs)
        self.Meta.depth = 2