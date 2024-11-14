from rest_framework import serializers
from .models import Taller

class TallerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = ['nombre', 'relator', 'fecha', 'inicio', 'fin', 'modalidad', 'solicitud', 'jornada', 'lugar']

    def validate(self, data):
        # Verifica que la hora de inicio sea anterior a la hora de fin
        if data['inicio'] >= data['fin']:
            raise serializers.ValidationError("La hora de inicio debe ser anterior a la hora de término.")
        
        # Verifica que no exista otro taller asociado a la misma solicitud
        if Taller.objects.filter(solicitud=data['solicitud']).exists():
            raise serializers.ValidationError("Ya existe un taller asociado a esta solicitud.")

        return data
class TallerListSerializer(serializers.ModelSerializer):
    solicitud = serializers.SerializerMethodField()

    class Meta:
        model = Taller
        fields = ['id','nombre', 'fecha', 'solicitud']

    def get_solicitud(self, obj):
        # Devuelve el ID de la solicitud si existe, de lo contrario None
        return obj.solicitud.id if obj.solicitud else None





class TallerDetailSerializer(serializers.ModelSerializer):
    solicitud = serializers.PrimaryKeyRelatedField(read_only=True)
    carrera = serializers.SerializerMethodField()
    facultad = serializers.SerializerMethodField()
    jornada = serializers.SerializerMethodField()

    class Meta:
        model = Taller
        fields = [
            'nombre', 
            'solicitud', 
            'carrera', 
            'facultad', 
            'fecha', 
            'relator', 
            'inicio', 
            'fin', 
            'modalidad', 
            'jornada', 
            'lugar'
        ]

    def get_carrera(self, obj):
        if obj.solicitud and obj.solicitud.ua:
            return obj.solicitud.ua.nombre
        return None

    def get_facultad(self, obj):
        if obj.solicitud and obj.solicitud.ua:
            return obj.solicitud.ua.facultad
        return None

    def get_jornada(self, obj):
        if obj.jornada:
            return obj.jornada.nombre
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Convertir modalidad a "Presencial" o "Online"
        representation['modalidad'] = "Presencial" if instance.modalidad else "Online"
        
        # Elimina los campos `solicitud`, `jornada`, `carrera` y `facultad` si no están presentes
        if representation.get('solicitud') is None:
            representation.pop('solicitud')
        if representation.get('jornada') is None:
            representation.pop('jornada')
        if representation.get('carrera') is None:
            representation.pop('carrera')
        if representation.get('facultad') is None:
            representation.pop('facultad')
            
        return representation


class TallerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Taller
        fields= ['fecha','inicio','fin','modalidad','relator']
        