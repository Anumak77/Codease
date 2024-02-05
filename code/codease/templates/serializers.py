from rest_framework import serializers
from .models import *

class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Element
        fields=('id','name','html')