@echo off
echo ========================================
echo   Iniciando Formulario 25N con Docker
echo ========================================
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no esta instalado o no esta en el PATH
    echo Por favor instala Docker Desktop desde https://www.docker.com/get-started
    pause
    exit /b 1
)

REM Verificar si Docker Compose está disponible
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ADVERTENCIA: Docker Compose no encontrado, usando Docker directamente...
    echo.
    echo Construyendo la imagen...
    docker build -t formulario-25n .
    if errorlevel 1 (
        echo ERROR al construir la imagen
        pause
        exit /b 1
    )
    echo.
    echo Iniciando el contenedor...
    docker run -d -p 8080:80 --name 25n-formulario formulario-25n
    if errorlevel 1 (
        echo ERROR al iniciar el contenedor
        pause
        exit /b 1
    )
) else (
    echo Construyendo e iniciando con Docker Compose...
    docker-compose up -d --build
    if errorlevel 1 (
        echo ERROR al iniciar con Docker Compose
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   ¡Contenedor iniciado exitosamente!
echo ========================================
echo.
echo La aplicacion esta disponible en:
echo   http://localhost:8080
echo.
echo Para ver los logs:
echo   docker-compose logs -f
echo.
echo Para detener el contenedor:
echo   docker-compose down
echo.
pause

