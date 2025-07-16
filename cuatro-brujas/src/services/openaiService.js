const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Combina el prompt base de la bruja con los datos del cliente y obtiene una respuesta de OpenAI
 * @param {string} promptBase - El prompt base de la bruja que define su personalidad y estilo
 * @param {Object} datosCliente - Datos proporcionados por el cliente para la consulta
 * @returns {Promise<string>} La respuesta generada por la IA
 */
export async function consultarBruja(promptBase, datosCliente) {
  try {
    if (!OPENAI_API_KEY) {
      return "✨ Esta es una respuesta de prueba. La funcionalidad completa requiere una API key válida de OpenAI.";
    }

    // Construir el prompt final
    const promptFinal = `
${promptBase}

DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos arriba.
IMPORTANTE: Tu respuesta debe ser concisa y no exceder los 500 caracteres.
`;

    // Realizar la llamada directamente a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Eres una bruja mística experta en tu área. Mantén un tono místico pero accesible, y ofrece consejos prácticos y específicos. Tus respuestas deben ser concisas, no más de 500 caracteres."
          },
          {
            role: "user",
            content: promptFinal
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la llamada a OpenAI');
    }

    const data = await response.json();
    let respuesta = data.choices[0].message.content;

    // Asegurarnos de que no exceda 500 caracteres
    if (respuesta.length > 500) {
      respuesta = respuesta.substring(0, 497) + "...";
    }

    return respuesta;
  } catch (error) {
    console.error('Error al consultar a la bruja:', error);
    throw new Error('No se pudo realizar la consulta mística en este momento. Por favor, intenta más tarde.');
  }
} 