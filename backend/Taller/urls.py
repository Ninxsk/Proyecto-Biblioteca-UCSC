from rest_framework.routers import DefaultRouter
from .views import TallerViewSet,AsistenciaViewSet
from django.urls import path, include

router_taller=DefaultRouter()
router_taller.register(prefix='talleres', viewset=TallerViewSet)
router_taller.register(prefix='asistencia',viewset=AsistenciaViewSet)


urlpatterns = [
    path('', include(router_taller.urls)),
]