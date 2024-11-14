from rest_framework.routers import DefaultRouter
from .views import ListaAsistenciaViewset

router_lista=DefaultRouter()
router_lista.register(prefix='ListaAsistencia',viewset=ListaAsistenciaViewset)