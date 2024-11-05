from django.db import models

from django.db import models

class Taller(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    relator = models.CharField(max_length=100)
    fecha = models.DateField()
    inicio = models.TimeField()
    fin = models.TimeField()
    modalidad = models.BooleanField()  
    id_sol_taller = models.IntegerField(null=True, blank=True)
    id_jornada = models.IntegerField(null=True, blank=True)
    lugar = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = 'taller' 
        managed = False  

    def __str__(self):
        return self.nombre

