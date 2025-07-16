import OpenAI from 'openai';

// Inicializar OpenAI solo si la API key está disponible
const initializeOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key no encontrada. Asegúrate de configurar VITE_OPENAI_API_KEY en tu archivo .env');
    return null;
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

const openai = initializeOpenAI();

/**
 * Combina el prompt base de la bruja con los datos del cliente y obtiene una respuesta de OpenAI
 * @param {string} promptBase - El prompt base de la bruja que define su personalidad y estilo
 * @param {Object} datosCliente - Datos proporcionados por el cliente para la consulta
 * @returns {Promise<string>} La respuesta generada por la IA
 */
export async function consultarBruja(promptBase, datosCliente) {
  try {
    if (!openai) {
      throw new Error('OpenAI no está inicializado. Verifica tu configuración de API key.');
    }

    // Construir el prompt final combinando el base con los datos del cliente
    const promptFinal = `
${promptBase}

DATOS DEL CONSULTANTE:
${Object.entries(datosCliente)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Por favor, responde a la consulta manteniendo tu personalidad y estilo definidos arriba.
IMPORTANTE: Tu respuesta debe ser concisa y no exceder los 500 caracteres.
`;

    // Realizar la llamada a la API de OpenAI
    const completion = await openai.chat.completions.create({
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
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 150,
    });

    // Obtener la respuesta y asegurarnos de que no exceda 500 caracteres
    let respuesta = completion.choices[0].message.content;
    if (respuesta.length > 500) {
      respuesta = respuesta.substring(0, 497) + "...";
    }

    return respuesta;
  } catch (error) {
    console.error('Error al consultar a la bruja:', error);
    throw new Error('No se pudo realizar la consulta mística en este momento. Por favor, intenta más tarde.');
  }
}

// Mock function para desarrollo sin API key
export async function mockConsultarBruja(promptBase, datosCliente) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✨ Esta es una respuesta de prueba. La funcionalidad completa requiere una API key válida de OpenAI.");
    }, 1000);
  });
}

// Exportar la función correcta según si tenemos API key o no
export const consultar = openai ? consultarBruja : mockConsultarBruja; 