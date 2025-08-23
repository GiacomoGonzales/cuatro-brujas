import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FormularioBruja from '../components/FormularioBruja';
import BackgroundParticles from '../components/BackgroundParticles';
import { brujas } from '../data/brujas';
import { hasValidAccess, hasCompletedReading, isPermanentCode, markReadingCompleted } from '../services/sessionService';

const ConsultaPage = () => {
  const { idBruja } = useParams();
  const navigate = useNavigate();
  const bruja = brujas[idBruja];

  // Verificar control de acceso al cargar la página
  useEffect(() => {
    // Verificar si tiene acceso válido
    if (!hasValidAccess()) {
      console.log('❌ Acceso denegado: código de acceso requerido');
      navigate('/viaje-mistico');
      return;
    }

    // Verificar si ya completó una lectura (solo para códigos no permanentes)
    if (hasCompletedReading() && !isPermanentCode()) {
      console.log('⚠️ Lectura ya completada - redirigiendo a confirmación');
      navigate('/lectura-completada');
      return;
    }
    
    window.scrollTo(0, 0);
  }, [navigate, idBruja]);

  if (!bruja) {
    return <div className="text-red-500">Bruja no encontrada</div>;
  }

  return (
    <div className="min-h-screen pt-32 md:pt-40 relative">
      <BackgroundParticles />
      
      {/* Avatar de la bruja con efectos místicos */}
      <div className="relative max-w-md mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Aura mística animada */}
          <div className="absolute inset-0 -m-6">
            <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-secondary/10 to-transparent rounded-full 
                          animate-pulse-slow blur-2xl"></div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-radial from-accent/20 via-secondary/10 to-transparent rounded-full 
                        blur-xl"
            ></motion.div>
          </div>

          {/* Imagen/Video de la bruja */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-2 border-secondary/30
                          shadow-lg shadow-secondary/20">
              {bruja.imagen.endsWith('.mp4') ? (
                <video
                  src={bruja.imagen}
                  alt={bruja.nombre}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={bruja.imagen}
                  alt={bruja.nombre}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Nombre y rol de la bruja */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-6"
        >
          <h2 className="text-3xl font-bold text-light font-title mb-2">
            {bruja.nombre}
          </h2>
          <p className="text-secondary text-lg">
            {bruja.servicio}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-2 md:px-4 relative z-10 pb-16 md:pb-24 max-w-6xl"
      >
        <FormularioBruja idBruja={idBruja} />
      </motion.div>
    </div>
  );
};

export default ConsultaPage; 