/**
 * Servicio para manejar el control de sesiones y lecturas
 * Evita que un cliente pueda hacer múltiples lecturas con el mismo código de acceso
 */

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
 * Marca la lectura como completada
 * @param {string} brujaId - ID de la bruja consultada
 * @param {string} lecturaType - Tipo de lectura realizada
 */
export const markReadingCompleted = (brujaId, lecturaType = 'general') => {
  const sessionData = getSessionData();
  
  if (sessionData) {
    sessionData.lecturaCompleted = true;
    sessionData.lecturaCompletedAt = new Date().toISOString();
    sessionData.brujaConsultada = brujaId;
    sessionData.tipoLectura = lecturaType;
    
    sessionStorage.setItem('brujaSession', JSON.stringify(sessionData));
    
    console.log('✅ Lectura marcada como completada:', {
      bruja: brujaId,
      tipo: lecturaType,
      codigo: sessionData.accessCode
    });
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
