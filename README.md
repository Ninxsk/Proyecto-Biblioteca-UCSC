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

**Paso 3: Verificar permisos (Linux únicamente)**  
Asegúrate de que tu usuario tenga permisos para usar Docker sin `sudo`:
```bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
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

- **Sistema Operativo**: Ubuntu 22.04.2 LTS
- **Backend**:
  - Python 3.10
  - Django 4.2
  - Django REST Framework 3.15.2
- **Base de Datos**: MariaDB 10.9
- **Frontend**:
  - Node.js 18.x
  - React 18.2
- **Contenedores**:
  - Docker 20.10.24
  - Docker Compose 1.29.2
- **Servidor WSGI**: Gunicorn 20.1.0
- **Proxy Inverso**: Nginx 1.21

Para obtener estas herramientas, visita los siguientes enlaces oficiales:
- [Ubuntu](https://ubuntu.com/)
- [Docker](https://www.docker.com/)
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [MariaDB](https://mariadb.org/)

### Configuración del Entorno

A continuación, se detallan los pasos para configurar un entorno similar:

1. **Sistema Operativo**
   Este proyecto fue desarrollado en Ubuntu 22.04.2 LTS. Puedes instalarlo en una máquina virtual o en tu computadora local. Si necesitas un entorno virtualizado, puedes usar [VirtualBox](https://www.virtualbox.org/).

2. **Docker y Docker Compose**
   Docker y Docker Compose son necesarios para ejecutar los contenedores del proyecto. Sigue las instrucciones de instalación en la sección **Requisitos Previos** de este README.

3. **Base de Datos**
   Se utilizó MariaDB como base de datos principal. La configuración necesaria está incluida en los archivos Docker (ver `docker-compose.yml`).

4. **Frontend**
   Para el desarrollo del frontend, asegúrate de instalar Node.js 18.x o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

5. **Servidor WSGI y Proxy**
   - Gunicorn está configurado dentro del contenedor Docker para manejar las solicitudes WSGI.
   - Nginx se utiliza como proxy inverso y servidor de archivos estáticos. Ambos están configurados automáticamente al construir los contenedores.

### Notas Importantes

- **Compatibilidad**: Aunque el proyecto puede ejecutarse en otros sistemas operativos, recomendamos usar Ubuntu para asegurar que no haya discrepancias.
- **Pruebas en otros entornos**: Además de Ubuntu, se realizaron pruebas en sistemas Windows 10/11 con Docker Desktop.

---

## Instalación

### Servidor
Instrucciones para instalar el proyecto en un servidor, si corresponde.

---

---







### Cliente
Instrucciones de configuraci´on para conectar el cliente al servidor.
## Ejecutando las Pruebas
Instrucciones para ejecutar pruebas y verificar el correcto funcionamiento
del proyecto.
## Funcionalidades y Uso
Lista de funcionalidades clave y una breve explicaci´on de c´omo usar la aplicaci´on.
## Construido con
* [Herramienta](enlace) - Descripci´on breve.
