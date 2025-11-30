/**
 * Script de Google Apps Script para crear automáticamente el formulario 25N
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega este código completo
 * 4. Ejecuta la función crearFormulario25N()
 * 5. El script te dará el Form ID y los Entry IDs
 */

function crearFormulario25N() {
  // Crear el formulario
  const form = FormApp.create('Encuesta 25N - Violencia contra la Mujer');
  form.setDescription('Cuestionario anónimo sobre la realidad diaria de las mujeres. Todas las respuestas son confidenciales.');
  
  // Preguntas en el mismo orden que en el HTML
  const preguntas = [
    '¿Alguna vez has cambiado tu ruta a casa por miedo a ser acosada?',
    '¿Tu pareja o entorno revisa tu celular o te pide contraseñas?',
    '¿Te han hecho comentarios inapropiados sobre tu cuerpo en el trabajo o escuela?',
    '¿Sientes que tus opiniones son menospreciadas por ser mujer?',
    '¿Has sentido miedo de decir "no" a alguien por las consecuencias que podría tener?',
    '¿Alguien controla cómo gastas tu dinero o te prohíbe trabajar o estudiar?',
    '¿Te han amenazado, insultado o humillado en público o privado?',
    '¿Has sido presionada o forzada a tener relaciones sexuales o contacto físico no deseado?',
    '¿Te han aislado de tus amigos, familia o redes de apoyo?',
    '¿Has recibido mensajes, llamadas o contactos no deseados de forma persistente?'
  ];
  
  const entryIds = {};
  const items = [];
  
  // Crear cada pregunta
  preguntas.forEach((pregunta, index) => {
    const item = form.addMultipleChoiceItem();
    item.setTitle(pregunta)
        .setRequired(true)
        .setChoiceValues(['Sí', 'No']);
    
    items.push(item);
    
    // Obtener el Entry ID
    const entryId = item.getId();
    entryIds[`q${index + 1}`] = entryId;
  });
  
  // Obtener el Form ID de la URL
  const formId = form.getId();
  const formUrl = form.getPublishedUrl();
  
  // Extraer el ID de la URL (formato: /d/e/FORM_ID/viewform)
  const urlMatch = formUrl.match(/\/d\/e\/([^\/]+)\//);
  const extractedFormId = urlMatch ? urlMatch[1] : formId;
  
  // Mostrar resultados en el log
  console.log('=== FORMULARIO CREADO EXITOSAMENTE ===');
  console.log('URL del formulario:', formUrl);
  console.log('\n=== CONFIGURACIÓN PARA 25.HTML ===');
  console.log('Copia y pega esto en el archivo 25.html:');
  console.log('\nconst GOOGLE_FORM_CONFIG = {');
  console.log('    enabled: true,');
  console.log(`    formId: '${extractedFormId}',`);
  console.log('    entryIds: {');
  
  Object.keys(entryIds).forEach(key => {
    console.log(`        ${key}: '${entryIds[key]}',`);
  });
  
  console.log('    }');
  console.log('};');
  
  console.log('\n=== ENTRY IDS DETALLADOS ===');
  Object.keys(entryIds).forEach(key => {
    console.log(`${key}: ${entryIds[key]}`);
  });
  
  // También guardar en una hoja de cálculo para referencia
  try {
    const ss = SpreadsheetApp.create('Configuración Formulario 25N');
    const sheet = ss.getActiveSheet();
    
    sheet.appendRow(['Configuración del Formulario 25N']);
    sheet.appendRow(['']);
    sheet.appendRow(['Form ID:', extractedFormId]);
    sheet.appendRow(['URL:', formUrl]);
    sheet.appendRow(['']);
    sheet.appendRow(['Entry IDs:']);
    sheet.appendRow(['Pregunta', 'Entry ID']);
    
    Object.keys(entryIds).forEach(key => {
      const preguntaNum = key.replace('q', '');
      sheet.appendRow([`Pregunta ${preguntaNum}`, entryIds[key]]);
    });
    
    console.log('\n=== HOJA DE CÁLCULO CREADA ===');
    console.log('URL de la hoja:', ss.getUrl());
    console.log('Los datos también están guardados en esta hoja de cálculo.');
  } catch (e) {
    console.log('No se pudo crear la hoja de cálculo:', e);
  }
  
  return {
    formId: extractedFormId,
    formUrl: formUrl,
    entryIds: entryIds
  };
}

/**
 * Función auxiliar para obtener los Entry IDs de un formulario existente
 * Úsala si ya tienes un formulario creado
 */
function obtenerEntryIds() {
  // Reemplaza 'TU_FORM_ID' con el ID de tu formulario
  const formId = 'TU_FORM_ID';
  const form = FormApp.openById(formId);
  const items = form.getItems();
  
  console.log('=== ENTRY IDS DEL FORMULARIO ===');
  items.forEach((item, index) => {
    console.log(`Pregunta ${index + 1}: ${item.getId()}`);
  });
  
  return items.map(item => item.getId());
}

