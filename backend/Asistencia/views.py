from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ListaAsistencia, ListaAsistenciaExterno
from .serializers import  ListaAsistenciaSerializer

class ListaAsistenciaAPIView(APIView):
    def get(self, request, taller_id):
        
        #validar si el taller existe
       
        try:
            asistentes_internos = ListaAsistencia.objects.filter(taller_id=taller_id)
            asistentes_externos = ListaAsistenciaExterno.objects.filter(taller_id=taller_id)
             
            if not asistentes_internos.exists() and not asistentes_externos.exists():
                return Response(
                    {"mensaje": "No hay lista de asistencia creada para este taller."}  
                )
                
            asistentes = list(asistentes_internos) + list(asistentes_externos)
            serializer = ListaAsistenciaSerializer(asistentes, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": "Ocurrió un error al mostrar la lista: {str(e)}"})
