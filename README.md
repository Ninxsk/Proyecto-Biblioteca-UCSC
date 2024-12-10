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

Requisitos Previos
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


## Entorno de Desarrollo y Pruebas
Este proyecto fue dise~nado en un entorno espec´ıfico, por lo que se
recomienda utilizar las mismas versiones de software.

## Configuracion del Entorno
Pasos detallados para replicar el entorno de desarrollo y pruebas.

## Tecnologías Utilizadas

- **Backend**: Python, Django REST Framework
- **Frontend**: React
- **Base de Datos**: MariaDB 
- **Contenedores**: Docker y Docker Compose
- **             **: Guinicorn y Gnix

---

## Versiones
- **Django**: 4.2
- **djangorestframework**: 3.15.2
- **mysqlclient**: 2.2.5
- **Docker**: 20.10 o superior
- **Docker Compose**: 1.27 o superior

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
