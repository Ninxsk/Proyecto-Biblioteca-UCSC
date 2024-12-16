# Usar Ubuntu Server 22.04 como imagen base
FROM ubuntu:22.04

# Instalar Node.js y npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias de Node.js
COPY package.json package-lock.json /app/

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente del proyecto
COPY . /app/

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["npm", "start"]
