# Base de Ubuntu para todo
FROM ubuntu:22.04

# Instalar Node.js, NGINX y otras herramientas necesarias
RUN apt-get update && apt-get install -y curl nginx && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Configuración de trabajo
WORKDIR /app

# Construcción del frontend
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# Copiar los archivos compilados al directorio raíz de NGINX
RUN rm -rf /var/www/html/* && \
    cp -r /app/build/* /var/www/html/

# Copiar la configuración de NGINX
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Eliminar la configuración por defecto de NGINX
RUN rm /etc/nginx/sites-enabled/default

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio para NGINX
CMD ["nginx", "-g", "daemon off;"]
