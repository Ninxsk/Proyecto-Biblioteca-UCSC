
from rest_framework.routers import DefaultRouter
from .views import TallerViewSet , TallerCompletoViewSet

router_taller=DefaultRouter()
router_taller.register(prefix='talleres', viewset=TallerViewSet)
router_taller.register(prefix='talleres-lista', viewset=TallerCompletoViewSet,basename='taller-lista')



