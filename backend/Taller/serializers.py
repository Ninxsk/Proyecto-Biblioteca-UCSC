from rest_framework import serializers
from .models import Taller , Jornada,SolicitudTalleres, Carrera,ListaAsistencia,ListaAsistenciaExterno,Asistente ,AsistenteExterno


#Creacion taller
class TallerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = ['nombre', 'relator','estado','fecha', 'inicio', 'fin', 'modalidad', 'solicitud', 'jornada', 'lugar','observaciones']

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
            'lugar',
            'observaciones',
            'estado'
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

        return data

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
        
# informacion de asistente interno
class AsistenteInternoDetalleSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='asistente.nombre', required=False)
    rut = serializers.CharField(source='asistente.rut', required=False)
    carrera = serializers.CharField(source='carrera.nombre', required=False)
    taller = serializers.CharField(source= 'taller.nombre',required=False)
    categoria=serializers.CharField(source='carrera.categoria',required=False)

    class Meta:
        model = ListaAsistencia
        fields = [
            'id_asiste','taller','nombre','rut','tipo','preinscrito','correo',
            'carrera','categoria','comentario','satisfaccion']

#informacion asistente externo
class AsistenteExternoDetalleSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='asistente_externo.nombre', required=False)
    num_documento = serializers.CharField(source='asistente_externo.num_documento', required=False)
    
    class Meta:
        model = ListaAsistenciaExterno
        fields = ['id','taller','nombre','num_documento','tipo','correo','pais','institucion',
        'comentario','satisfaccion','preinscrito']

#Lista de asistencia
class ListaAsistenciaSerializer(serializers.Serializer):
    def to_representation(self, instance):
        if isinstance(instance, ListaAsistencia):  
            serializer = AsistenteInternoDetalleSerializer(instance)
        elif isinstance(instance, ListaAsistenciaExterno):  
            serializer = AsistenteExternoDetalleSerializer(instance)
        return serializer.data

class AsistenteSerializer(serializers.ModelSerializer):
    rut = serializers.IntegerField()

    class Meta:
        model = Asistente
        fields = ['nombre','rut']

class CrearAsistenteInternoSerializer(serializers.ModelSerializer):
    asistente = AsistenteSerializer()

 

    class Meta:
        model = ListaAsistencia
        fields = ['asistente','tipo', 'correo', 'carrera', 'comentario', 'satisfaccion','preinscrito']
        
        
    def validate(self, data):
        if data['tipo'] == 'estudiante' and not data.get('carrera'):
            raise serializers.ValidationError(
            {"carrera": "Debe seleccionar una carrera si el tipo es 'estudiante'."}
        )
        if data['tipo'] != 'estudiante':
            data['carrera'] = None
            

        return data

        
    def create(self, validated_data):
        asistente_data = validated_data.pop('asistente')
        taller = self.context.get('taller')

        # Verificar duplicado entre asistentes internos y externos
        if AsistenteExterno.objects.filter(num_documento=asistente_data['rut']).exists():
            raise serializers.ValidationError(
                {"error": "El RUT o número de documento ya se encuentra asociado a este taller."}
            )

        try:
            asistente = Asistente.objects.get(rut=asistente_data['rut'])
        except Asistente.DoesNotExist:
            asistente = Asistente.objects.create(**asistente_data)
        else:
            if ListaAsistencia.objects.filter(asistente=asistente, taller=taller).exists():
                raise serializers.ValidationError(
                    {"error": f"El asistente con rut {asistente.rut} ya está registrado en este taller."}
                )
        validated_data['asistente'] = asistente
        validated_data['taller'] = taller
        
        return ListaAsistencia.objects.create(**validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['asistente'] = {
            'nombre': instance.asistente.nombre,
            'rut': instance.asistente.rut
        }
        if instance.carrera:
            representation['carrera'] = instance.carrera.nombre
        else:
            representation['carrera'] = None
        return representation

class AsistenteExternoSerializer(serializers.ModelSerializer):
    num_documento=serializers.IntegerField()
    class Meta:
        model = AsistenteExterno
        fields = ['nombre','num_documento']

class CrearAsistenciaExternaSerializer(serializers.ModelSerializer):
    asistente_externo=AsistenteExternoSerializer()
    
    class Meta:
        model= ListaAsistenciaExterno
        fields=['asistente_externo','tipo','correo','pais','institucion','comentario','satisfaccion','preinscrito']
    
    def create (self ,validate_data):
        asistente_externo_data =validate_data.pop('asistente_externo')
        taller=self.context.get('taller')
                
        try:
            asistente_externo = AsistenteExterno.objects.get(num_documento=asistente_externo_data['num_documento'])
        except AsistenteExterno.DoesNotExist:
            asistente_externo = AsistenteExterno.objects.create(**asistente_externo_data)
        else:
            if ListaAsistenciaExterno.objects.filter(asistente_externo=asistente_externo,taller=taller).exists():
                raise serializers.ValidationError( {"error":f"El asistente con numero de documento {asistente_externo.num_documento} ya está registrado en este taller"})
        
        validate_data['asistente_externo']= asistente_externo
        validate_data['taller']=taller
        
        return ListaAsistenciaExterno.objects.create(**validate_data)
    
    def to_representation(self,instance):
        externo= super().to_representation(instance)
        externo ['asistente_externo'] = {
            'nombre': instance.asistente_externo.nombre,
            'num_documento':instance.asistente_externo.num_documento
        }
        return externo