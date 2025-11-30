# 🚀 Formulario 25N - Guía Completa

## 🐳 Inicio Rápido con Docker

**¿Quieres ejecutar la aplicación rápidamente?** Usa Docker:

### Windows:
```bash
start.bat
```

### Linux/Mac:
```bash
./start.sh
```

O manualmente:
```bash
docker-compose up -d
```

La aplicación estará en: **http://localhost:8080**

Para más detalles, consulta `README_DOCKER.md`

---

## 📝 Configuración de Google Forms

## ✅ Archivos Creados para Ti

He creado varios archivos para facilitar la configuración:

1. **`crear_formulario_google.gs`** - Script de Google Apps Script que crea el formulario automáticamente ⭐ **RECOMENDADO**
2. **`obtener_entry_ids.html`** - Herramienta web para obtener Entry IDs si ya tienes un formulario
3. **`INSTRUCCIONES_GOOGLE_FORMS.md`** - Instrucciones detalladas completas
4. **`EJEMPLO_CONFIGURACION.txt`** - Ejemplo de cómo se ve la configuración final

## 🎯 Método Más Rápido (5 minutos)

### Paso 1: Crear el Formulario Automáticamente

1. Abre el archivo **`crear_formulario_google.gs`**
2. Copia TODO el código
3. Ve a https://script.google.com
4. Crea un nuevo proyecto
5. Pega el código
6. Guarda (Ctrl+S)
7. Selecciona la función `crearFormulario25N` en el menú desplegable
8. Haz clic en "Ejecutar" ▶️
9. Acepta los permisos cuando te los pida
10. Ve a "Ejecuciones" en el menú lateral
11. Haz clic en la ejecución más reciente
12. **Copia la configuración** que aparece en el log (tiene este formato):

```javascript
const GOOGLE_FORM_CONFIG = {
    enabled: true,
    formId: '1FAIpQLSdXXXXXXXXX',
    entryIds: {
        q1: 'entry.123456789',
        q2: 'entry.987654321',
        ...
    }
};
```

### Paso 2: Actualizar 25.html

1. Abre el archivo **`25.html`**
2. Busca `GOOGLE_FORM_CONFIG` (está alrededor de la línea 560)
3. **Reemplaza** toda la sección con la configuración que copiaste del script
4. Guarda el archivo

### Paso 3: Verificar

1. Abre `25.html` en tu navegador
2. Completa el formulario
3. Ve a tu formulario de Google (el script te dio la URL)
4. Haz clic en "Respuestas"
5. Deberías ver las respuestas guardándose en tiempo real

## 📍 Ubicación de la Configuración en 25.html

La configuración está en la línea **560** aproximadamente. Busca esto:

```javascript
const GOOGLE_FORM_CONFIG = {
    enabled: false,  // ← Cambia a true
    formId: 'TU_FORM_ID_AQUI',  // ← Reemplaza con tu Form ID
    entryIds: {
        q1: 'entry.123456789',  // ← Reemplaza con tus Entry IDs reales
        ...
    }
};
```

## ❓ ¿Necesitas Ayuda?

- **¿El script no funciona?** Lee `INSTRUCCIONES_GOOGLE_FORMS.md` - tiene solución de problemas
- **¿Ya tienes un formulario?** Usa `obtener_entry_ids.html` para obtener los IDs
- **¿Quieres hacerlo manualmente?** Sigue las instrucciones en `INSTRUCCIONES_GOOGLE_FORMS.md`

## ✨ Resultado Final

Una vez configurado, cuando alguien complete el formulario en `25.html`:
- ✅ Las respuestas se guardan en **Firebase** (si está configurado)
- ✅ Las respuestas se guardan en **Google Forms** (si está configurado)
- ✅ Puedes ver estadísticas en Google Forms
- ✅ Puedes exportar los datos a Excel desde Google Forms
- ✅ Todo es completamente anónimo

¡Listo! 🎉

