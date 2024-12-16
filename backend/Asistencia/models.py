from django.db import models
from Taller.models import Carrera,Taller

class Asistente (models.Model):
    id=models.AutoField(primary_key=True)
    rut=models.IntegerField(unique=True)
    nombre=models.CharField(max_length=100)
    
    class Meta:
        db_table= 'asistente'
        managed= False
    
    def __str__(self):
        return self.nombre
    
 
class AsistenteExterno(models.Model):
    id_externo=models.AutoField(primary_key=True)
    num_documento=models.IntegerField(unique=True)
    nombre=models.CharField(max_length=100)
    
    class Meta:
        db_table= 'asistente_externo'
        managed= False
    
    def __str__(self):
        return self.nombre
    
class ListaAsistencia(models.Model):
    id_asiste= models.AutoField(primary_key=True)
    carrera =  models.ForeignKey(Carrera,on_delete=models.DO_NOTHING,db_column="ua")
    asistente= models.ForeignKey(Asistente,on_delete=models.DO_NOTHING,db_column="id_asistente")
    taller = models.ForeignKey(Taller,on_delete=models.DO_NOTHING,db_column="id_taller")
    correo = models.CharField(max_length=100)
    comentario = models.TextField(null=True,blank=True)
    satisfaccion = models.IntegerField()
    
    class Meta:
        db_table= 'asiste'
        managed= False
    
    def __str__(self):
        return self.taller
    
class ListaAsistenciaExterno(models.Model):
    id = models.AutoField(primary_key=True)
    asistente_externo= models.ForeignKey(AsistenteExterno,on_delete=models.DO_NOTHING,db_column="id_externo")
    taller = models.ForeignKey(Taller,on_delete=models.DO_NOTHING,db_column="id_taller")
    correo = models.CharField(max_length=100)
    pais = models.CharField(max_length=30)
    institucion=models.CharField(max_length=100)
    comentario = models.TextField(null=True,blank=True)
    satisfaccion = models.IntegerField()
    
    class Meta:
        db_table= 'asiste_externo'
        managed= False
    
    def __str__(self):
        return self.taller
    