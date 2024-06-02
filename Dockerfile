# Usa una imagen base de Node.js con la versión 20.14.0
FROM node:20.14.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y yarn.lock (si existe)
COPY package.json yarn.lock ./

# Instala las dependencias del proyecto
RUN yarn install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que se ejecutará la aplicación NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start:prod"]
