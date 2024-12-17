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


# Comenzando 🚀

## Requisitos Previos  
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### **1. Git**: Para clonar el repositorio  

**Paso 1: Verificar si Git está instalado**  
Abre una terminal y ejecuta:  
```bash
git --version
```  

**Paso 2: Instalar Git (si no está instalado)**  

- **Windows**:  
   1. Descarga el instalador desde [git-scm.com](https://git-scm.com/).  
   2. Ejecuta el instalador y sigue los pasos predeterminados.  
   3. Verifica la instalación ejecutando `git --version` en el símbolo de sistema (`cmd`).  

- **Linux**:  
   ```bash
   sudo apt update
   sudo apt install git
   ```

**Paso 3: Configurar Git**  
Configura tu nombre y correo para Git:  
```bash
git config --global user.name "TuNombre"
git config --global user.email "tu.email@dominio.com"
```

---

### **2. Docker**: Para construir y ejecutar los contenedores  

**Paso 1: Verificar si Docker está instalado**  
```bash
docker --version
```  

**Paso 2: Instalar Docker (si no está instalado)**  

- **Windows**:  
   1. Descarga **Docker Desktop** desde [docker.com](https://www.docker.com/products/docker-desktop).  
   2. Ejecuta el instalador y reinicia tu computadora.  

   **Nota**: Para Windows 10/11 Home, habilita **WSL 2** siguiendo la guía oficial:  
   [Instalar WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install).  

- **Linux**:  
   ```bash
   sudo apt update
   sudo apt install docker.io
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

---

### **3. Docker Compose**: Para gestionar los contenedores  

**Paso 1: Verificar si Docker Compose está instalado**  
Abre una terminal y ejecuta:  
```bash
docker-compose --version
```  
Si Docker Compose está instalado, verás un número de versión (por ejemplo, `docker-compose version 1.29.2`).  

**Paso 2: Instalar Docker Compose (si no está instalado)**  

- **Windows**:  
   Docker Compose viene incluido con **Docker Desktop**.  

- **Linux**:  
   ```bash
   sudo apt update
   sudo apt install docker-compose
   ```

---

### **4. MariaDB**: Base de Datos  

**Paso 1: Verificar si MariaDB está instalado**  
- Abre una terminal y ejecuta:  
   ```bash
   mariadb --version
   ```  

**Paso 2: Instalar MariaDB**  

- **Windows**:  
   1. Descarga el instalador desde [MariaDB.org](https://mariadb.org/).  
   2. Ejecuta el instalador y sigue las instrucciones.  
   3. Configura una contraseña para el usuario **root**.  

- **Linux**:  
   ```bash
   sudo apt update
   sudo apt install mariadb-server
   sudo systemctl enable mariadb
   sudo systemctl start mariadb
   ```  
---

## Entorno de Desarrollo y Pruebas 🛠️

Este proyecto fue diseñado y probado en un entorno de desarrollo específico para garantizar compatibilidad y estabilidad. Se recomienda replicar el mismo entorno al trabajar en el proyecto para evitar problemas.

### Herramientas y Versiones Utilizadas

El desarrollo y las pruebas se realizaron con las siguientes herramientas y versiones:

- **Sistema Operativo Principal**: Ubuntu Server 22.04.4 LTS  
- **Pruebas Adicionales**: Windows 10  
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
- **Proxy Inverso**: Nginx 1.18.0  

---

### **Recomendación del Entorno**

Se recomienda utilizar **Ubuntu Server 22.04** o **Ubuntu Desktop** como sistema operativo principal para asegurar el correcto funcionamiento y compatibilidad del proyecto. Sin embargo, el proyecto también fue probado en **Windows 10**, donde funcionó correctamente gracias al uso de contenedores Docker.

---

## **Configuración de la Base de Datos** 🗄️

La base de datos inicial del proyecto se encuentra en la carpeta **`BaseDatos`**. Sigue los siguientes pasos para configurarla correctamente en tu entorno.

---

### 1. **Clonar el Repositorio**

Primero, clona el repositorio y accede a la carpeta principal del proyecto:

```bash
git clone https://github.com/usuario/proyecto-biblioteca.git](https://github.com/Ninxsk/Proyecto-Biblioteca-UCSC.git
cd proyecto-biblioteca
```

---

### 2. **Crear la Base de Datos y el Usuario**

#### **En Ubuntu/Linux** 🐧 o **Windows** 

Accede a la consola de MariaDB como el usuario **root**:

```bash
mysql -u root -p
```

Ejecuta los siguientes comandos para crear la base de datos, el usuario y asignar permisos:

```sql
CREATE DATABASE nombre_basedatos;
CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT ALL PRIVILEGES ON nombre_basedatos.* TO 'nombre_usuario'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

- **`nombre_basedatos`**: Nombre de la base de datos (ejemplo: `biblioteca`).  
- **`nombre_usuario`**: Usuario de la base de datos (ejemplo: `biblioteca_user`).  
- **`contraseña_segura`**: Contraseña para el usuario.

---

### 3. **Importar la Base de Datos**

La estructura inicial de la base de datos está en el archivo **`BaseDatos/schema.sql`**.  

#### **En Linux** 🐧  

Ejecuta el siguiente comando desde la terminal, estando en la carpeta raíz del proyecto:

```bash
mysql -u nombre_usuario -p nombre_basedatos < BaseDatos/schema.sql
```

---

#### **En Windows** 

1. **Verifica si MariaDB está en el `PATH`**  
   Ejecuta en el símbolo del sistema (cmd):  
   ```cmd
   mysql --version
   ```

   - Si el comando falla, significa que MariaDB no está en las variables de entorno `PATH`.  
   - Usa la ruta completa al ejecutable `mysql`:

   ```cmd
   "C:\Program Files\MariaDB\MariaDB Server X.X\bin\mysql.exe" -u nombre_usuario -p nombre_basedatos < C:\ruta\al\proyecto\BaseDatos\schema.sql
   ```
   (Ajusta la ruta según la instalación de MariaDB y la ubicación del archivo SQL).  
---

### Notas Importantes 📌

- Asegúrate de que el servicio **MariaDB** esté activo antes de importar la base de datos.  
- En **Windows**, si MariaDB no está en el `PATH`, deberás usar la ruta completa al ejecutable `mysql`.  
- El archivo **`BaseDatos/schema.sql`** incluye la estructura inicial necesaria para que el sistema funcione correctamente.

---

## **Instalación** ⚙️

Sigue estos pasos para instalar y ejecutar el proyecto en un entorno local utilizando **Docker**.

---

### 1. **Configurar las Variables de Entorno**

El proyecto requiere archivos **`.env`** tanto en a nivel **global** como en el **frontend** para configurar las variables necesarias.
Sigue los siguientes ejemplos:

#### **Global** (`/.env`)

```env
# Configuración general
DEBUG=True                                           #True para desarrollo y false para Produccion
SECRET_KEY=clave secreta django                      #Tu la eliges 
ALLOWED_HOSTS=127.0.0.1,backend,localhost:8001       #Direccion del backend  

# Configuración de la base de datos
DB_NAME= Bibloteca           #Nombre base de datos
DB_USER= BibloteUser         #Nombre usuario base de datos
DB_PASSWORD=User123          #Contraseña Base de datos
DB_HOST=192.168.1.86         # Dirección IP de la base de datos
DB_PORT=3306                 #Puerto Base de datos, por defecto mariaDB usa el '3306'
```

#### **Frontend** (`./frontend/.env`)  

```env
REACT_APP_API_URL=http://localhost:8001/api   # URL de la API del backend
REACT_APP_ENV=development                     # Entorno de desarrollo
```

---

### 2. **Configurar Docker Compose**

El archivo **`docker-compose.yml`** ya contiene la configuración de puertos y enlaza correctamente los servicios. Aquí un resumen de las configuraciones importantes:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    container_name: backend
    volumes:
      - ./backend:/app
    ports:
      - "8001:8000"  # Puerto accesible desde la máquina host
    environment:
      - DEBUG=${DEBUG}
      - SECRET_KEY=${SECRET_KEY}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
    command: gunicorn backend.wsgi:application --bind 0.0.0.0:8000
    networks:
      - app_network

  frontend:
    build:
      context: ./frontend
    container_name: frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules  
    ports:
      - "3001:80"  # Nginx expone el puerto 80 como 3001 en el host
    environment:
      - REACT_APP_API_URL=http://backend:8000/api/  
    depends_on:
      - backend
    networks:
      - app_network

networks:
  app_network:
    driver: bridge

```

---

### 3. **Construir y Ejecutar los Contenedores**

Desde la carpeta raíz del proyecto, construye y levanta los contenedores:

```bash
docker-compose up --build -d
```

---

### 4. **Verificar los Servicios**

Verifica que los contenedores estén activos y funcionando correctamente:

```bash
docker-compose ps
```

Deberías ver algo como:

| Nombre del Contenedor      | Estado         | Puertos                |
|----------------------------|----------------|------------------------|
| backend                    | Up (running)   | 0.0.0.0:8001->8000     |
| frontend                   | Up (running)   | 0.0.0.0:80->80         |


---

### 5. **Acceder a la Aplicación**

- **Frontend**: [http://localhost:3001](http://localhost:3001)  
- **API Backend**: [http://localhost:8001/api/](http://localhost:8001/api/)  

---

### Notas Importantes 📌

1. El archivo `.env` debe configurarse correctamente con la **dirección IP** donde se encuentra la base de datos (`DB_HOST=192.168.1.86`).
2. Asegúrate de que el servicio **MariaDB** esté activo en la IP indicada.
3. En **ALLOWED_HOSTS**, debe incluirse `backend` para que Docker pueda comunicarse correctamente con el servicio backend.

---

## **Cargar Datos de Prueba** 🧪

Para poder probar funcionalidades del proyecto , se creo un archivo .sql con datos de prueba, asegúrate de que la base de datos esté configurada y sigue estos pasos para obtenerlos:

1. **Ubica el archivo `test_data.sql` en la carpeta `/BaseDatos` del proyecto.**  
   El archivo contiene registros de prueba para las tablas creadas.

2. **Ejecuta el siguiente comando según tu sistema operativo:**

### **Linux/Ubuntu**
Abre una terminal en la carpeta raiz del proyecto y ejecuta:
```bash
mysql -u root -p nombre_basedatos < BaseDatos/test_data.sql
```
Windows
Si el comando mysql no está en el PATH, usa la ruta completa al ejecutable:
```bash
"C:\\Program Files\\MariaDB\\MariaDB Server X.X\\bin\\mysql.exe" -u root -p nombre_basedatos < BaseDatos\\test_data.sql
```
---
### Parámetros Importantes ###📌

nombre_basedatos: El nombre de la base de datos donde se importarán los datos de prueba.
root: El usuario de la base de datos (puedes reemplazarlo por tu usuario).
BaseDatos/test_data.sql: Ruta del archivo de datos de prueba.

---

## **Funcionalidades y Uso** 🛠️

En esta sección se detalla la lógica y el funcionamiento de las principales características del software, así como las acciones permitidas.

---

### **1. Creación de Talleres**

- El sistema permite **crear talleres** que representan las capacitaciones a gestionar.  
- Al momento de crear un taller:  
   - Es posible asignarle una **solicitud**, pero esta es **opcional**.  
   - Una solicitud puede estar **asociada únicamente a un taller** (relación uno a uno).  
   - Es posible, de forma opcional, asignar una **jornada** al taller para agrupar capacitaciones.  

---

### **2. Gestión de Talleres**

Las siguientes acciones están disponibles en el módulo de gestión de talleres:

1. **Visualización de la Lista de Talleres**  
   - Se puede consultar una lista con todos los talleres creados en el sistema.  
   - La lista muestra información básica como el **id**,**nombre**,**fecha** y **solicitud**.

2. **Visualización de Información Detallada**  
   - Es posible acceder a la información específica de cada taller, que incluye:  
     - **Nombre** del taller.  
     - **Relator**.
     - **Fecha**.
     - **Hora de Inicio**.
     - **Hora de termino**.
     - **modalidad** presencial u online. 
     - **Solicitudes** asociadas, si existen.  
     - **Jornada** a la que pertenece, si fue asignada.
     - **Lugar**.

3. **Edición de Campos Permitidos**  
   - El sistema permite editar campos específicos de un taller.  
   - Los campos que se pueden modificar incluyen:  
     - **Fecha**.  
     - **Hora de Inicio**.  
     - **Hora de termino**
     - **Modalidad**
     - **Relator**

---

### **3. Relación entre Talleres y Solicitudes**

- Las solicitudes pueden asignarse a un taller específico, pero una solicitud **solo puede estar asociada a un único taller**.  
- La asignación de solicitudes al momento de crear un taller es **opcional**, lo cual da flexibilidad al usuario.

---

### **Ejemplo de Flujo** 🚀

1. **Crear un Taller**  
   - El usuario accede al módulo de la lista de talleres.
   - Selecciona 'Crear Taller'
   - Llena los campos básicos: nombre, relator,fecha,hora          
     inicio,hora termino,modalidad,solicitus,joranda,lugar.  
   - Opcionalmente, asigna una solicitud y una jornada.  

2. **Ver Lista de Talleres**  
   - El usuario accede al listado de talleres para revisar los talleres existentes.  

3. **Ver Detalles de un Taller**  
   - El usuario selecciona un taller específico para consultar su información completa.

4. **Editar un Taller**  
   - El usuario actualiza los campos permitidos.
---

## Construido con:
- [Ubuntu](https://ubuntu.com/)
- [Docker](https://www.docker.com/)
- [Django](https://www.djangoproject.com/)
- [Django-Rest](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)
- [MariaDB](https://mariadb.org/)
