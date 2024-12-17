# Etapa base: Configurar entorno Django y Gunicorn
FROM ubuntu:22.04

# Configurar la zona horaria y entorno no interactivo
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    python3.10-dev \
    libmariadb-dev \
    pkg-config \
    tzdata \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configurar directorio de trabajo
WORKDIR /app

# Instalar dependencias de Django
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente del backend
COPY . /app/

# Exponer el puerto 8000
EXPOSE 8000

# Ejecutar Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
