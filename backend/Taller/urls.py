
from rest_framework.routers import DefaultRouter
from .views import TallerViewSet,SolicitudViewSet

router_taller=DefaultRouter()

router_taller.register(prefix='talleres', viewset=TallerViewSet)
router_taller.register(prefix='solicitudes',viewset=SolicitudViewSet)


