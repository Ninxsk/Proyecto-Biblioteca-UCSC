from rest_framework import serializers
from .models import ListaAsistencia


class ListaAsistenciaSerializer(serializers.ModelSerializer):
    
    class meta:
        model = ListaAsistencia
        fields = ['id','carrera','asistente','taller','correo','comentario', 'satisfaccion']