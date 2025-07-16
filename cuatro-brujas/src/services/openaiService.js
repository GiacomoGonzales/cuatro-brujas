// Función para llamar a la API de OpenAI
async function llamarOpenAI(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return {
      success: true,
      data: "✨ Esta es una respuesta de prueba. La funcionalidad completa requiere una API key válida de OpenAI."
    };
  }

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
        temperature: 0.7,
        max_tokens: 250 // Aumentado para permitir aproximadamente 800 caracteres
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
export async function consultarBruja(promptBase, datosCliente) {
  // Construir el prompt
  const systemMessage = {
    role: "system",
    content: "Eres una bruja mística experta en tu área. Mantén un tono místico pero accesible, y ofrece consejos prácticos y específicos. Tus respuestas deben ser concisas, no más de 800 caracteres."
  };

  const userMessage = {
    role: "user",
    content: `
${promptBase}

DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos arriba.
IMPORTANTE: Tu respuesta debe ser concisa y no exceder los 800 caracteres.`
  };

  // Llamar a la API
  const result = await llamarOpenAI([systemMessage, userMessage]);

  if (!result.success) {
    throw new Error(result.error);
  }

  // Asegurar que la respuesta no exceda 800 caracteres
  let respuesta = result.data;
  if (respuesta.length > 800) {
    respuesta = respuesta.substring(0, 797) + "...";
  }

  return respuesta;
} 