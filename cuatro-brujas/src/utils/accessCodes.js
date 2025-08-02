import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuración de Firebase (debes reemplazar con tus credenciales)
const firebaseConfig = {
  // TODO: Agregar configuración real de Firebase
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Inicializar Firebase (solo si no está ya inicializado)
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase ya está inicializado o hay un error de configuración:', error.message);
  // En modo desarrollo, usar simulación
  db = null;
}

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

    // Datos del documento a crear
    const accessCodeData = {
      code: "PRUEBA123",
      used: false,
      createdAt: serverTimestamp(),
      expiresAt: expirationDate,
      type: "general",
      lecturaId: ""
    };

    // Insertar el documento en la colección accessCodes
    const docRef = await addDoc(collection(db, 'accessCodes'), accessCodeData);
    
    console.log('✅ Código de prueba "PRUEBA123" creado correctamente en Firestore.');
    console.log('📄 ID del documento:', docRef.id);
    
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

    const { getDocs, query, where } = await import('firebase/firestore');
    
    const q = query(collection(db, 'accessCodes'), where('code', '==', code));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
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

    const { getDocs, query, where, deleteDoc, doc } = await import('firebase/firestore');
    
    const q = query(collection(db, 'accessCodes'), where('code', '==', 'PRUEBA123'));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, 'accessCodes', document.id))
    );
    
    await Promise.all(deletePromises);
    
    console.log(`🧹 ${querySnapshot.docs.length} códigos de prueba eliminados`);
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