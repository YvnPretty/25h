// ============================================
// SCRIPT PARA OBTENER ENTRY IDs DE GOOGLE FORMS
// ============================================
// INSTRUCCIONES:
// 1. Abre tu formulario en MODO EDICIÓN:
//    https://docs.google.com/forms/d/1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg/edit
// 2. Presiona F12 para abrir las herramientas de desarrollador
// 3. Ve a la pestaña "Console"
// 4. Copia y pega TODO este script
// 5. Presiona Enter
// 6. Copia la configuración que aparece

(function() {
    console.clear();
    console.log('%c🔍 Buscando Entry IDs...', 'color: blue; font-size: 16px; font-weight: bold;');
    console.log('');
    
    // Buscar el formulario
    const form = document.querySelector('form');
    if (!form) {
        console.error('%c❌ No se encontró el formulario. Asegúrate de estar en MODO EDICIÓN (no en vista previa).', 'color: red;');
        return;
    }
    
    // Buscar todos los inputs con name que empiecen con "entry."
    const allInputs = document.querySelectorAll('input[name^="entry."]');
    const uniqueEntryIds = new Set();
    
    allInputs.forEach(input => {
        if (input.name && input.name.startsWith('entry.')) {
            uniqueEntryIds.add(input.name);
        }
    });
    
    if (uniqueEntryIds.size === 0) {
        console.error('%c❌ No se encontraron Entry IDs.', 'color: red;');
        console.log('%c💡 Asegúrate de:', 'color: orange;');
        console.log('   1. Estar en MODO EDICIÓN (URL debe tener /edit)');
        console.log('   2. Que el formulario tenga las 10 preguntas');
        console.log('   3. Que las preguntas sean de tipo "Opción múltiple"');
        return;
    }
    
    const entryIdsArray = Array.from(uniqueEntryIds);
    
    if (entryIdsArray.length < 10) {
        console.warn('%c⚠️ Se encontraron solo ' + entryIdsArray.length + ' Entry IDs. Se esperaban 10.', 'color: orange;');
    }
    
    // Crear la configuración
    const config = {};
    entryIdsArray.slice(0, 10).forEach((entryId, index) => {
        config[`q${index + 1}`] = entryId;
    });
    
    // Mostrar resultado
    console.log('%c✅ Entry IDs encontrados:', 'color: green; font-size: 14px; font-weight: bold;');
    console.log('');
    console.log('%c=== CONFIGURACIÓN COMPLETA ===', 'color: purple; font-size: 14px; font-weight: bold;');
    console.log('');
    
    const configString = `const GOOGLE_FORM_CONFIG = {
    enabled: true,
    formId: '1FAIpQLSdYK9Vde8Faed_4BF5H7aeECn-zrJr8wlubfdpZlHn1c0-wbg',
    entryIds: {
        q1: '${config.q1 || 'entry.XXXXX'}',
        q2: '${config.q2 || 'entry.XXXXX'}',
        q3: '${config.q3 || 'entry.XXXXX'}',
        q4: '${config.q4 || 'entry.XXXXX'}',
        q5: '${config.q5 || 'entry.XXXXX'}',
        q6: '${config.q6 || 'entry.XXXXX'}',
        q7: '${config.q7 || 'entry.XXXXX'}',
        q8: '${config.q8 || 'entry.XXXXX'}',
        q9: '${config.q9 || 'entry.XXXXX'}',
        q10: '${config.q10 || 'entry.XXXXX'}'
    }
};`;
    
    console.log(configString);
    console.log('');
    console.log('%c📋 LISTA DE ENTRY IDS:', 'color: blue; font-weight: bold;');
    Object.keys(config).sort().forEach(key => {
        console.log(`   ${key}: ${config[key]}`);
    });
    console.log('');
    console.log('%c💡 SIGUIENTE PASO:', 'color: green; font-weight: bold;');
    console.log('1. Copia la configuración de arriba (desde "const GOOGLE_FORM_CONFIG" hasta "};")');
    console.log('2. Abre el archivo 25.html');
    console.log('3. Busca "GOOGLE_FORM_CONFIG" (línea ~583)');
    console.log('4. Reemplaza toda la sección con la configuración copiada');
    console.log('5. Guarda el archivo');
    console.log('6. Ejecuta: docker-compose up -d --build');
    console.log('');
    
    // Intentar copiar al portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.writeText(configString).then(() => {
            console.log('%c✅ Configuración copiada al portapapeles!', 'color: green; font-weight: bold;');
        }).catch(() => {
            console.log('%c⚠️ No se pudo copiar automáticamente. Copia manualmente.', 'color: orange;');
        });
    }
    
    return config;
})();

