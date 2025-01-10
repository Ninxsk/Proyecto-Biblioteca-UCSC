from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets, filters,serializers
from django_filters.rest_framework import DjangoFilterBackend
from .models import Taller , Jornada,SolicitudTalleres,Carrera,ListaAsistencia , ListaAsistenciaExterno,Asistente,AsistenteExterno
from .serializers import TallerCreateSerializer,TallerListSerializer,TallerDetailSerializer,TallerUpdateSerializer, JornadaCreateSerializer , JornadaListSerializer, SolicitudSerealizer,CarreraSerealizer,ListaAsistenciaSerializer,CrearAsistenteInternoSerializer,CrearAsistenciaExternaSerializer,AsistenteExternoDetalleSerializer,AsistenteInternoDetalleSerializer


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
        tipo = request.data.get('tipo')  
        identificador = request.data.get('identificador')  
        nuevos_datos = request.data.get('datos')  

        if not tipo or not identificador or not nuevos_datos:
            return Response(
                {"error": "Se debe especificar el tipo ('interno' o 'externo'), el identificador y los datos a actualizar."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if tipo == 'interno':
            try:
                asistente = Asistente.objects.get(rut=identificador)
                ListaAsistencia.objects.filter(asistente=asistente).update(
                    correo=nuevos_datos.get('correo', None),
                    comentario=nuevos_datos.get('comentario', None),
                    satisfaccion=nuevos_datos.get('satisfaccion', None)
                )
                return Response({"message": "Asistente actualizado exitosamente."}, status=status.HTTP_200_OK)
            except Asistente.DoesNotExist:
                return Response({"error": "No se encontró un asistente con el rut especificado."}, status=status.HTTP_404_NOT_FOUND)

        elif tipo == 'externo':
            try:
                asistente_externo = AsistenteExterno.objects.get(num_documento=identificador)
                ListaAsistenciaExterno.objects.filter(asistente_externo=asistente_externo).update(
                    correo=nuevos_datos.get('correo', None),
                    comentario=nuevos_datos.get('comentario', None),
                    satisfaccion=nuevos_datos.get('satisfaccion', None),
                    pais=nuevos_datos.get('pais', None),
                    institucion=nuevos_datos.get('institucion', None)
                )
                return Response({"message": "Asistente actualizado exitosamente."}, status=status.HTTP_200_OK)
            except AsistenteExterno.DoesNotExist:
                return Response({"error": "No se encontró un asistente con el número de documento especificado."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Tipo de asistente no válido."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='detalle-asistente')
    def detalle_asistente(self, request, pk=None):
        """
        Obtener detalle de un asistente (interno o externo) basado en su tipo y identificador.
        """
        tipo = request.query_params.get('tipo')  
        identificador = request.query_params.get('identificador') 

        if not tipo or not identificador:
            return Response(
                {"error": "Se debe especificar el tipo ('interno' o 'externo') y el identificador ('rut' o 'num_documento')."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if tipo == 'interno':
                asistente = Asistente.objects.get(rut=identificador)
                asistencia = ListaAsistencia.objects.get(asistente=asistente, taller=self.get_object())
                serializer = AsistenteInternoDetalleSerializer(asistencia)
            elif tipo == 'externo':
                asistente_externo = AsistenteExterno.objects.get(num_documento=identificador)
                asistencia = ListaAsistenciaExterno.objects.get(asistente_externo=asistente_externo, taller=self.get_object())
                serializer = AsistenteExternoDetalleSerializer(asistencia)
            else:
                return Response({"error": "Tipo de asistente no válido. Debe ser 'interno' o 'externo'."},
                                status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except (Asistente.DoesNotExist, AsistenteExterno.DoesNotExist):
            return Response({"error": "No se encontró un asistente con el identificador especificado."},
                            status=status.HTTP_404_NOT_FOUND)
        except (ListaAsistencia.DoesNotExist, ListaAsistenciaExterno.DoesNotExist):
            return Response({"error": "No se encontró una asistencia asociada a este asistente en el taller."},
                            status=status.HTTP_404_NOT_FOUND)
            
    
#Prueba para enrutar asistencia 
#class AsistenciaViewSet(viewsets.ReadOnlyModelViewSet):
#    queryset=ListaAsistencia.objects.all()
#    serializer_class=ListaAsistenciaSerializer

class JornadaViewSet(viewsets.ModelViewSet):
    queryset = Jornada.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return JornadaListSerializer
        return JornadaCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(
                {"detalle": e.detail}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detalle": "Ocurrió un error inesperado al crear la jornada."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    @action(detail=True, methods=['get'])
    def talleres(self, request, pk=None):
        try:
            jornada = self.get_object()
            talleres = jornada.taller_set.all()  
            serializer = TallerListSerializer(talleres, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Jornada.DoesNotExist:
            return Response(
                {"detalle": "Jornada no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detalle": "Ocurrió un error inesperado al listar los talleres."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class SolicitudViewSet (viewsets.ReadOnlyModelViewSet):
    serializer_class = SolicitudSerealizer
    queryset = SolicitudTalleres.objects.all()
    
    
class CarreraViewSet (viewsets.ReadOnlyModelViewSet):
    serializer_class = CarreraSerealizer
    queryset = Carrera.objects.all()
    
