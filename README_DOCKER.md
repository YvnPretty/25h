# 🐳 Guía de Docker para el Formulario 25N

Esta guía te ayudará a ejecutar la aplicación del formulario 25N usando Docker.

## 📋 Requisitos Previos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado (opcional, pero recomendado)

## 🚀 Inicio Rápido

### Opción 1: Usando Docker Compose (Recomendado)

```bash
# Construir y ejecutar el contenedor
docker-compose up -d

# Ver los logs
docker-compose logs -f

# Detener el contenedor
docker-compose down
```

La aplicación estará disponible en: **http://localhost:8080**

### Opción 2: Usando Docker directamente

```bash
# Construir la imagen
docker build -t formulario-25n .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name 25n-formulario formulario-25n

# Ver los logs
docker logs -f 25n-formulario

# Detener el contenedor
docker stop 25n-formulario

# Eliminar el contenedor
docker rm 25n-formulario
```

## 🔧 Configuración

### Cambiar el Puerto

Si quieres usar un puerto diferente (por ejemplo, 3000), edita `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Cambia 8080 por el puerto que prefieras
```

### Desarrollo con Hot Reload

Para ver cambios en tiempo real durante el desarrollo, descomenta la línea de `volumes` en `docker-compose.yml`:

```yaml
volumes:
  - .:/usr/share/nginx/html:ro
```

Luego reconstruye:

```bash
docker-compose up -d --build
```

## 📁 Estructura de Archivos

```
.
├── Dockerfile              # Configuración de Docker
├── docker-compose.yml     # Configuración de Docker Compose
├── nginx.conf             # Configuración de Nginx
├── .dockerignore          # Archivos a ignorar en Docker
├── 25.html                # Archivo principal del formulario
└── ...                    # Otros archivos estáticos
```

## 🛠️ Comandos Útiles

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Reconstruir la imagen
```bash
docker-compose up -d --build
```

### Entrar al contenedor
```bash
docker exec -it 25n-formulario sh
```

### Verificar que el contenedor está corriendo
```bash
docker ps
```

### Detener y eliminar todo
```bash
docker-compose down
```

## 🌐 Acceso a la Aplicación

Una vez que el contenedor esté corriendo:

- **URL Local:** http://localhost:8080
- **URL desde otros dispositivos en la red:** http://TU_IP:8080

Para encontrar tu IP:
- **Windows:** `ipconfig` (busca IPv4)
- **Linux/Mac:** `ifconfig` o `ip addr`

## 🔒 Seguridad

El contenedor incluye:
- Headers de seguridad configurados
- Compresión gzip activada
- Cache optimizado para archivos estáticos

## 🐛 Solución de Problemas

### El puerto 8080 ya está en uso

Cambia el puerto en `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Usa otro puerto
```

### No puedo acceder a la aplicación

1. Verifica que el contenedor esté corriendo:
   ```bash
   docker ps
   ```

2. Verifica los logs:
   ```bash
   docker-compose logs
   ```

3. Verifica que el puerto esté correcto:
   ```bash
   netstat -an | grep 8080  # Windows
   lsof -i :8080            # Mac/Linux
   ```

### Los cambios no se reflejan

Si estás usando volúmenes, asegúrate de que el archivo `docker-compose.yml` tenga la línea de `volumes` descomentada, o reconstruye la imagen:

```bash
docker-compose up -d --build
```

## 📦 Producción

Para producción, considera:

1. **Usar HTTPS:** Configura un proxy reverso (nginx, traefik) con certificados SSL
2. **Variables de entorno:** Para configuraciones sensibles
3. **Monitoreo:** Agrega herramientas de monitoreo
4. **Backup:** Configura backups regulares de los datos

### Ejemplo con HTTPS (usando Traefik)

```yaml
version: '3.8'
services:
  web:
    build: .
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.25n.rule=Host(`formulario.tudominio.com`)"
      - "traefik.http.routers.25n.entrypoints=websecure"
      - "traefik.http.routers.25n.tls.certresolver=letsencrypt"
```

## 🎯 Próximos Pasos

1. Configura Google Forms siguiendo `LEEME_PRIMERO.md`
2. Configura Firebase si es necesario
3. Personaliza `25.html` según tus necesidades
4. Despliega en tu servidor o plataforma cloud preferida

## 📚 Recursos Adicionales

- [Documentación de Docker](https://docs.docker.com/)
- [Documentación de Nginx](https://nginx.org/en/docs/)
- [Docker Compose](https://docs.docker.com/compose/)

---

¿Necesitas ayuda? Revisa los logs del contenedor o consulta la documentación de Docker.

