from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Taller,SolicitudTalleres
from .serializers import TallerCreateSerializer, TallerListSerializer, TallerDetailSerializer, TallerUpdateSerializer, SolicitudSerealizer

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
    
class SolicitudViewSet (viewsets.ReadOnlyModelViewSet):
    serializer_class = SolicitudSerealizer
    queryset = SolicitudTalleres.objects.all()