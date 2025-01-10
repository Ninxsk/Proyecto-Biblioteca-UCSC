from django.db import models

class WebDomTaller(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField( max_length=100,unique=True)
    class Meta:
        db_table = 'web_dom_talleres' 
        managed = False  
        

    def __str__(self):
        return self.nombre

class WebTalleres(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField (max_length=200,null=True)
    objetivo=models.CharField (max_length=500)
    contenido=models.TextField()
    categoria=models.ForeignKey(WebDomTaller,on_delete=models.CASCADE,db_column="categoria")
    activo=models.IntegerField(null=True)
    class Meta:
        db_table = 'web_talleres' 
        managed = False  
    
    def __str__(self):
        return self.nombre

class Carrera(models.Model):
    ua = models.PositiveIntegerField(primary_key=True) 
    nombre = models.CharField(max_length=255)
    cod_jornada = models.PositiveSmallIntegerField(null=True, blank=True)  
    jornada = models.CharField(max_length=100, null=True, blank=True)
    cod_facultad = models.PositiveIntegerField(null=True, blank=True)  
    facultad = models.CharField(max_length=100, null=True, blank=True)
    cod_sede = models.PositiveSmallIntegerField(null=True, blank=True)  
    sede = models.CharField(max_length=100, null=True, blank=True)
    categoria = models.CharField(max_length=100, null=True, blank=True, default='asignar') 
    regulares = models.PositiveIntegerField(default=0)  
    cuenta_anterior = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'core_carrera' 
        managed = False  
    
    def __str__(self):
        return self.nombre
    
    
class SolicitudTalleres(models.Model):
    id = models.AutoField(primary_key=True)  
    rut = models.CharField(max_length=9)  
    ua = models.ForeignKey(Carrera, on_delete=models.CASCADE,db_column="ua")  
    email = models.CharField(max_length=100)  
    wtaller = models.ForeignKey(WebTalleres, on_delete=models.CASCADE,db_column="taller")  
    presencial = models.BooleanField()  
    f_taller = models.DateField()  
    f_solicitud = models.DateField()  
    comentarios = models.CharField(max_length=250, null=True, blank=True)  

    class Meta:
        db_table = 'web_sol_taller' 
        managed = False  
    

    def __str__(self):
        return self.rut

class Jornada(models.Model):
    id_jornada = models.AutoField(primary_key=True)  
    nombre = models.CharField(max_length=100)
    inicio = models.DateField()
    termino = models.DateField()
    class Meta:
        db_table = 'jornada' 
        managed = False  
        

    def __str__(self):
        return self.nombre

    
class Taller(models.Model):
    
    estado_choice=  ("creado", "Creado"),
    ("revisado", "Revisado"),
    ("finalizado", "Finalizado"),
        
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    relator = models.CharField(max_length=100)
    fecha = models.DateField()
    inicio = models.TimeField()
    fin = models.TimeField()
    modalidad = models.BooleanField()  
    solicitud = models.ForeignKey(SolicitudTalleres,null=True, blank=True , on_delete=models.DO_NOTHING,db_column="id_sol_taller")
    jornada = models.ForeignKey(Jornada,on_delete=models.CASCADE,null=True, blank=True ,db_column="id_jornada")
    lugar = models.CharField(max_length=200)
    observaciones=models.TextField(null=True,blank=True)
    estado= models.CharField(max_length=50,choices=estado_choice,default="creado")

    class Meta:
        db_table = 'taller' 
        managed = False  
        

    def __str__(self):
        return self.nombre

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
    tipo1_choice= {"academico":"Academico","estudiante":"Estudiante","administrativo":"Administrativo"}
    
    id_asiste= models.AutoField(primary_key=True)
    carrera =  models.ForeignKey(Carrera,null=True,blank=True,on_delete=models.DO_NOTHING,db_column="ua")
    asistente= models.ForeignKey(Asistente,on_delete=models.DO_NOTHING,db_column="id_asistente")
    taller = models.ForeignKey(Taller,on_delete=models.DO_NOTHING,db_column="id_taller")
    correo = models.CharField(max_length=100)
    comentario = models.TextField(null=True,blank=True)
    satisfaccion = models.IntegerField()
    tipo = models.CharField(max_length=100,choices=tipo1_choice)
    preinscrito = models.BooleanField()
    
    class Meta:
        db_table= 'asiste'
        managed= False
    
    def __str__(self):
        return self.taller
    
class ListaAsistenciaExterno(models.Model):
    tipo_choice= {"academico":"Academico","estudiante":"Estudiante","investigador":"Investigador","otro":"Otro"}
    
    id = models.AutoField(primary_key=True)
    asistente_externo= models.ForeignKey(AsistenteExterno,on_delete=models.DO_NOTHING,db_column="id_externo")
    taller = models.ForeignKey(Taller,on_delete=models.DO_NOTHING,db_column="id_taller")
    correo = models.CharField(max_length=100)
    pais = models.CharField(max_length=30)
    institucion=models.CharField(max_length=100)
    comentario = models.TextField(null=True,blank=True)
    satisfaccion = models.IntegerField()
    tipo = models.CharField(max_length=100,choices=tipo_choice)
    preinscrito = models.BooleanField()
    
    class Meta:
        db_table= 'asiste_externo'
        managed= False
    
    def __str__(self):
        return self.taller