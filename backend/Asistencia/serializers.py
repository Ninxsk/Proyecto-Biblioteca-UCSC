from rest_framework import serializers
from .models import ListaAsistencia,ListaAsistenciaExterno,Asistente ,AsistenteExterno

# informacion de asistente interno
class AsistenteInternoDetalleSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='asistente.nombre', required=False)
    rut = serializers.CharField(source='asistente.rut', required=False)
    carrera = serializers.CharField(source='carrera.nombre', required=False)
    taller = serializers.CharField(source= 'taller.nombre',required=False)

    class Meta:
        model = ListaAsistencia
        fields = [
            'id_asiste',
            'taller',
            'nombre',
            'rut',
            'correo',
            'carrera',
            'comentario',
            'satisfaccion',
        ]



#informacion asistente externo
class AsistenteExternoDetalleSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='asistente_externo.nombre', required=False)
    num_documento = serializers.CharField(source='asistente_externo.num_documento', required=False)
    taller = serializers.CharField(source= 'taller.nombre',required=False)

    class Meta:
        model = ListaAsistenciaExterno
        fields = [
            'id',
            'taller',
            'nombre',
            'num_documento',
            'correo',
            'pais',
            'institucion',
            'comentario',
            'satisfaccion'
        ]


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
        fields = ['nombre', 'rut']

class CrearAsistenteInternoSerializer(serializers.ModelSerializer):
    asistente = AsistenteSerializer()

    class Meta:
        model = ListaAsistencia
        fields = ['asistente', 'correo', 'carrera', 'comentario', 'satisfaccion']

    def create(self, validated_data):
        asistente_data = validated_data.pop('asistente')
        taller = self.context.get('taller')

        try:
            asistente = Asistente.objects.get(rut=asistente_data['rut'])
        except Asistente.DoesNotExist:
            asistente = Asistente.objects.create(**asistente_data)
        else:
            if ListaAsistencia.objects.filter(asistente=asistente, taller=taller).exists():
                raise serializers.ValidationError(
                    {"error": "El asistente con rut {asistente.rut} ya está registrado en este taller."}
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
        representation['carrera'] = instance.carrera.nombre
        return representation

class AsistenteExternoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsistenteExterno
        fields = ['nombre', 'num_documento']

class CrearAsistenciaExternaSerializer(serializers.ModelSerializer):
    asistente_externo=AsistenteExternoSerializer()
    
    class Meta:
        model= ListaAsistenciaExterno
        fields=['asistente_externo','correo','pais','institucion','comentario','satisfaccion']
    
    def create (self ,validate_data):
        asistente_externo_data =validate_data.pop('asistente_externo')
        taller=self.context.get('taller')
                
        try:
            asistente_externo = AsistenteExterno.objects.get(num_documento=asistente_externo_data['num_documento'])
        except AsistenteExterno.DoesNotExist:
            asistente_externo = AsistenteExterno.objects.create(**asistente_externo_data)
        else:
            if ListaAsistenciaExterno.objects.filter(asistente_externo=asistente_externo,taller=taller).exists():
                raise serializers.ValidationError( {"error":"El asistente con numero de documento {asistente_externo.num_documento} ya está registrado en este taller"})
        
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
    
    
