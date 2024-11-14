FROM python:3.9

WORKDIR /app

# Instala dependencias del sistema necesarias para algunas bibliotecas de Python
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

# Modifica el comando de inicio para falsificar las migraciones iniciales
CMD ["sh", "-c", "python manage.py migrate --fake-initial && python manage.py runserver 0.0.0.0:8000"]
