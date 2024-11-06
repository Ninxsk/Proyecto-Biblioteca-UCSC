
from rest_framework.routers import DefaultRouter
from .views import TallerViewSet

router_taller=DefaultRouter()
router_taller.register(prefix='talleres', viewset=TallerViewSet)


