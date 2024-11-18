from rest_framework import serializers
from .models import ListaAsistencia , Asistente


class ListaAsistenciaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ListaAsistencia
        fields = ['id_asiste','carrera','asistente','taller','correo','comentario', 'satisfaccion']
        

class AsisteSerializaer(serializers.ModelSerializer):
    
    class Meta:
        model = Asistente
        fields =['id','rut','nombre']


