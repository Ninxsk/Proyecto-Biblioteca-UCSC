from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Taller , Jornada,SolicitudTalleres,Carrera
from .serializers import TallerCreateSerializer,TallerListSerializer,TallerDetailSerializer,TallerUpdateSerializer, JornadaCreateSerializer , JornadaListSerializer, SolicitudSerealizer,CarreraSerealizer
from Asistencia.models import ListaAsistencia, ListaAsistenciaExterno
from Asistencia.serializers import ListaAsistenciaSerializer,CrearAsistenteInternoSerializer,CrearAsistenciaExternaSerializer

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
        

#Prueba para enrutar asistencia 
class AsistenciaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=ListaAsistencia.objects.all()
    serializer_class=ListaAsistenciaSerializer

class JornadaViewSet( viewsets.ModelViewSet):
    queryset= Jornada.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return JornadaListSerializer
        return JornadaCreateSerializer
    

    
class SolicitudViewSet (viewsets.ReadOnlyModelViewSet):
    serializer_class = SolicitudSerealizer
    queryset = SolicitudTalleres.objects.all()
    
    
class CarreraViewSet (viewsets.ReadOnlyModelViewSet):
    serializer_class = CarreraSerealizer
    queryset = Carrera.objects.all()