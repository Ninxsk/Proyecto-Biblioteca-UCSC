from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Taller
from .serializers import TallerCreateSerializer,TallerListSerializer,TallerDetailSerializer,TallerUpdateSerializer
from Asistencia.serializers import ListaAsistenciaSerializer,CrearAsistenteInternoSerializer,CrearAsistenciaExternaSerializer
from Asistencia.models import ListaAsistencia , ListaAsistenciaExterno,Asistente,AsistenteExterno



#Vista de talleres, listado de asistencia y creacion de asistentes (internos y externos)

class TallerViewSet(viewsets.ModelViewSet):
    queryset = Taller.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['nombre', 'fecha', 'modalidad', 'relator']
    search_fields = ['nombre', 'relator']

    def get_serializer_class(self):
        if self.action == 'listas_asistencia':
            return ListaAsistenciaSerializer
        elif self.action == 'list':
            return TallerListSerializer
        elif self.action == 'retrieve':
            return TallerDetailSerializer
        elif self.action in 'update':
            return TallerUpdateSerializer
        elif self.action == 'crear_asistente_interno':  
            return CrearAsistenteInternoSerializer
        elif self.action == 'crear_asistente_externo':
            return CrearAsistenciaExternaSerializer
        return TallerCreateSerializer

    @action(detail=True, methods=['get'], url_path='listas-asistencia')
    def listas_asistencia(self, request, pk=None):
        """
        Lista de asistencia (Internos y externos)
        """
        taller = self.get_object()

        internos = ListaAsistencia.objects.filter(taller=taller)
        externos = ListaAsistenciaExterno.objects.filter(taller=taller)

        todas_las_listas = list(internos) + list(externos)
        serializer = ListaAsistenciaSerializer(todas_las_listas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='crear-asistente-interno')
    def crear_asistente_interno(self, request, pk=None):
        """
        Crear asistente interno 
        """
        taller = self.get_object() 
        serializer = CrearAsistenteInternoSerializer(data=request.data, context={'taller': taller})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=True, methods=['post'], url_path='crear-asistente-externo')   
    def crear_asistente_externo(self,request,pk=None):
        """"
        Crear asistente externo
        """
        taller = self.get_object() 
        serializer = CrearAsistenciaExternaSerializer(data=request.data, context={'taller':taller})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['delete'], url_path='eliminar-asistente')
    def eliminar_asistente(self, request, pk=None):
        """
        Eliminar un asistente 
        """
        tipo = request.query_params.get('tipo')  
        identificador = request.query_params.get('identificador') 

        if not tipo or not identificador:
            return Response(
                {"error": "Se debe especificar el tipo ('interno' o 'externo') y el identificador (rut o num_documento)."},
                status=status.HTTP_400_BAD_REQUEST
            )

        taller = self.get_object()

        if tipo == 'interno':
            try:
                asistente = Asistente.objects.get(rut=identificador)
                asistencia = ListaAsistencia.objects.get(asistente=asistente, taller=taller)
                asistencia.delete()
                return Response({"message": "Asistente eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
            except Asistente.DoesNotExist:
                return Response(
                    {"error": "No se encontró un asistente con el rut especificado."},
                    status=status.HTTP_404_NOT_FOUND
                )


        elif tipo == 'externo':
            try:
                asistente_externo = AsistenteExterno.objects.get(num_documento=identificador)
                asistencia_externa = ListaAsistenciaExterno.objects.get(asistente_externo=asistente_externo, taller=taller)
                asistencia_externa.delete()
                return Response({"message": "Asistente eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
            except AsistenteExterno.DoesNotExist:
                return Response(
                    {"error": "No se encontró un asistente con el número de documento especificado."},
                    status=status.HTTP_404_NOT_FOUND
                )


        return Response({"error": "Tipo de asistente no válido. Debe ser 'interno' o 'externo'."}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['put'], url_path='editar-asistente')
    def editar_asistente(self, request, pk=None):
        """
        Editar la información de un asistente 
        """
        tipo = request.data.get('tipo')  
        identificador = request.data.get('identificador') 
        nuevos_datos = request.data.get('datos') 

        if not tipo or not identificador or not nuevos_datos:
            return Response(
                {"error": "Se debe especificar el tipo ('interno' o 'externo'), el identificador (rut o num_documento) y los datos a actualizar."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if tipo == 'interno':
            try:
                
                asistente = Asistente.objects.get(rut=identificador)

                
                asistente.nombre = nuevos_datos.get('nombre', asistente.nombre)
                asistente.rut = nuevos_datos.get('rut', asistente.rut)
                asistente.save()

                
                ListaAsistencia.objects.filter(asistente=asistente).update(
                    correo=nuevos_datos.get('correo', None)
                )

                return Response({"message": "Asistente actualizado exitosamente."}, status=status.HTTP_200_OK)

            except Asistente.DoesNotExist:
                return Response(
                    {"error": "No se encontró un asistente con el rut especificado."},
                    status=status.HTTP_404_NOT_FOUND
                )

        elif tipo == 'externo':
            try:
                
                asistente_externo = AsistenteExterno.objects.get(num_documento=identificador)

                asistente_externo.nombre = nuevos_datos.get('nombre', asistente_externo.nombre)
                asistente_externo.num_documento = nuevos_datos.get('num_documento', asistente_externo.num_documento)
                asistente_externo.save()

                
                ListaAsistenciaExterno.objects.filter(asistente_externo=asistente_externo).update(
                    correo=nuevos_datos.get('correo', None),
                    pais=nuevos_datos.get('pais', None),
                    institucion=nuevos_datos.get('institucion', None)
                )

                return Response({"message": "Asistente actualizado exitosamente."}, status=status.HTTP_200_OK)

            except AsistenteExterno.DoesNotExist:
                return Response(
                    {"error": "No se encontró un asistente con el número de documento especificado."},
                    status=status.HTTP_404_NOT_FOUND
                )

        return Response({"error": "Tipo de asistente no válido. Debe ser 'interno' o 'externo'."}, status=status.HTTP_400_BAD_REQUEST)


#Prueba para enrutar asistencia 
class AsistenciaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=ListaAsistencia.objects.all()
    serializer_class=ListaAsistenciaSerializer


