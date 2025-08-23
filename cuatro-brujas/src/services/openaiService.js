// Función para llamar a la API de OpenAI con configuración dinámica
async function llamarOpenAI(messages, config = {}) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return {
      success: true,
      data: "✨ Esta es una respuesta de prueba. La funcionalidad completa requiere una API key válida de OpenAI."
    };
  }

  // Configuración por defecto
  const defaultConfig = {
    max_tokens: 250,
    temperature: 0.7
  };
  
  const finalConfig = { ...defaultConfig, ...config };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: finalConfig.temperature,
        max_tokens: finalConfig.max_tokens
      })
    });

    if (!response.ok) {
      throw new Error('Error en la llamada a OpenAI');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.choices[0].message.content
    };
  } catch (error) {
    return {
      success: false,
      error: 'No se pudo realizar la consulta mística en este momento.'
    };
  }
}

// Función principal para consultar a la bruja
export async function consultarBruja(bruja, datosCliente) {
  // Extraer datos de la bruja
  const { prompt, config = {}, nombre } = bruja;
  
  // Calcular fechas dinámicas
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = today.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay() + 1); // Lunes de la semana actual
  const weekStart = currentWeekStart.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentMonth = today.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
  
  // Crear prompt temporal dinámico según la bruja seleccionada
  let temporalPrompt = '';
  const selectedWitch = nombre.toLowerCase();
  
  switch (selectedWitch) {
    case 'calypso': 
      temporalPrompt = `Hoy es ${currentDate}. Realiza una lectura de tarot centrada únicamente en este día.`;
      break;
    case 'orula': 
      temporalPrompt = `Hoy es ${currentDate}. Esta lectura de numerología es para la semana que comienza el ${weekStart}.`;
      break;
    case 'zaira': 
      temporalPrompt = `Hoy es ${currentDate}. Evalúa la energía y los chakras del consultante para todo el mes de ${currentMonth}.`;
      break;
    case 'sirona': 
      temporalPrompt = `Hoy es ${currentDate}. Interpreta los astros y predice el destino para el año ${currentYear}.`;
      break;
    default:
      temporalPrompt = `Hoy es ${currentDate}. Realiza tu lectura mística con esta fecha como referencia.`;
  }
  
  // Construir el prompt con contexto temporal dinámico
  const systemMessage = {
    role: "system",
    content: `${temporalPrompt}\n\n${prompt}`
  };

  const userMessage = {
    role: "user",
    content: `DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos en el contexto del sistema.`
  };

  // Llamar a la API con la configuración específica de la bruja
  const result = await llamarOpenAI([systemMessage, userMessage], config);

  if (!result.success) {
    throw new Error(result.error);
  }

  // Calcular límite dinámico basado en tokens (aprox 4.5 caracteres por token en español)
  const limiteCaracteres = (config.max_tokens || 250) * 4.5;
  
  // Asegurar que la respuesta no exceda el límite calculado solo si es excesivamente larga
  let respuesta = result.data;
  if (respuesta.length > limiteCaracteres) {
    respuesta = respuesta.substring(0, limiteCaracteres - 3) + "...";
  }

  return respuesta;
} 