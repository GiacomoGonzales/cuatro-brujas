import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getReadingStatsByWitch, getRecentReadings, formatReadingDate } from '../services/readingStatsService';

const AdminReadingStats = () => {
  const [stats, setStats] = useState(null);
  const [recentReadings, setRecentReadings] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' o 'recent'

  const periods = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 3 meses' },
    { value: 'all', label: 'Desde siempre' }
  ];

  useEffect(() => {
    loadStats();
  }, [selectedPeriod]);

  useEffect(() => {
    if (activeTab === 'recent') {
      loadRecentReadings();
    }
  }, [activeTab]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError('');
      const statsData = await getReadingStatsByWitch(selectedPeriod);
      setStats(statsData);
    } catch (err) {
      setError('Error cargando estadísticas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentReadings = async () => {
    try {
      const readings = await getRecentReadings(15);
      setRecentReadings(readings);
    } catch (err) {
      console.error('Error cargando lecturas recientes:', err);
    }
  };

  const getBrujaColor = (brujaId) => {
    const colors = {
      calypso: '#9333ea',
      orula: '#059669', 
      aisha: '#dc2626',
      sirona: '#2563eb'
    };
    return colors[brujaId] || '#6b7280';
  };

  const getBrujaEmoji = (brujaId) => {
    const emojis = {
      calypso: '🔮',
      orula: '🔢',
      aisha: '🧘‍♀️',
      sirona: '⭐'
    };
    return emojis[brujaId] || '✨';
  };

  if (loading) {
    return (
      <div className="admin-card h-full" style={{padding: '1.5rem'}}>
        <div className="admin-loading" style={{padding: '2rem 0'}}>
          <div className="admin-spinner" style={{width: '1.5rem', height: '1.5rem'}}></div>
          <span style={{fontSize: '0.875rem'}}>Cargando estadísticas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card h-full" style={{padding: '1.5rem'}}
    >
      {/* Header compacto */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h3 className="admin-card-title" style={{fontSize: '1.125rem', marginBottom: '0'}}>
          📊 Estadísticas de Lecturas
        </h3>

        {/* Tabs más pequeños */}
        <div className="admin-tabs" style={{padding: '0.125rem'}}>
          <button
            onClick={() => setActiveTab('stats')}
            className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
            style={{padding: '0.5rem 0.75rem', fontSize: '0.75rem'}}
          >
            📈 Por Bruja
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`admin-tab ${activeTab === 'recent' ? 'active' : ''}`}
            style={{padding: '0.5rem 0.75rem', fontSize: '0.75rem'}}
          >
            🕐 Recientes
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Selector de periodo compacto */}
            <div className="mb-3">
              <label className="admin-label" style={{fontSize: '0.75rem', marginBottom: '0.25rem'}}>
                Periodo de análisis:
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="admin-select"
                style={{padding: '0.5rem 0.75rem', fontSize: '0.75rem'}}
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="admin-alert admin-alert-error">
                {error}
              </div>
            )}

            {stats && (
              <>
                {/* Resumen total - Compacto en una sola fila */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="admin-stat-card" style={{padding: '0.75rem', textAlign: 'center'}}>
                    <div className="admin-stat-number" style={{color: '#4299e1', fontSize: '1.5rem'}}>{stats.totalReadings}</div>
                    <div className="admin-stat-label" style={{fontSize: '0.6875rem'}}>Total de Lecturas</div>
                    <div className="admin-stat-sublabel" style={{fontSize: '0.625rem'}}>{stats.periodLabel}</div>
                  </div>
                  
                  <div className="admin-stat-card" style={{padding: '0.75rem', textAlign: 'center'}}>
                    <div className="admin-stat-number" style={{color: '#38a169', fontSize: '1.5rem'}}>
                      {Object.keys(stats.statsByWitch).length}
                    </div>
                    <div className="admin-stat-label" style={{fontSize: '0.6875rem'}}>Brujas Activas</div>
                  </div>
                  
                  <div className="admin-stat-card" style={{padding: '0.75rem', textAlign: 'center'}}>
                    <div className="admin-stat-number" style={{color: '#ed8936', fontSize: '1.5rem'}}>
                      {stats.totalReadings > 0 ? 
                        Math.round(stats.totalReadings / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90)) 
                        : 0}
                    </div>
                    <div className="admin-stat-label" style={{fontSize: '0.6875rem'}}>Promedio Diario</div>
                  </div>
                </div>

                {/* Estadísticas por bruja - Ultra compactas */}
                <div className="space-y-2">
                  {Object.entries(stats.statsByWitch)
                    .sort(([,a], [,b]) => b.count - a.count)
                    .map(([brujaId, data]) => (
                      <motion.div
                        key={brujaId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="admin-stat-card"
                        style={{textAlign: 'left', padding: '0.5rem'}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span style={{fontSize: '1rem'}}>{getBrujaEmoji(brujaId)}</span>
                            <div>
                              <h4 className="font-semibold" style={{color: '#2d3748', fontSize: '0.75rem'}}>{data.nombre}</h4>
                              <p style={{color: '#718096', fontSize: '0.625rem'}}>{data.servicio}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: getBrujaColor(brujaId), fontSize: '1rem' }}>
                              {data.count}
                            </div>
                            <div style={{color: '#718096', fontSize: '0.625rem'}}>
                              {data.percentage}%
                            </div>
                          </div>
                        </div>

                        {/* Barra de progreso muy delgada */}
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-1 rounded-full"
                            style={{ backgroundColor: getBrujaColor(brujaId) }}
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'recent' && (
          <motion.div
            key="recent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 style={{fontSize: '1rem', marginBottom: '0.75rem', color: '#2d3748', fontWeight: '600'}}>
              Últimas 10 Lecturas Completadas
            </h4>
            
            {recentReadings.length > 0 ? (
              <div className="admin-list" style={{maxHeight: '300px'}}>
                {recentReadings.slice(0, 10).map((reading) => (
                  <motion.div
                    key={reading.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="admin-list-item"
                    style={{padding: '0.5rem'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{fontSize: '0.875rem'}}>{getBrujaEmoji(reading.brujaId)}</span>
                        <div>
                          <div className="admin-list-item-title" style={{fontSize: '0.75rem'}}>{reading.clientName}</div>
                          <div className="admin-list-item-subtitle" style={{fontSize: '0.625rem'}}>
                            {reading.brujaName} • {reading.lecturaType}
                          </div>
                        </div>
                      </div>
                      <div className="admin-list-item-date" style={{fontSize: '0.625rem'}}>
                        {formatReadingDate(reading.completedAt)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">📊</div>
                <div className="admin-empty-state-text">No hay lecturas registradas aún</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReadingStats;
