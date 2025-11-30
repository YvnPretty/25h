@echo off
echo Abriendo el proyecto en el navegador...
echo.

REM Verificar si Docker está corriendo
docker info >nul 2>&1
if errorlevel 1 (
    echo Docker Desktop no esta corriendo.
    echo.
    echo Intentando iniciar Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo.
    echo Espera unos segundos a que Docker Desktop se inicie...
    echo Luego ejecuta: docker-compose up -d
    echo.
    pause
    exit /b 1
)

REM Intentar usar Docker Compose
echo Verificando si el contenedor esta corriendo...
docker ps --filter name=25n-formulario --format "{{.Names}}" | findstr /C:"25n-formulario" >nul
if errorlevel 1 (
    echo Contenedor no encontrado. Iniciando...
    docker-compose up -d --build
    if errorlevel 1 (
        echo Error al iniciar el contenedor.
        echo.
        echo Abriendo el archivo HTML directamente...
        start "" "25.html"
        pause
        exit /b 1
    )
    echo Esperando a que el contenedor este listo...
    timeout /t 3 /nobreak >nul
)

REM Abrir en el navegador
echo Abriendo http://localhost:8080 en el navegador...
start "" "http://localhost:8080"

echo.
echo ========================================
echo   Proyecto abierto en el navegador!
echo ========================================
echo.
echo URL: http://localhost:8080
echo.
echo Para ver los logs: docker-compose logs -f
echo Para detener: docker-compose down
echo.
pause

