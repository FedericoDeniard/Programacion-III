# Imagen base de Node
FROM node:22

# Crea estructura de carpetas
RUN mkdir -p /src/app /src/javascript

# Setea el directorio de trabajo
WORKDIR /src/app

# Copia el backend (clase-node) a /src/app
COPY ./clase-node/ /src/app

# Copia la carpeta javascript a /src/javascript
COPY ./javascript/ /src/javascript

# Instala las dependencias
RUN npm install

# Expone el puerto
EXPOSE 8080

# Comando de arranque
CMD ["npm", "start"]
