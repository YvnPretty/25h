# 📋 Guía Visual para Obtener Entry IDs

## ⚠️ IMPORTANTE: Necesitas el MODO EDICIÓN, no el iframe

El iframe que compartiste es la **vista previa** del formulario. Para obtener los Entry IDs necesitas estar en **modo edición**.

## 🎯 Pasos Detallados:

### Paso 1: Abre el Formulario en Modo Edición

**URL de Edición:**
```
https://docs.google.com/forms/d/1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg/edit
```

**O haz clic aquí:** [Abrir en Modo Edición](https://docs.google.com/forms/d/1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg/edit)

**Diferencia:**
- ❌ Vista previa: `/viewform` o `/viewform?embedded=true` (iframe)
- ✅ Modo edición: `/edit` (aquí es donde puedes obtener los Entry IDs)

### Paso 2: Abre las Herramientas de Desarrollador

1. Presiona **F12** en tu teclado
2. O haz clic derecho → "Inspeccionar" → "Console"

### Paso 3: Ejecuta el Script

1. Abre el archivo `script_entry_ids.js`
2. Copia **TODO** el contenido
3. Pégalo en la consola
4. Presiona **Enter**

### Paso 4: Copia la Configuración

El script mostrará algo como:

```javascript
const GOOGLE_FORM_CONFIG = {
    enabled: true,
    formId: '1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg',
    entryIds: {
        q1: 'entry.123456789',
        q2: 'entry.987654321',
        ...
    }
};
```

### Paso 5: Actualiza 25.html

1. Abre `25.html`
2. Busca `GOOGLE_FORM_CONFIG` (línea ~583)
3. Reemplaza toda la sección con la configuración copiada
4. Guarda el archivo

### Paso 6: Reconstruye el Contenedor

```bash
docker-compose up -d --build
```

## 🔍 Método Alternativo (Manual)

Si el script no funciona, puedes obtener los Entry IDs manualmente:

1. En modo edición, haz clic derecho en la **primera pregunta**
2. Selecciona "Inspeccionar"
3. Busca en el código: `name="entry.XXXXXXXXX"`
4. Copia el valor (ejemplo: `entry.123456789`)
5. Repite para las 10 preguntas

## ✅ Verificación

Una vez configurado, cuando alguien complete el formulario en tu página:
- Las respuestas se guardarán automáticamente en tu Google Form
- Podrás verlas en: https://docs.google.com/forms/d/1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg/edit#responses

