# Usar Ubuntu Server 22.04 como base
FROM ubuntu:22.04

# Configurar el frontend de Debian para evitar preguntas interactivas
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema necesarias y configurar la zona horaria
RUN apt-get update && apt-get install -y \
    tzdata \
    python3.10 \
    python3-pip \
    gcc \
    libmariadb-dev \
    pkg-config \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# Configurar Python como predeterminado
RUN ln -s /usr/bin/python3.10 /usr/bin/python

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar e instalar dependencias de Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código fuente
COPY . /app/

# Exponer el puerto 8000
EXPOSE 8000

# Comando de inicio: Ejecutar migraciones y el servidor de desarrollo
CMD ["sh", "-c", "python manage.py migrate --fake-initial && python manage.py runserver 0.0.0.0:8000"]
