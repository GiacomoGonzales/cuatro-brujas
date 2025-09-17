import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Valida un código de acceso
 * @param {string} code - El código a validar
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const validateAccessCode = async (code, retryCount = 0) => {
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
    // Detectar si estamos en móvil para ajustar timeout
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log(`🔍 Validando código ${code} en ${isMobile ? 'móvil' : 'desktop'} (intento ${retryCount + 1})`);

    // Crear promesa con timeout más largo para móviles
    const timeoutMs = isMobile ? 15000 : 10000; // 15s en móvil, 10s en desktop

    const queryPromise = new Promise(async (resolve, reject) => {
      try {
        const q = query(collection(db, 'accessCodes'), where('code', '==', code));
        const querySnapshot = await getDocs(q);
        resolve(querySnapshot);
      } catch (error) {
        reject(error);
      }
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: La conexión está tardando mucho')), timeoutMs);
    });

    const querySnapshot = await Promise.race([queryPromise, timeoutPromise]);

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

    // Marcar código como usado con timeout también
    try {
      const updatePromise = updateDoc(doc(db, 'accessCodes', codeDoc.id), {
        used: true,
        usedAt: new Date()
      });

      const updateTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout updating document')), timeoutMs);
      });

      await Promise.race([updatePromise, updateTimeoutPromise]);
    } catch (updateError) {
      console.warn('⚠️ Error al marcar código como usado (continuando):', updateError);
      // Continuar aunque falle la actualización
    }

    console.log('✅ Código validado exitosamente:', code);
    return {
      success: true,
      message: '¡Código válido! Redirigiendo...',
      codeData: {
        type: codeData.type,
        usedAt: new Date()
      }
    };

  } catch (error) {
    console.error(`❌ Error validando código (intento ${retryCount + 1}):`, error);

    // Reintentar hasta 2 veces en caso de errores de conexión
    if (retryCount < 2 && (
      error.message.includes('Timeout') ||
      error.message.includes('network') ||
      error.message.includes('connection') ||
      error.code === 'unavailable'
    )) {
      console.log(`🔄 Reintentando validación... (${retryCount + 1}/2)`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Esperar 1s, 2s
      return validateAccessCode(code, retryCount + 1);
    }

    return {
      success: false,
      message: error.message.includes('Timeout')
        ? 'La conexión está lenta. Por favor intenta nuevamente.'
        : 'Error al validar el código. Por favor intenta nuevamente.'
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