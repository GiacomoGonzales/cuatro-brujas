import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCompletedReadingInfo, hasValidAccess, isPermanentCode, resetPermanentCodeSession } from '../services/sessionService';
import { brujas } from '../data/brujas';

const LecturaCompletadaPage = () => {
  const navigate = useNavigate();
  const [readingInfo, setReadingInfo] = useState(null);
  const [showDevOptions, setShowDevOptions] = useState(false);

  useEffect(() => {
    // Verificar si tiene acceso válido
    if (!hasValidAccess()) {
      console.log('❌ Acceso denegado: código de acceso requerido');
      navigate('/viaje-mistico');
      return;
    }

    // Obtener información de la lectura completada
    const info = getCompletedReadingInfo();
    if (!info) {
      // Si no hay lectura completada, redirigir a lecturas
      navigate('/lecturas');
      return;
    }

    setReadingInfo(info);
    
    // Mostrar opciones de desarrollo si es código permanente
    if (isPermanentCode()) {
      setShowDevOptions(true);
    }
  }, [navigate]);

  const handleNewReading = () => {
    if (isPermanentCode()) {
      resetPermanentCodeSession();
      navigate('/lecturas');
    }
  };

  const getBrujaName = (brujaId) => {
    const bruja = brujas[brujaId];
    return bruja ? bruja.name : 'Bruja Desconocida';
  };

  const getTipoLecturaText = (tipo) => {
    switch (tipo) {
      case 'consulta':
        return 'Consulta Personalizada';
      case 'tarot':
        return 'Lectura de Tarot';
      default:
        return 'Lectura Mística';
    }
  };

  if (!readingInfo) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-light">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="magical-card p-8 md:p-12">
            {/* Icono principal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6"
            >
              ✨
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-light mb-4"
            >
              ¡Lectura Completada!
            </motion.h1>

            {/* Información de la lectura */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/30 rounded-lg p-6 mb-8 text-light/80"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Bruja Consultada:</span>
                  <span>{getBrujaName(readingInfo.brujaConsultada)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tipo de Lectura:</span>
                  <span>{getTipoLecturaText(readingInfo.tipoLectura)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Código Usado:</span>
                  <span className="font-mono text-secondary">{readingInfo.codigoUsado}</span>
                </div>
              </div>
            </motion.div>

            {/* Mensaje principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-light/70 mb-8 space-y-4"
            >
              <p className="text-lg">
                Tu sesión mística ha sido completada. Cada código de acceso permite una sola consulta para mantener la energía pura de la lectura.
              </p>
              <p>
                Si deseas otra consulta, necesitarás un nuevo código de acceso.
              </p>
            </motion.div>

            {/* Botones de acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              {/* Opciones de desarrollo (solo para códigos permanentes) */}
              {showDevOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4"
                >
                  <div className="text-yellow-300 text-sm mb-3">
                    🛠️ Opciones de Desarrollo (Código Permanente)
                  </div>
                  <button
                    onClick={handleNewReading}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 mb-2"
                  >
                    🔄 Reiniciar Sesión (Nueva Lectura)
                  </button>
                </motion.div>
              )}

              {/* Botón principal */}
              <Link
                to="/"
                className="magical-btn inline-block w-full py-3"
              >
                Volver al Inicio
              </Link>
            </motion.div>

            {/* Mensaje adicional */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-light/50 text-sm"
            >
              <p>
                ¿Necesitas un nuevo código? Realiza un pedido en nuestro restaurante y recibirás uno nuevo.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LecturaCompletadaPage;
