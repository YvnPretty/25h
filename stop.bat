@echo off
echo Deteniendo el contenedor del Formulario 25N...
echo.

REM Intentar con Docker Compose primero
docker-compose down 2>nul
if errorlevel 1 (
    REM Si falla, intentar con Docker directamente
    docker stop 25n-formulario 2>nul
    docker rm 25n-formulario 2>nul
    if errorlevel 1 (
        echo No se encontro un contenedor corriendo.
    ) else (
        echo Contenedor detenido y eliminado.
    )
) else (
    echo Contenedor detenido exitosamente.
)

echo.
pause

