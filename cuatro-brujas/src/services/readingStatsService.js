import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  startAfter,
  endBefore,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { brujas } from '../data/brujas';

/**
 * Obtiene estadísticas de lecturas por bruja
 * @param {string} period - Periodo: '7d', '30d', '90d', 'all'
 * @returns {Promise<Object>} Estadísticas por bruja
 */
export const getReadingStatsByWitch = async (period = '30d') => {
  try {
    const dateFilter = getDateFilter(period);
    let q = collection(db, 'completedReadings');

    // Aplicar filtro de fecha si no es 'all'
    if (dateFilter) {
      q = query(
        collection(db, 'completedReadings'),
        where('completedAt', '>=', dateFilter),
        orderBy('completedAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'completedReadings'),
        orderBy('completedAt', 'desc')
      );
    }

    const querySnapshot = await getDocs(q);
    const readings = [];

    querySnapshot.forEach((doc) => {
      readings.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Contar por bruja
    const statsByWitch = {};
    
    // Inicializar contadores para todas las brujas
    Object.keys(brujas).forEach(brujaId => {
      statsByWitch[brujaId] = {
        nombre: brujas[brujaId].nombre,
        servicio: brujas[brujaId].servicio,
        count: 0,
        percentage: 0,
        recentReadings: []
      };
    });

    // Contar lecturas
    readings.forEach(reading => {
      const brujaId = reading.brujaId;
      if (statsByWitch[brujaId]) {
        statsByWitch[brujaId].count++;
        
        // Agregar a lecturas recientes (máximo 5)
        if (statsByWitch[brujaId].recentReadings.length < 5) {
          statsByWitch[brujaId].recentReadings.push({
            clientName: reading.clientName || 'Anónimo',
            completedAt: reading.completedAt,
            accessCode: reading.accessCode,
            lecturaType: reading.lecturaType
          });
        }
      }
    });

    // Calcular porcentajes
    const totalReadings = readings.length;
    Object.keys(statsByWitch).forEach(brujaId => {
      if (totalReadings > 0) {
        statsByWitch[brujaId].percentage = 
          Math.round((statsByWitch[brujaId].count / totalReadings) * 100);
      }
    });

    return {
      statsByWitch,
      totalReadings,
      period,
      periodLabel: getPeriodLabel(period)
    };

  } catch (error) {
    console.error('Error obteniendo estadísticas de lecturas:', error);
    return {
      statsByWitch: {},
      totalReadings: 0,
      period,
      periodLabel: getPeriodLabel(period),
      error: error.message
    };
  }
};

/**
 * Obtiene las lecturas más recientes
 * @param {number} limitCount - Número de lecturas a obtener
 * @returns {Promise<Array>} Array de lecturas recientes
 */
export const getRecentReadings = async (limitCount = 20) => {
  try {
    const q = query(
      collection(db, 'completedReadings'),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const readings = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      readings.push({
        id: doc.id,
        ...data,
        brujaName: brujas[data.brujaId]?.nombre || 'Desconocida',
        brujaServicio: brujas[data.brujaId]?.servicio || 'N/A'
      });
    });

    return readings;
  } catch (error) {
    console.error('Error obteniendo lecturas recientes:', error);
    return [];
  }
};

/**
 * Obtiene estadísticas por periodo (diario, semanal, etc.)
 * @param {string} period - Periodo de análisis
 * @returns {Promise<Object>} Estadísticas temporales
 */
export const getTemporalStats = async (period = '30d') => {
  try {
    const readings = await getAllReadingsInPeriod(period);
    
    // Agrupar por día/semana según el periodo
    const groupedData = groupReadingsByTime(readings, period);
    
    return {
      success: true,
      data: groupedData,
      total: readings.length
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas temporales:', error);
    return {
      success: false,
      error: error.message,
      data: {},
      total: 0
    };
  }
};

/**
 * Helpers internos
 */

function getDateFilter(period) {
  const now = new Date();
  
  switch (period) {
    case '7d':
      return Timestamp.fromDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
    case '30d':
      return Timestamp.fromDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
    case '90d':
      return Timestamp.fromDate(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000));
    case 'all':
    default:
      return null;
  }
}

function getPeriodLabel(period) {
  const labels = {
    '7d': 'Últimos 7 días',
    '30d': 'Últimos 30 días', 
    '90d': 'Últimos 3 meses',
    'all': 'Desde siempre'
  };
  return labels[period] || 'Periodo desconocido';
}

async function getAllReadingsInPeriod(period) {
  const dateFilter = getDateFilter(period);
  let q;

  if (dateFilter) {
    q = query(
      collection(db, 'completedReadings'),
      where('completedAt', '>=', dateFilter),
      orderBy('completedAt', 'desc')
    );
  } else {
    q = query(
      collection(db, 'completedReadings'),
      orderBy('completedAt', 'desc')
    );
  }

  const querySnapshot = await getDocs(q);
  const readings = [];

  querySnapshot.forEach((doc) => {
    readings.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return readings;
}

function groupReadingsByTime(readings, period) {
  const grouped = {};
  
  readings.forEach(reading => {
    if (reading.completedAt) {
      const date = reading.completedAt.toDate();
      let key;
      
      if (period === '7d') {
        // Agrupar por día
        key = date.toLocaleDateString('es-ES');
      } else {
        // Agrupar por semana o mes según el periodo
        key = date.toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'short',
          day: period === '30d' ? 'numeric' : undefined
        });
      }
      
      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          count: 0,
          readings: []
        };
      }
      
      grouped[key].count++;
      grouped[key].readings.push(reading);
    }
  });
  
  return grouped;
}

/**
 * Formatear fecha para mostrar en el admin
 * @param {*} timestamp - Timestamp de Firebase
 * @returns {string} Fecha formateada
 */
export const formatReadingDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Fecha inválida';
  }
};
