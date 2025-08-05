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
  const { prompt, config = {} } = bruja;
  
  // Construir el prompt
  const systemMessage = {
    role: "system",
    content: "Eres una bruja mística experta en tu área. Mantén un tono místico pero accesible, y ofrece consejos prácticos y específicos."
  };

  const userMessage = {
    role: "user",
    content: `
${prompt}

DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos arriba.`
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