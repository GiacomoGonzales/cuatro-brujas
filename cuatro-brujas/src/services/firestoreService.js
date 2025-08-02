// Servicio para manejar la validación de códigos de acceso en Firestore
// Este servicio simula la conexión con Firestore para validar códigos

/**
 * Valida un código de acceso
 * @param {string} code - El código a validar
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const validateAccessCode = async (code) => {
  // Simulación de códigos válidos para desarrollo
  // En producción, esto se conectaría a Firestore
  const validCodes = {
    'BRUJA2025': {
      used: false,
      expiresAt: new Date('2025-12-31'),
      type: 'lectura_semanal',
      createdAt: new Date('2025-01-01')
    },
    'MAGIA123': {
      used: false,
      expiresAt: new Date('2025-06-30'),
      type: 'general',
      createdAt: new Date('2025-01-01')
    },
    'HAMBURGUESA': {
      used: true,
      expiresAt: new Date('2025-12-31'),
      type: 'lectura_semanal',
      createdAt: new Date('2025-01-01'),
      usedAt: new Date('2025-01-15')
    },
    'EXPIRADO': {
      used: false,
      expiresAt: new Date('2024-12-31'),
      type: 'general',
      createdAt: new Date('2024-01-01')
    },
    'PRUEBA123': {
      used: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde ahora
      type: 'general',
      createdAt: new Date(),
      lecturaId: ""
    }
  };

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  const codeData = validCodes[code];

  if (!codeData) {
    return {
      success: false,
      message: 'Código inválido. Verifica que hayas ingresado el código correctamente.'
    };
  }

  if (codeData.used) {
    return {
      success: false,
      message: 'Este código ya ha sido utilizado. Cada código solo puede usarse una vez.'
    };
  }

  if (new Date() > codeData.expiresAt) {
    return {
      success: false,
      message: 'Este código ha expirado. Por favor solicita un nuevo código con tu próximo pedido.'
    };
  }

  // Si llegamos aquí, el código es válido
  // En producción, aquí marcaríamos el código como usado en Firestore
  validCodes[code].used = true;
  validCodes[code].usedAt = new Date();

  return {
    success: true,
    message: '¡Código válido! Redirigiendo...',
    codeData: {
      type: codeData.type,
      usedAt: validCodes[code].usedAt
    }
  };
};

/**
 * Conecta con Firestore (implementación futura)
 * Esta función se implementará cuando se configure Firebase
 */
export const initializeFirestore = () => {
  // TODO: Configurar Firebase y Firestore
  console.log('Firestore service initialized (simulation mode)');
};

/**
 * Obtiene todos los códigos de acceso (admin)
 * @returns {Promise<Array>}
 */
export const getAllAccessCodes = async () => {
  // Simulación para desarrollo
  // En producción conectaría con Firestore
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'code1',
      code: 'BRUJA2025',
      used: false,
      expiresAt: new Date('2025-12-31'),
      type: 'lectura_semanal',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 'code2',
      code: 'MAGIA123',
      used: false,
      expiresAt: new Date('2025-06-30'),
      type: 'general',
      createdAt: new Date('2025-01-01')
    }
  ];
};

/**
 * Crea un nuevo código de acceso (admin)
 * @param {Object} codeData - Los datos del código
 * @returns {Promise<{success: boolean, code: string}>}
 */
export const createAccessCode = async (codeData) => {
  // Simulación para desarrollo
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  
  return {
    success: true,
    code: newCode,
    message: 'Código creado exitosamente'
  };
};

// Inicializar el servicio
initializeFirestore();