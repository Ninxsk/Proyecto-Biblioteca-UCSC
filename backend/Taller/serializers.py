from rest_framework import serializers
from .models import Taller

class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = ['id', 'nombre', 'relator', 'fecha', 'inicio', 'fin', 'modalidad', 'solicitud', 'jornada', 'lugar']
       