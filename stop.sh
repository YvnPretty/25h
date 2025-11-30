#!/bin/bash

echo "Deteniendo el contenedor del Formulario 25N..."
echo ""

# Intentar con Docker Compose primero
if command -v docker-compose &> /dev/null; then
    docker-compose down
    if [ $? -eq 0 ]; then
        echo "Contenedor detenido exitosamente."
        exit 0
    fi
fi

# Si falla, intentar con Docker directamente
docker stop 25n-formulario 2>/dev/null
docker rm 25n-formulario 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Contenedor detenido y eliminado."
else
    echo "No se encontró un contenedor corriendo."
fi

