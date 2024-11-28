from rest_framework.routers import DefaultRouter
from .views import TallerViewSet,AsistenciaViewSet,JornadaViewSet
from django.urls import path, include

router_taller=DefaultRouter()
router_taller.register(prefix='talleres', viewset=TallerViewSet)
router_taller.register(prefix='asistencia',viewset=AsistenciaViewSet)
router_taller.register(prefix='jornada',viewset=JornadaViewSet)

urlpatterns = [
    path('', include(router_taller.urls)),
]