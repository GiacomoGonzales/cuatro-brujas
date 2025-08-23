import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { hasValidAccess, hasCompletedReading, isPermanentCode, markReadingCompleted } from '../services/sessionService';

const TarotLecturaPage = () => {
  const navigate = useNavigate();
  const [lecturaCompletada, setLecturaCompletada] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    theme: '',
    question: ''
  });

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
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.birthDate && formData.theme && !lecturaCompletada) {
      console.log('Formulario enviado:', formData);
      
      // Aquí iría la lógica para generar la respuesta del tarot
      // Por ahora solo marcamos como completada cuando se envía el formulario
      markReadingCompleted('elvira', 'tarot');
      setLecturaCompletada(true);
      console.log('✅ Lectura de tarot completada exitosamente');
    }
  };

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  // Variantes para elementos individuales
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Partículas místicas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [-10, 10, -10],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-lg mx-auto">
        <motion.div 
          className="bg-primary/80 backdrop-blur-sm p-8 rounded-lg border border-secondary/30 shadow-xl relative"
          variants={itemVariants}
        >
          {/* Efecto de brillo en las esquinas */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-secondary/20 rounded-full blur-lg" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-secondary/20 rounded-full blur-lg" />

          <motion.h2 
            className="text-3xl font-bold text-center mb-8 magical-text"
            variants={itemVariants}
          >
            ✨ Prepara tu Consulta
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-light mb-2">
                Nombre (opcional)
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-primary text-light border border-secondary/30 rounded-lg transition-all duration-300 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/50"
                placeholder="¿Cómo te llamas?"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="birthDate" className="block text-light mb-2">
                Fecha de Nacimiento *
              </label>
              <div className="relative">
                <input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full p-3 bg-primary text-light border border-secondary/30 rounded-lg transition-all duration-300 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/50"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50">
                  📅
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="theme" className="block text-light mb-2">
                Tema de Interés *
              </label>
              <div className="relative">
                <select
                  id="theme"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full p-3 bg-primary text-light border border-secondary/30 rounded-lg transition-all duration-300 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/50 appearance-none"
                  required
                >
                  <option value="">Selecciona un tema...</option>
                  <option value="amor">💝 Amor y Relaciones</option>
                  <option value="dinero">💰 Dinero y Abundancia</option>
                  <option value="salud">🌿 Salud y Bienestar</option>
                  <option value="carrera">🎯 Carrera y Trabajo</option>
                  <option value="general">🌟 Destino General</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 pointer-events-none">
                  ▼
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="question" className="block text-light mb-2">
                Pregunta Específica (opcional)
              </label>
              <textarea
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full p-3 bg-primary text-light border border-secondary/30 rounded-lg resize-none h-24 transition-all duration-300 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/50"
                placeholder="¿Hay algo específico que quieres saber?"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={!formData.birthDate || !formData.theme || lecturaCompletada}
                className={`w-full text-light p-3 rounded-lg transition-all duration-300 ${
                  lecturaCompletada 
                    ? 'bg-gray-600 opacity-50 cursor-not-allowed' 
                    : 'bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:hover:bg-secondary'
                }`}
                whileHover={{ scale: lecturaCompletada ? 1 : 1.02 }}
                whileTap={{ scale: lecturaCompletada ? 1 : 0.98 }}
              >
                {lecturaCompletada ? '✅ Lectura Completada' : '🔮 Comenzar la Lectura'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TarotLecturaPage; 