import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrujasCarouselLigero from '../components/BrujasCarouselLigero';
import { hasValidAccess, hasCompletedReading, isPermanentCode, resetPermanentCodeSession } from '../services/sessionService';

const LecturasPage = () => {
  const navigate = useNavigate();

  // Verificar control de acceso al cargar la página
  useEffect(() => {
    // Verificar si tiene acceso válido
    if (!hasValidAccess()) {
      console.log('❌ Acceso denegado: código de acceso requerido');
      navigate('/viaje-mistico');
      return;
    }

    // Verificar si ya completó una lectura
    if (hasCompletedReading()) {
      // Si es un código permanente (desarrollo), permitir reiniciar
      if (isPermanentCode()) {
        console.log('🔧 Código permanente detectado - permitiendo nueva lectura');
        resetPermanentCodeSession();
      } else {
        console.log('⚠️ Lectura ya completada - redirigiendo a confirmación');
        navigate('/lectura-completada');
        return;
      }
    }
  }, [navigate]);

  // Generar partículas místicas (reducidas para mejor rendimiento)
  const particulas = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 2,
    size: 2 + Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.5,
  }));



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      {/* Fondo animado con constelaciones */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-repeat opacity-20"
          style={{ 
            backgroundImage: "url('/backgrounds/constelaciones.jpg')",
            backgroundSize: '400px 400px'
          }}
        />
      </div>

      {/* Partículas místicas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particulas.map((particula) => (
          <motion.div
            key={particula.id}
            className="absolute rounded-full"
            style={{
              width: `${particula.size}px`,
              height: `${particula.size}px`,
              left: `${particula.x}%`,
              top: `${particula.y}%`,
              background: 'radial-gradient(circle, #FFD700, #FFA500, transparent)',
              boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [particula.opacity * 0.3, particula.opacity, particula.opacity * 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particula.duration,
              delay: particula.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>



      {/* Ondas místicas de fondo (simplificadas) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, #A259FF 0%, transparent 60%)',
              'radial-gradient(circle at 70% 70%, #FFB700 0%, transparent 60%)',
              'radial-gradient(circle at 30% 30%, #A259FF 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32">
        
        {/* Título con efectos */}
        <motion.div 
          className="text-center mb-4 md:mb-6 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-title text-golden mb-4 drop-shadow-lg"
          >
            Elige Tu Bruja Guía
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Desliza o usa las flechas para descubrir tu guía espiritual perfecta
          </motion.p>
        </motion.div>

        {/* Carrusel Ligero Optimizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BrujasCarouselLigero />
        </motion.div>
      </div>
    </div>
  );
};

export default LecturasPage;