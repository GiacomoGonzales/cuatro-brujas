// Firebase no está configurado actualmente - usando modo simulación
// Cuando se configure Firebase, descomentar las importaciones necesarias

// Simulación para desarrollo sin Firebase
const db = null;

/**
 * Crea un código de acceso de prueba en Firestore
 * @returns {Promise<boolean>} - true si se creó exitosamente
 */
export const createTestAccessCode = async () => {
  try {
    // Si no hay conexión a Firestore, simular el comportamiento
    if (!db) {
      console.log('🔧 Modo simulación: Firebase no configurado');
      console.log('✅ Código de prueba "PRUEBA123" creado correctamente en Firestore (simulado).');
      return true;
    }

    // Calcular fecha de expiración (30 días desde ahora)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Simulación de datos para desarrollo
    const accessCodeData = {
      code: "PRUEBA123",
      used: false,
      createdAt: new Date(),
      expiresAt: expirationDate,
      type: "general",
      lecturaId: ""
    };

    // Simulación de inserción en modo desarrollo
    console.log('Simulando inserción:', accessCodeData);
    
    console.log('✅ Código de prueba "PRUEBA123" creado correctamente en Firestore (simulado).');
    console.log('📄 ID del documento: simulado-123');
    
    return true;
  } catch (error) {
    console.error('❌ Error al crear código de prueba:', error);
    return false;
  }
};

/**
 * Función auxiliar para verificar si un código existe en Firestore
 * @param {string} code - Código a verificar
 * @returns {Promise<boolean>}
 */
export const checkCodeExists = async (code) => {
  try {
    if (!db) {
      console.log('🔧 Modo simulación: verificando código localmente');
      return code === "PRUEBA123";
    }

    // Simulación para desarrollo sin Firebase
    console.log('Simulando verificación de código:', code);
    return code === "PRUEBA123";
  } catch (error) {
    console.error('❌ Error al verificar código:', error);
    return false;
  }
};

/**
 * Función para limpiar códigos de prueba (útil para desarrollo)
 * @returns {Promise<boolean>}
 */
export const cleanTestCodes = async () => {
  try {
    if (!db) {
      console.log('🔧 Modo simulación: códigos de prueba limpiados');
      return true;
    }

    // Simulación para desarrollo sin Firebase
    console.log('🧹 Simulando limpieza de códigos de prueba');
    console.log('🧹 1 código de prueba eliminado (simulado)');
    return true;
  } catch (error) {
    console.error('❌ Error al limpiar códigos de prueba:', error);
    return false;
  }
};

// Hacer las funciones disponibles globalmente para uso en consola
if (typeof window !== 'undefined') {
  window.createTestAccessCode = createTestAccessCode;
  window.checkCodeExists = checkCodeExists;
  window.cleanTestCodes = cleanTestCodes;
  
  console.log('🛠️ Funciones de utilidad disponibles en consola:');
  console.log('   - createTestAccessCode()');
  console.log('   - checkCodeExists("codigo")');
  console.log('   - cleanTestCodes()');
}