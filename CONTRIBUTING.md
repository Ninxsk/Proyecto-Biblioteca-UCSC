# 📜 **CONTRIBUTING.md**

## 🚀 **¡Gracias por tu interés en contribuir al Proyecto Biblioteca UCSC!**

Este documento describe las pautas y el flujo de trabajo para contribuir al **Proyecto Biblioteca UCSC**, un sistema diseñado para automatizar la toma de asistencia en capacitaciones, la generación de certificados y el análisis de métricas en la **Dirección de Bibliotecas de la Universidad Católica de la Santísima Concepción (UCSC)**.

---

## ⚙️ **Requisitos Previos**

Asegúrate de tener instaladas las siguientes herramientas:

- **Sistema Operativo Principal**: Ubuntu Server 22.04.4 LTS  
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

### Verificación de Herramientas Instaladas

Ejecuta los siguientes comandos:

```bash
git --version        # Verificar Git
docker --version     # Verificar Docker
docker-compose --version  # Verificar Docker Compose
mariadb   --version       # Verificar version mariadb
```

---

## 🛠️ **Configuración del Proyecto**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Ninxsk/Proyecto-Biblioteca-UCSC.git
```

### 2. Configurar Variables de Entorno

Crea y configura los archivos `.env` necesarios:

**Backend (`/backend/.env`):**

```plaintext
DEBUG=true
SECRET_KEY=clave_secreta
DB_NAME=Biblioteca
DB_USER=BibliotecaUser
DB_PASSWORD=User123
DB_HOST=192.168.1.86
DB_PORT=3306
```

**Frontend (`/frontend/.env`):**

```plaintext
REACT_APP_API_URL=http://localhost:8001/api
REACT_APP_ENV=development

```

---

### 3. Levantar el Proyecto con Docker Compose

```bash
docker-compose up --build -d
```

Verifica los servicios:

```bash
docker-compose ps
```

---

## 📂 **Estructura del Proyecto**

```plaintext

Proyecto-Biblioteca-UCSC/
├── backend/                      # Backend con Django REST
│   ├── Asistencia/               # Aplicación para asistencia
│   ├── Taller/                   # Aplicación para talleres
│   ├── BaseDatos/                # Archivos de base de datos (SQL)
│   ├── static/                   # Archivos estáticos
│   ├── __init__.py               # Inicialización de Python
│   ├── Dockerfile                # Configuración Docker
│   ├── manage.py                 # Comando principal de Django
│   ├── requirements.txt          # Dependencias Python
│   └── backend/                  # Configuración principal
│       ├── settings.py           # Configuración Django
│       ├── urls.py               # Rutas de la API
│       ├── wsgi.py               # Servidor WSGI
│       └── asgi.py               # Servidor ASGI
├── frontend/                     # Frontend con React
│   ├── public/                   # Archivos públicos
│   ├── src/                      # Código fuente
│   │   ├── components/           # Componentes React
│   │   ├── pages/                # Páginas principales
│   │   ├── services/             # Llamadas a la API
│   │   ├── context/              # Contextos globales (useContext)
│   │   ├── App.js                # Archivo principal
│   │   └── index.js              # Punto de entrada
│   └── Dockerfile                # Configuración Docker para frontend
├── .gitignore                    # Archivos ignorados en Git
├── docker-compose.yml            # Configuración Docker Compose
├── README.md                     # Documentación principal
└── CONTRIBUTING.md               # Guía de contribución

```

---

## ✨ **Normas para Contribuir**

1. **Crea una rama nueva** para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Sigue la convención de commits**:
   ```plaintext
   tipo: descripción breve

   Ejemplos:
   feat: agregar nueva funcionalidad a gestión de capacitaciones
   chore: actuzalizar una funcionalidad
   docs: actualizar guía de instalación
   ```


---

## 🔒 **Seguridad**

Si encuentras una vulnerabilidad, repórtala de manera **privada** a:
- **Ninoska Paredes Olave**  
  [ninoska.paredes2101@alumnos.ubiobio.cl](mailto:ninoska.paredes2101@alumnos.ubiobio.cl)

---

¡Gracias por tu contribución al Proyecto Biblioteca UCSC! 🚀