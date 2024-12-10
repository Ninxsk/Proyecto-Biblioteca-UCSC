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

# Comenzando
Instrucciones para obtener una copia del proyecto en funcionamiento en una máquina local.

### Requisitos Previos
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### 1. Git: Para clonar el repositorio

**Paso 1: Verificar si Git está instalado**  
Abre una terminal y ejecuta:
```bash
git --version
```
Si Git está instalado, verás un número de versión como resultado (por ejemplo, `git version 2.34.1`).

**Paso 2: Instalar Git (si no está instalado)**  
- **Windows/Mac**: Descárgalo desde [git-scm.com](https://git-scm.com/) y sigue las instrucciones del instalador.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install git
  ```

**Paso 3: Configurar Git**  
Después de instalar Git, configura tu nombre de usuario y correo electrónico:
```bash
git config --global user.name "TuNombre"
git config --global user.email "tu.email@dominio.com"
```

---

### 2. Docker: Para construir y ejecutar los contenedores

**Paso 1: Verificar si Docker está instalado**  
Abre una terminal y ejecuta:
```bash
docker --version
```
Si Docker está instalado, verás un número de versión como resultado (por ejemplo, `Docker version 20.10.24`).

**Paso 2: Instalar Docker (si no está instalado)**  
- **Windows/Mac**: Descarga Docker Desktop desde [docker.com](https://www.docker.com/products/docker-desktop) y sigue las instrucciones del instalador.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install docker.io
  sudo systemctl enable docker
  sudo systemctl start docker
  ```
---

### 3. Docker Compose: Para gestionar los contenedores

**Paso 1: Verificar si Docker Compose está instalado**  
Ejecuta:
```bash
docker-compose --version
```
Si Docker Compose está instalado, verás un número de versión (por ejemplo, `docker-compose version 1.29.2`).

**Paso 2: Instalar Docker Compose (si no está instalado)**  
- **Windows/Mac**: Docker Compose ya viene incluido con Docker Desktop.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install docker-compose
  ```
---  
## Entorno de Desarrollo y Pruebas

Este proyecto fue diseñado y probado en un entorno de desarrollo específico para garantizar compatibilidad y estabilidad. Se recomienda replicar el mismo entorno al trabajar en el proyecto para evitar problemas.

### Herramientas y Versiones Utilizadas

El desarrollo se llevó a cabo utilizando las siguientes herramientas:

- **Sistema Operativo**: Ubuntu 22.04.4 LTS
- **Backend**:
  - Python 3.10.12
  - Django 4.2
  - Django REST Framework 3.15.2
- **Base de Datos**: MariaDB 15.1
- **Frontend**:
  - Node.js 18.x
  - React 18.3.1
- **Contenedores**:
  - Docker 27.2.0
  - Docker Compose 2.29.2
- **Servidor WSGI**: Gunicorn 23.0.0
- **Proxy Inverso**: Nginx 1.18.0  (ubuntu)


### Configuración del Entorno

A continuación, se detallan los pasos para configurar un entorno similar:

1. **Sistema Operativo**
   Este proyecto fue desarrollado en Ubuntu 22.04.2 LTS. Puedes instalarlo en una máquina virtual o en tu computadora local. Si necesitas un entorno virtualizado, puedes usar [VirtualBox](https://www.virtualbox.org/).

detallar pasos para virtualbox

2. **Docker y Docker Compose**
   Docker y Docker Compose son necesarios para ejecutar los contenedores del proyecto. Sigue las instrucciones de instalación en la sección **Requisitos Previos** de este README.

3. **Base de Datos**
   Se utilizó MariaDB como base de datos principal. La configuración necesaria está incluida en los archivos Docker (ver `docker-compose.yml`).

4. **Frontend**
   Para el desarrollo del frontend, asegúrate de instalar Node.js 18.x o superior
#### Instalación de Node.js
 **Actualizar los repositorios del sistema:**
   ```bash
   sudo apt update
   ```
 **Instalar Node.js 18.x desde NodeSource:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
 **Verificar la instalación de Node.js y npm:**
   ```bash
   node -v
   npm -v
   ```
5. **Servidor WSGI y Proxy**
   - Gunicorn está configurado dentro del contenedor Docker para manejar las solicitudes WSGI.
   - Nginx se utiliza como proxy inverso y servidor de archivos estáticos. Sigue los siguientes pasos para su instalación y configuración:
#### Instalación de Nginx
 **Actualizar los repositorios del sistema:**
   ```bash
   sudo apt update
   ```
 **Instalar Nginx:**
   ```bash
   sudo apt install -y nginx
   ```
 **Verificar que Nginx esté funcionando:**
   ```bash
   sudo systemctl status nginx
   ```
configurar ngiux 

### Notas Importantes

- **Compatibilidad**: Aunque el proyecto puede ejecutarse en otros sistemas operativos, recomendamos usar Ubuntu para asegurar que no haya discrepancias.
---

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en un entorno local utilizando Docker. Este proceso garantiza una configuración rápida y consistente.

### Pasos de Instalación

1. **Clonar el repositorio**  
   Abre una terminal y ejecuta:
   ```bash
   git clone https://github.com/tu_usuario/tu_proyecto.git
   cd tu_proyecto
   ```

2. **Configurar variables de entorno**  
   Crea un archivo `.env` en la direcion ./backend y define las siguientes variables:

   ```env
   SECRET_KEY=
   DEBUG=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=
   ALLOWED_HOSTS=

   ```
Aqui un ejemplo:

SECRET_KEY=mi_clave_secreta_super_segura_12345 // # Clave secreta de Django, usada para firmar datos sensibles.
DEBUG=True // # Define si el proyecto está en modo depuración (True para desarrollo, False para producción).
**Configuración de la Base de Datos**

DB_NAME=biblioteca // # Nombre de la base de datos.
DB_USER=biblioteca_user // # Usuario con permisos para la base de datos.
DB_PASSWORD=contraseña_segura // # Contraseña del usuario de la base de datos.
DB_HOST=localhost // # Host donde se encuentra la base de datos (puede ser localhost o el nombre de un contenedor Docker).
DB_PORT=3306 // # Puerto para conectarse a la base de datos (3306 es el puerto predeterminado de MariaDB/MySQL).

**Hosts permitidos para acceder a la aplicación.**

ALLOWED_HOSTS=localhost,127.0.0.1 // # En producción, usa el dominio de tu sitio web (por ejemplo, biblioteca.talleres.cl).


3. **Construir y ejecutar los contenedores**  
   Construye y levanta todos los servicios necesarios :
   ```bash
   docker-compose up --build -d
   ```

4. **Verificar los servicios**  
   Asegúrate de que los servicios estén corriendo:
   ```bash
   docker-compose ps
   ```

   Accede a las siguientes URLs para verificar:(arreglar con url)
   - **Frontend**: [http://localhost](http://localhost)
   - **API Backend**: [http://localhost/api/](http://localhost/api/)
---
## Ejecutando las Pruebas
Instrucciones para ejecutar pruebas y verificar el correcto funcionamiento
del proyecto.
## Funcionalidades y Uso
Lista de funcionalidades clave y una breve explicaci´on de c´omo usar la aplicacion.
## Construido con
* [Herramienta](enlace) - Descripcion breve.

- [Ubuntu](https://ubuntu.com/)
- [Docker](https://www.docker.com/)
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [MariaDB](https://mariadb.org/)
