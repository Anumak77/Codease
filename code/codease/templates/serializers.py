from rest_framework import serializers
from .models import *

class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Element
        fields=('id','name','html')

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Template
        fields=('id','name','elements')

class TemplateElementSerializer(serializers.ModelSerializer):
    class Meta:
        model=TemplateElement
        fields=('id','html')

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=('email','is_active', 'is_staff', 'name', 'otp')
