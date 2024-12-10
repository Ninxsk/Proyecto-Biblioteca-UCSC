# Usa Ubuntu 22.04 como base
FROM ubuntu:22.04

# Instalar dependencias del sistema y Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    gcc \
    libmariadb-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias de Python
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto
COPY . .

# Exponer el puerto del backend
EXPOSE 8000

# Comando de inicio con Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=3"]
