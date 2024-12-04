from rest_framework import viewsets, filters 
from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import Taller
from .serializers import TallerCreateSerializer, TallerListSerializer, TallerDetailSerializer, TallerUpdateSerializer, TallerFullDetalleSerializer

class TallerViewSet(viewsets.ModelViewSet):
    queryset = Taller.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter] 
    filterset_fields = ['nombre', 'fecha', 'modalidad', 'relator']  
    search_fields = ['nombre', 'relator']  
    

    def get_serializer_class(self):
        if self.action == 'list':
            return TallerListSerializer
        elif self.action == 'retrieve':
            return TallerDetailSerializer
        elif self.action in ['update']:
            return TallerUpdateSerializer
        return TallerCreateSerializer
    


class TallerCompletoViewSet(ReadOnlyModelViewSet):
    """
    lista de todos los talleres con información completa,
    incluyendo solicitudes y jornadas.
    """
    queryset = Taller.objects.all()
    serializer_class = TallerFullDetalleSerializer

