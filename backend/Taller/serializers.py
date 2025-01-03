from rest_framework import serializers
from .models import Taller , Jornada,SolicitudTalleres, Carrera


#Creacion taller
class TallerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = ['nombre', 'relator', 'fecha', 'inicio', 'fin', 'modalidad', 'solicitud', 'jornada', 'lugar']

    def validate(self, data):
        if data['inicio'] >= data['fin']:
            raise serializers.ValidationError("La hora de inicio debe ser anterior a la hora de término.")
        
        solicitud = data.get('solicitud')
        if solicitud is not None:
            if Taller.objects.filter(solicitud=solicitud).exists():
                raise serializers.ValidationError("Ya existe un taller asociado a esta solicitud.")

        return data
    
#Listar todos los talleres    
class TallerListSerializer(serializers.ModelSerializer):
    solicitud = serializers.SerializerMethodField()

    class Meta:
        model = Taller
        fields = ['id','nombre', 'fecha', 'solicitud']

    def get_solicitud(self, obj):
    
        return obj.solicitud.id if obj.solicitud else None




#Detalle de cada taller
class TallerDetailSerializer(serializers.ModelSerializer):
    solicitud = serializers.PrimaryKeyRelatedField(read_only=True) 
    carrera = serializers.SerializerMethodField()
    facultad = serializers.SerializerMethodField()
    jornada = serializers.SerializerMethodField()

    class Meta:
        model = Taller
        fields = [
            'id',
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
        representation['modalidad'] = "Presencial" if instance.modalidad else "Online"
        if representation.get('solicitud') is None:
            representation.pop('solicitud')
        if representation.get('jornada') is None:
            representation.pop('jornada')
        if representation.get('carrera') is None:
            representation.pop('carrera')
        if representation.get('facultad') is None:
            representation.pop('facultad')
            
        return representation



#Actualizacion taller
class TallerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Taller
        fields= ['fecha','inicio','fin','modalidad','relator']

#validar la hora



class JornadaCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Jornada
        fields= ['nombre', 'inicio', 'termino']
        
    def validate(self, data):
        if data ['inicio'] >= data ['termino']:
            raise serializers.ValidationError("La fecha de inicio debe ser anterior a la fecha de termino")



class JornadaListSerializer (serializers.ModelSerializer):       
    class Meta:
        model= Jornada
        fields= ['id_jornada','nombre', 'inicio', 'termino']
        

#Serealizadores para solicitud

class SolicitudSerealizer(serializers.ModelSerializer):
    
    class Meta:
        model= SolicitudTalleres
        fields= '__all__'
        
#Serealizador para carrera

class CarreraSerealizer (serializers.ModelSerializer):
    class Meta:
         model=Carrera
         fields= '__all__'