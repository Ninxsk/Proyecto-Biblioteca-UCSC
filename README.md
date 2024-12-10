# Proyecto Biblioteca UCSC 📚

Desarrollo de un módulo de software personalizado para la Dirección de Bibliotecas de la Universidad Católica de la Santísima Concepción (UCSC). Este módulo tiene como objetivo optimizar la toma de asistencia en las capacitaciones,la generación de certificados y permitir la obtencion de metricas a partir de los datos guardados, integrándose de manera eficiente con los sistemas bibliotecarios actuales.
---

## Características Principales
La UCSC tiene a cargo diversos servicios bibliotecarios a lo largo de 6 sedes, siendo crucial un sistema que centralice y gestione procesos que actualmente son manuales y propensos a errores. Este proyecto aborda la necesidad de un registro eficiente y preciso de asistencia, facilitando la emisión de certificados y la generación de estadísticas clave para análisis y reportes institucionalescterísticas Principales

- **Gestión de Capacitaciones**: CRUD de capacitaciones con permisos asignados según roles específicos.
- **Formulario de Asistencia**: Generación de formularios accesibles públicamente, habilitados según el estado del taller.
- **Generación de certificados**: Emisión y descarga directa de certificados en PDF para los asistentes registrados.
- **Reportes y Estadísticas**: Generar estadísticas detalladas y exportarlas en diversos formatos .

---

## Tecnologías Utilizadas

- **Backend**: Python, Django REST Framework
- **Frontend**: React
- **Base de Datos**: MariaDB 
- **Contenedores**: Docker y Docker Compose

---

## Versiones
- **Django**: 4.2
- **djangorestframework**: 3.15.2
- **mysqlclient**: 2.2.5
- **Docker**: 20.10 o superior
- **Docker Compose**: 1.27 o superior


---

## Estructura del Proyecto
```plaintext
PROYECTO-BIBLIOTECA-UCSC/
├── backend/
│   ├── backend/
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── Taller/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── db.sqlite3
│   ├── Dockerfile
│   ├── manage.py
│   └── requirements.txt
├── env/
├── docker-compose.yml
└── README.md
```

---

## Configuración del Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/proyecto-biblioteca-ucsc.git
cd proyecto-biblioteca-ucsc
```

### 2. Configurar el Entorno Virtual (opcional, si no usas Docker)
```bash
python -m venv env
source env/bin/activate  # En Linux/Mac
env\Scripts\activate      # En Windows
pip install -r requirements.txt
```


## Comenzando
Instrucciones para obtener una copia del proyecto en funcionamiento
en una m´aquina local.
## Entorno de Desarrollo y Pruebas
Este proyecto fue dise~nado en un entorno espec´ıfico, por lo que se
recomienda utilizar las mismas versiones de software.
## Configuraci´on del Entorno
Pasos detallados para replicar el entorno de desarrollo y pruebas.
## Instalaci´on
### Servidor
Instrucciones para instalar el proyecto en un servidor, si corresponde.
### Cliente
Instrucciones de configuraci´on para conectar el cliente al servidor.
## Ejecutando las Pruebas
Instrucciones para ejecutar pruebas y verificar el correcto funcionamiento
del proyecto.
## Funcionalidades y Uso
Lista de funcionalidades clave y una breve explicaci´on de c´omo usar la aplicaci´on.
## Construido con
* [Herramienta](enlace) - Descripci´on breve.
