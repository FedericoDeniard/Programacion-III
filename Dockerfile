# Imagen base de Node
FROM node:22

# Setea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el contenido de la carpeta clase-node dentro del contenedor
COPY ./clase-node/ /app

COPY ./clase-node/.env /app/.env

# Instala las dependencias
RUN npm install

# Expone el puerto que usa tu app (cambiá si usás otro)
EXPOSE 8080

# Comando que arranca tu app
CMD ["npm", "start"]
