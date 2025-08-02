import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Valida un código de acceso
 * @param {string} code - El código a validar
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const validateAccessCode = async (code) => {
  // Códigos hardcodeados para desarrollo - verificar PRIMERO
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
    'PRUEBA123': {
      used: false,
      expiresAt: new Date('2099-12-31'), // Nunca expira - código permanente para desarrollo
      type: 'general',
      createdAt: new Date(),
      lecturaId: "",
      permanent: true // Marcador para códigos permanentes
    }
  };

  // Verificar códigos hardcodeados PRIMERO
  const hardcodedCode = validCodes[code];
  if (hardcodedCode) {
    // Para códigos permanentes como PRUEBA123, siempre permitir acceso
    if (hardcodedCode.permanent === true || code === 'PRUEBA123') {
      console.log('✅ Código hardcodeado válido:', code);
      return {
        success: true,
        message: '¡Código válido! Redirigiendo...',
        codeData: {
          type: hardcodedCode.type,
          usedAt: new Date(),
          permanent: hardcodedCode.permanent
        }
      };
    }
    
    // Para otros códigos hardcodeados, verificar si están usados y expiración
    if (!hardcodedCode.used && new Date() <= hardcodedCode.expiresAt) {
      return {
        success: true,
        message: '¡Código válido! Redirigiendo...',
        codeData: {
          type: hardcodedCode.type,
          usedAt: new Date()
        }
      };
    }
  }

  try {
    // Si no es un código hardcodeado, buscar en Firestore
    const q = query(collection(db, 'accessCodes'), where('code', '==', code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'Código inválido. Verifica que hayas ingresado el código correctamente.'
      };
    }

    const codeDoc = querySnapshot.docs[0];
    const codeData = codeDoc.data();

    if (codeData.used) {
      return {
        success: false,
        message: 'Este código ya ha sido utilizado. Cada código solo puede usarse una vez.'
      };
    }

    // Verificar expiración
    const expirationDate = codeData.expiresAt.toDate ? codeData.expiresAt.toDate() : new Date(codeData.expiresAt);
    if (new Date() > expirationDate) {
      return {
        success: false,
        message: 'Este código ha expirado. Por favor solicita un nuevo código con tu próximo pedido.'
      };
    }

    // Marcar código como usado
    await updateDoc(doc(db, 'accessCodes', codeDoc.id), {
      used: true,
      usedAt: new Date()
    });

    return {
      success: true,
      message: '¡Código válido! Redirigiendo...',
      codeData: {
        type: codeData.type,
        usedAt: new Date()
      }
    };

  } catch (error) {
    console.error('Error validating code:', error);
    return {
      success: false,
      message: 'Error al validar el código. Por favor intenta nuevamente.'
    };
  }
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