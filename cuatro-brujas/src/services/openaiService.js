import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

/**
 * Combina el prompt base de la bruja con los datos del cliente y obtiene una respuesta de OpenAI
 * @param {string} promptBase - El prompt base de la bruja que define su personalidad y estilo
 * @param {Object} datosCliente - Datos proporcionados por el cliente para la consulta
 * @returns {Promise<string>} La respuesta generada por la IA
 */
export async function consultarBruja(promptBase, datosCliente) {
  try {
    // Construir el prompt final combinando el base con los datos del cliente
    const promptFinal = `
${promptBase}

DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos arriba.
`;

    // Realizar la llamada a la API de OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres una bruja mística experta en tu área. Mantén un tono místico pero accesible, y ofrece consejos prácticos y específicos."
        },
        {
          role: "user",
          content: promptFinal
        }
      ],
      model: "gpt-4",
      temperature: 0.7, // Balanceamos creatividad con consistencia
      max_tokens: 1000, // Limitamos la longitud de la respuesta
    });

    // Retornar solo el contenido de la respuesta
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error al consultar a la bruja:', error);
    throw new Error('No se pudo realizar la consulta mística en este momento. Por favor, intenta más tarde.');
  }
}

/**
 * Ejemplo de uso:
 * 
 * const respuesta = await consultarBruja(
 *   brujas.calypso.prompt,
 *   {
 *     nombre: "María",
 *     fechaNacimiento: "1990-05-15",
 *     pregunta: "¿Cómo será mi vida amorosa este año?"
 *   }
 * );
 */ 