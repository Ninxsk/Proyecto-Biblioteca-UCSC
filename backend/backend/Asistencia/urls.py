from rest_framework.routers import DefaultRouter
from .views import ListaAsistenciaViewset , AsistenteViewset
router_lista=DefaultRouter()
router_lista.register(prefix='ListaAsistencia',viewset=ListaAsistenciaViewset),
router_lista.register(prefix='Asistente',viewset=AsistenteViewset)