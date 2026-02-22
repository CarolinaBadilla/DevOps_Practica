# 1️⃣ Imagen base oficial
FROM node:18-alpine

# 2️⃣ Crear directorio dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar package.json primero (optimización de cache)
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install --production

# 5️⃣ Copiar el resto del código
COPY . .

# 6️⃣ Exponer puerto
EXPOSE 3000

# instala curl para healthcheck
RUN apk add --no-cache curl

# crea un usuario no root para mayor seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# 7️⃣ Comando de inicio
CMD ["npm", "start"]