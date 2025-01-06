from rest_framework.routers import DefaultRouter
from .views import TallerViewSet,AsistenciaViewSet,JornadaViewSet,SolicitudViewSet,CarreraViewSet
from django.urls import path, include

router_taller=DefaultRouter()

router_taller.register(prefix='talleres', viewset=TallerViewSet)
router_taller.register(prefix='asistencia',viewset=AsistenciaViewSet)
router_taller.register(prefix='jornada',viewset=JornadaViewSet)
router_taller.register(prefix='solicitudes',viewset=SolicitudViewSet)
router_taller.register(prefix='carreras',viewset=CarreraViewSet)


urlpatterns = [
    path('', include(router_taller.urls)),
   
]