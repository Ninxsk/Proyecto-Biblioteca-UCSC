from django.shortcuts import render
from rest_framework import viewsets
from .models import ListaAsistencia
from .serializers import ListaAsistenciaSerializer

class ListaAsistenciaViewset(viewsets.ModelViewSet):
    serializer_class=ListaAsistenciaSerializer
    queryset =ListaAsistencia.objects.all()
    

# Create your views here.

