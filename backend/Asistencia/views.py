from django.shortcuts import render
from rest_framework import viewsets
from .models import ListaAsistencia, Asistente
from .serializers import ListaAsistenciaSerializer , AsisteSerializaer

class ListaAsistenciaViewset(viewsets.ModelViewSet):
    serializer_class=ListaAsistenciaSerializer
    queryset =ListaAsistencia.objects.all()
    

class AsistenteViewset(viewsets.ModelViewSet):
    serializer_class= AsisteSerializaer
    queryset=Asistente.objects.all()
    

# Create your views here.

