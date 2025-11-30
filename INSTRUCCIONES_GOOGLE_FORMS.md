# Instrucciones para Configurar Google Forms

## 🚀 Método Rápido: Usar Google Apps Script (RECOMENDADO)

Este es el método más fácil y automático. El script crea el formulario y te da toda la configuración lista para usar.

### Paso 1: Crear el Formulario Automáticamente

1. **Abre el archivo `crear_formulario_google.gs`** que está en este proyecto
2. **Ve a [Google Apps Script](https://script.google.com)**
3. **Crea un nuevo proyecto:**
   - Haz clic en "Nuevo proyecto"
   - Borra el código de ejemplo
4. **Pega todo el código** del archivo `crear_formulario_google.gs`
5. **Guarda el proyecto** (Ctrl+S o Cmd+S)
6. **Ejecuta la función:**
   - En el menú superior, selecciona la función `crearFormulario25N`
   - Haz clic en el botón "Ejecutar" ▶️
   - La primera vez te pedirá autorización, acepta los permisos
7. **Revisa los resultados:**
   - Ve a "Ejecuciones" en el menú lateral
   - Haz clic en la ejecución más reciente
   - Verás el Form ID y todos los Entry IDs en el log
   - También se creará una hoja de cálculo con toda la información

### Paso 2: Copiar la Configuración

El script te mostrará en el log algo como esto:

```
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

### Paso 3: Actualizar 25.html

1. Abre el archivo `25.html`
2. Busca la sección `GOOGLE_FORM_CONFIG` (alrededor de la línea 380)
3. Reemplaza toda la configuración con la que te dio el script
4. Guarda el archivo

¡Listo! El formulario ya está configurado.

---

## 📝 Método Manual: Si Prefieres Crear el Formulario Manualmente

### Paso 1: Crear el Formulario de Google

1. Ve a [Google Forms](https://forms.google.com)
2. Crea un nuevo formulario
3. Configura el título: "Encuesta 25N - Violencia contra la Mujer"

### Paso 2: Agregar las Preguntas

Agrega exactamente 10 preguntas de tipo **Opción múltiple** con estas opciones:
- Sí
- No

**Preguntas en orden (deben estar en este orden exacto):**
1. ¿Alguna vez has cambiado tu ruta a casa por miedo a ser acosada?
2. ¿Tu pareja o entorno revisa tu celular o te pide contraseñas?
3. ¿Te han hecho comentarios inapropiados sobre tu cuerpo en el trabajo o escuela?
4. ¿Sientes que tus opiniones son menospreciadas por ser mujer?
5. ¿Has sentido miedo de decir "no" a alguien por las consecuencias que podría tener?
6. ¿Alguien controla cómo gastas tu dinero o te prohíbe trabajar o estudiar?
7. ¿Te han amenazado, insultado o humillado en público o privado?
8. ¿Has sido presionada o forzada a tener relaciones sexuales o contacto físico no deseado?
9. ¿Te han aislado de tus amigos, familia o redes de apoyo?
10. ¿Has recibido mensajes, llamadas o contactos no deseados de forma persistente?

### Paso 3: Obtener el Form ID

1. Abre tu formulario en modo **vista previa**
2. La URL será algo como: `https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXX/viewform`
3. Copia el ID que está entre `/d/e/` y `/viewform`
   - Ejemplo: `1FAIpQLSdXXXXXXXXX`

### Paso 4: Obtener los Entry IDs

**Opción A: Usar el Script en la Consola (Más Fácil)**

1. Abre el archivo `obtener_entry_ids.html` en tu navegador
2. Sigue las instrucciones del "Método 2"
3. O abre tu formulario en modo **edición**
4. Abre la consola del navegador (F12)
5. Copia y pega el script que está en `obtener_entry_ids.html`
6. Ejecuta el script
7. Copia la configuración que aparece en la consola

**Opción B: Inspeccionar Manualmente**

1. Abre el formulario en modo **edición**
2. Para cada pregunta:
   - Haz clic derecho en la pregunta
   - Selecciona "Inspeccionar" o presiona F12
   - En el código HTML, busca `name="entry.XXXXXXXXX"`
   - Copia el valor completo (ej: `entry.123456789`)

### Paso 5: Configurar el Código

1. Abre el archivo `25.html`
2. Busca la sección `GOOGLE_FORM_CONFIG` (alrededor de la línea 380)
3. Reemplaza los valores:

```javascript
const GOOGLE_FORM_CONFIG = {
    enabled: true, // Cambia a true
    formId: 'TU_FORM_ID_AQUI', // Pega tu FORM_ID aquí
    entryIds: {
        q1: 'entry.123456789', // Pega el Entry ID de la pregunta 1
        q2: 'entry.987654321', // Pega el Entry ID de la pregunta 2
        q3: 'entry.111111111', // Pega el Entry ID de la pregunta 3
        q4: 'entry.222222222', // Pega el Entry ID de la pregunta 4
        q5: 'entry.333333333', // Pega el Entry ID de la pregunta 5
        q6: 'entry.444444444', // Pega el Entry ID de la pregunta 6
        q7: 'entry.555555555', // Pega el Entry ID de la pregunta 7
        q8: 'entry.666666666', // Pega el Entry ID de la pregunta 8
        q9: 'entry.777777777', // Pega el Entry ID de la pregunta 9
        q10: 'entry.888888888' // Pega el Entry ID de la pregunta 10
    }
};
```

### Paso 6: Verificar

1. Guarda el archivo `25.html`
2. Abre la página en tu navegador
3. Completa el formulario
4. Verifica en Google Forms que las respuestas se están guardando
   - Ve a tu formulario de Google
   - Haz clic en "Respuestas"
   - Deberías ver las respuestas guardadas

---

## 📋 Notas Importantes

- ✅ Las respuestas se guardan en **ambos lugares**: Firebase Y Google Forms
- ✅ El formulario funciona de forma **completamente anónima**
- ✅ Si no configuras Google Forms, el formulario seguirá funcionando y guardará solo en Firebase
- ✅ Puedes usar Google Forms para ver estadísticas y exportar datos a Excel

## 🔧 Solución de Problemas

**Si las respuestas no se guardan en Google Forms:**
- ✅ Verifica que `enabled: true`
- ✅ Verifica que el `formId` sea correcto (sin espacios ni caracteres extra)
- ✅ Verifica que los `entryIds` coincidan exactamente con las preguntas
- ✅ Abre la consola del navegador (F12) para ver errores
- ✅ Asegúrate de que el formulario de Google esté publicado (no en borrador)

**Si el script de Google Apps Script da error:**
- Asegúrate de haber aceptado todos los permisos
- Verifica que tengas una cuenta de Google activa
- Intenta ejecutar el script de nuevo

**Para encontrar Entry IDs más fácilmente:**
- Usa el archivo `obtener_entry_ids.html` que incluye un script automático
- O usa la extensión "Form Ranger" para Chrome

