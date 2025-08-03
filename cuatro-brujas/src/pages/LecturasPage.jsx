import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrujasHomeCoverflow from '../components/BrujasHomeCoverflow';

const LecturasPage = () => {
  const navigate = useNavigate();

  // Verificar control de acceso al cargar la página
  useEffect(() => {
    const accessValidated = sessionStorage.getItem('accessValidated');
    if (accessValidated !== 'true') {
      // Comentar temporalmente para pruebas - descomenta para producción
      // navigate('/viaje-mistico');
      // return;
      
      // Para pruebas: establecer acceso temporal
      sessionStorage.setItem('accessValidated', 'true');
      console.log('🔧 Acceso temporal establecido para pruebas');
    }
  }, [navigate]);

  // Generar partículas místicas
  const particulas = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.3 + Math.random() * 0.7,
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



      {/* Ondas místicas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, #A259FF 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, #FFB700 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #A259FF 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, #FFB700 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, #A259FF 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
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

        {/* Carrusel Coverflow 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <BrujasHomeCoverflow isLecturasPage={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default LecturasPage;