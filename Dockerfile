# Usar nginx como servidor web para archivos estáticos
FROM nginx:alpine

# Copiar todos los archivos estáticos al directorio de nginx
COPY . /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# nginx se inicia automáticamente, pero podemos especificarlo explícitamente
CMD ["nginx", "-g", "daemon off;"]

