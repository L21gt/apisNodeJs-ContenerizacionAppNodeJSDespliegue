# ---------------------------------
# Fase 1: Base de la Imagen
# ---------------------------------
# Se utiliza la imagen oficial de Node.js en su versión LTS (Long-Term Support).
# Se opta por la variante "alpine" para obtener una imagen final ligera y
# reducir la superficie de ataque, ideal para producción.
FROM node:lts-alpine

# ---------------------------------
# Configuración del Entorno
# ---------------------------------
# Se establece el directorio de trabajo principal dentro del contenedor.
# Todas las rutas y comandos subsecuentes serán relativos a /app.
WORKDIR /app

# ---------------------------------
# Manejo de Dependencias
# ---------------------------------
# Copia los manifiestos de dependencias (package.json y package-lock.json).
# Se copian por separado del resto del código para aprovechar el
# sistema de caché por capas de Docker. Si estos archivos no cambian,
# no se volverán a ejecutar los pasos de instalación.
COPY package*.json ./

# Instala únicamente las dependencias de producción.
# El flag --omit=dev excluye las 'devDependencies' (como Jest, Nodemon),
# asegurando una imagen limpia y optimizada para producción.
RUN npm install --omit=dev

# ---------------------------------
# Copia del Código Fuente
# ---------------------------------
# Copia el resto del código fuente de la aplicación al directorio de trabajo.
# Los archivos especificados en .dockerignore serán excluidos.
COPY . .

# ---------------------------------
# Exposición de Red
# ---------------------------------
# Documenta el puerto en el que la aplicación escuchará peticiones.
# Es necesario mapear este puerto al host al ejecutar el contenedor.
EXPOSE 4000

# ---------------------------------
# Comando de Ejecución
# ---------------------------------
# Define el comando por defecto para ejecutar el contenedor.
# Inicia la aplicación usando el script "start" ("node src/server.js").
CMD [ "node", "src/server.js" ]