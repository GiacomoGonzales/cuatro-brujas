// Serverless function para manejar llamadas a OpenAI de forma segura
export default async function handler(req, res) {
  // Solo permitir POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages, config = {} } = req.body;

    // Validar que tenemos mensajes
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    // Usar la API key desde variables de entorno del servidor (sin VITE_)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Configuración del servidor incompleta',
        fallback: "✨ Esta es una respuesta de prueba. La funcionalidad completa requiere una API key válida de OpenAI."
      });
    }

    // Configuración por defecto
    const defaultConfig = {
      max_tokens: 250,
      temperature: 0.7
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Llamar a OpenAI
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
      const errorData = await response.text();
      console.error('Error de OpenAI:', errorData);
      throw new Error('Error en la llamada a OpenAI');
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Error en /api/openai:', error);
    return res.status(500).json({
      success: false,
      error: 'No se pudo realizar la consulta mística en este momento.'
    });
  }
}