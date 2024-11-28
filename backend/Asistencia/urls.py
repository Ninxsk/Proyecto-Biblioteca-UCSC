from django.urls import path
from .views import ListaAsistenciaAPIView

urlpatterns = [
    path('<int:taller_id>/lista-asistencia/', ListaAsistenciaAPIView.as_view())]