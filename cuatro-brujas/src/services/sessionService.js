/**
 * Servicio para manejar el control de sesiones y lecturas
 * Evita que un cliente pueda hacer múltiples lecturas con el mismo código de acceso
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Guarda la información de la sesión después de validar el código
 * @param {string} code - El código de acceso validado
 * @param {Object} codeData - Los datos del código validado
 */
export const saveSessionData = (code, codeData) => {
  const sessionData = {
    accessValidated: true,
    accessCode: code,
    sessionStartTime: new Date().toISOString(),
    lecturaCompleted: false,
    codeData: codeData
  };
  
  sessionStorage.setItem('brujaSession', JSON.stringify(sessionData));
  
  // Mantener compatibilidad con el sistema existente
  sessionStorage.setItem('accessValidated', 'true');
  
  console.log('✅ Sesión iniciada para código:', code);
};

/**
 * Obtiene los datos de la sesión actual
 * @returns {Object|null} Los datos de la sesión o null si no existe
 */
export const getSessionData = () => {
  try {
    const sessionData = sessionStorage.getItem('brujaSession');
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error al obtener datos de sesión:', error);
    return null;
  }
};

/**
 * Verifica si el usuario tiene acceso válido
 * @returns {boolean} True si tiene acceso válido
 */
export const hasValidAccess = () => {
  const sessionData = getSessionData();
  return sessionData && sessionData.accessValidated === true;
};

/**
 * Verifica si ya se completó una lectura en esta sesión
 * @returns {boolean} True si ya se completó una lectura
 */
export const hasCompletedReading = () => {
  const sessionData = getSessionData();
  return sessionData && sessionData.lecturaCompleted === true;
};

/**
 * Marca la lectura como completada y la guarda en Firebase
 * @param {string} brujaId - ID de la bruja consultada
 * @param {string} lecturaType - Tipo de lectura realizada
 * @param {Object} clientData - Datos del cliente (opcional)
 */
export const markReadingCompleted = async (brujaId, lecturaType = 'general', clientData = {}) => {
  const sessionData = getSessionData();
  
  if (sessionData) {
    const completedAt = new Date().toISOString();
    
    // Actualizar datos de sesión local
    sessionData.lecturaCompleted = true;
    sessionData.lecturaCompletedAt = completedAt;
    sessionData.brujaConsultada = brujaId;
    sessionData.tipoLectura = lecturaType;
    
    sessionStorage.setItem('brujaSession', JSON.stringify(sessionData));
    
    // Guardar lectura en Firebase para estadísticas del admin
    try {
      await saveReadingToFirebase({
        brujaId,
        lecturaType,
        completedAt,
        accessCode: sessionData.accessCode,
        clientData: {
          nombre: clientData.nombre || clientData.nombreCompleto || 'Anónimo',
          ...clientData
        }
      });
    } catch (error) {
      console.error('Error guardando lectura en Firebase:', error);
      // No interferir con la experiencia del usuario si falla el guardado
    }
    
    console.log('✅ Lectura marcada como completada:', {
      bruja: brujaId,
      tipo: lecturaType,
      codigo: sessionData.accessCode
    });
  }
};

/**
 * Guarda una lectura completada en Firebase para estadísticas
 * @param {Object} readingData - Datos de la lectura
 */
const saveReadingToFirebase = async (readingData) => {
  try {
    const readingRecord = {
      brujaId: readingData.brujaId,
      lecturaType: readingData.lecturaType,
      completedAt: serverTimestamp(),
      accessCode: readingData.accessCode,
      clientName: readingData.clientData.nombre,
      clientData: readingData.clientData,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, 'completedReadings'), readingRecord);
    console.log('✅ Lectura guardada en Firebase para estadísticas');
  } catch (error) {
    console.error('❌ Error guardando lectura en Firebase:', error);
    throw error;
  }
};

/**
 * Obtiene información sobre la lectura completada
 * @returns {Object|null} Información de la lectura o null si no se ha completado
 */
export const getCompletedReadingInfo = () => {
  const sessionData = getSessionData();
  
  if (sessionData && sessionData.lecturaCompleted) {
    return {
      brujaConsultada: sessionData.brujaConsultada,
      tipoLectura: sessionData.tipoLectura,
      completadaEn: sessionData.lecturaCompletedAt,
      codigoUsado: sessionData.accessCode
    };
  }
  
  return null;
};

/**
 * Limpia todos los datos de la sesión
 */
export const clearSession = () => {
  sessionStorage.removeItem('brujaSession');
  sessionStorage.removeItem('accessValidated');
  console.log('🧹 Sesión limpiada');
};

/**
 * Verifica si el código de acceso es permanente (para desarrollo)
 * @returns {boolean} True si es un código permanente
 */
export const isPermanentCode = () => {
  const sessionData = getSessionData();
  return sessionData && sessionData.codeData && sessionData.codeData.permanent === true;
};

/**
 * Reinicia la sesión para códigos permanentes (solo para desarrollo)
 */
export const resetPermanentCodeSession = () => {
  const sessionData = getSessionData();
  
  if (sessionData && isPermanentCode()) {
    sessionData.lecturaCompleted = false;
    sessionData.lecturaCompletedAt = null;
    sessionData.brujaConsultada = null;
    sessionData.tipoLectura = null;
    
    sessionStorage.setItem('brujaSession', JSON.stringify(sessionData));
    
    console.log('🔄 Sesión reiniciada para código permanente:', sessionData.accessCode);
    return true;
  }
  
  return false;
};
