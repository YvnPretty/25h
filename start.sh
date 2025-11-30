#!/bin/bash

echo "========================================"
echo "  Iniciando Formulario 25N con Docker"
echo "========================================"
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker no está instalado"
    echo "Por favor instala Docker desde https://www.docker.com/get-started"
    exit 1
fi

# Verificar si Docker Compose está disponible
if command -v docker-compose &> /dev/null; then
    echo "Construyendo e iniciando con Docker Compose..."
    docker-compose up -d --build
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "========================================"
        echo "  ¡Contenedor iniciado exitosamente!"
        echo "========================================"
        echo ""
        echo "La aplicación está disponible en:"
        echo "  http://localhost:8080"
        echo ""
        echo "Para ver los logs:"
        echo "  docker-compose logs -f"
        echo ""
        echo "Para detener el contenedor:"
        echo "  docker-compose down"
    else
        echo "ERROR al iniciar con Docker Compose"
        exit 1
    fi
else
    echo "Docker Compose no encontrado, usando Docker directamente..."
    echo ""
    echo "Construyendo la imagen..."
    docker build -t formulario-25n .
    
    if [ $? -ne 0 ]; then
        echo "ERROR al construir la imagen"
        exit 1
    fi
    
    echo ""
    echo "Iniciando el contenedor..."
    docker run -d -p 8080:80 --name 25n-formulario formulario-25n
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "========================================"
        echo "  ¡Contenedor iniciado exitosamente!"
        echo "========================================"
        echo ""
        echo "La aplicación está disponible en:"
        echo "  http://localhost:8080"
        echo ""
        echo "Para ver los logs:"
        echo "  docker logs -f 25n-formulario"
        echo ""
        echo "Para detener el contenedor:"
        echo "  docker stop 25n-formulario"
    else
        echo "ERROR al iniciar el contenedor"
        exit 1
    fi
fi

