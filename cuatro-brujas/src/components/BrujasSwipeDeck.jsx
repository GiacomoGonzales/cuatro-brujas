import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos de las brujas
const brujas = [
  { 
    nombre: "Calypso", 
    rol: "Tarot - Lectura Diaria", 
    imagen: "/avatares/calypso.png", 
    ruta: "/consulta/calypso",
    color: "#9333ea",
    descripcion: "Lecturas para las próximas 24 horas"
  },
  { 
    nombre: "Orula", 
    rol: "Numerología - Lectura Semanal", 
    imagen: "/avatares/orula.png", 
    ruta: "/consulta/orula",
    color: "#dc2626",
    descripcion: "Vibraciones numéricas para 7 días"
  },
  { 
    nombre: "Aisha", 
    rol: "Chakras - Lectura Mensual", 
    imagen: "/avatares/aisha.png", 
    ruta: "/consulta/aisha",
    color: "#059669",
    descripcion: "Equilibrio energético para el mes"
  },
  { 
    nombre: "Sirona", 
    rol: "Astrología - Lectura Anual", 
    imagen: "/avatares/sirona.png", 
    ruta: "/consulta/sirona",
    color: "#2563eb",
    descripcion: "Predicciones para todo el año"
  }
];

const BrujasSwipeDeck = () => {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [direccion, setDireccion] = useState(0);
  const navigate = useNavigate();

  const cambiarBruja = (nuevoIndice, dir) => {
    setDireccion(dir);
    setIndiceActivo(nuevoIndice);
  };

  const siguienteBruja = () => {
    const siguiente = (indiceActivo + 1) % brujas.length;
    cambiarBruja(siguiente, 1);
  };

  const anteriorBruja = () => {
    const anterior = (indiceActivo - 1 + brujas.length) % brujas.length;
    cambiarBruja(anterior, -1);
  };

  const elegirBruja = () => {
    navigate(brujas[indiceActivo].ruta);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      anteriorBruja();
    } else if (info.offset.x < -threshold) {
      siguienteBruja();
    }
  };

  // Variantes de animación para las tarjetas
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    })
  };

  // Generar partículas intensificadas
  const generarParticulasIntensas = () => {
    return [...Array(80)].map((_, i) => (
      <motion.div
        key={`particle-${indiceActivo}-${i}`}
        className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          y: [0, -30, -60],
          x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
        }}
        transition={{
          duration: 2,
          delay: Math.random() * 0.5,
          ease: "easeOut"
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      {/* Partículas de fondo base */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Partículas mágicas intensificadas al cambiar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indiceActivo}
          className="absolute inset-0 pointer-events-none"
        >
          {generarParticulasIntensas()}
        </motion.div>
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        
        {/* Título fijo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-title text-golden mb-4 drop-shadow-lg">
            Elige Tu Bruja Guía
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
            Desliza o usa las flechas para descubrir tu guía espiritual perfecta
          </p>
        </motion.div>

        {/* Contenedor de la tarjeta */}
        <div className="relative w-full max-w-md md:max-w-lg h-96 md:h-[500px] mb-8">
          
          {/* Botón Anterior - Desktop */}
          <motion.button
            onClick={anteriorBruja}
            className="hidden md:flex absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeftIcon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Botón Siguiente - Desktop */}
          <motion.button
            onClick={siguienteBruja}
            className="hidden md:flex absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRightIcon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Tarjeta principal con AnimatePresence */}
          <AnimatePresence mode="wait" custom={direccion}>
            <motion.div
              key={indiceActivo}
              custom={direccion}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative"
                style={{
                  background: `linear-gradient(145deg, ${brujas[indiceActivo].color}20, transparent)`,
                  border: `2px solid ${brujas[indiceActivo].color}40`,
                  boxShadow: `0 25px 60px ${brujas[indiceActivo].color}30, 0 0 40px ${brujas[indiceActivo].color}20`,
                }}
              >
                {/* Imagen de la bruja */}
                <div className="relative w-full h-2/3 overflow-hidden">
                  <motion.img
                    src={brujas[indiceActivo].imagen}
                    alt={brujas[indiceActivo].nombre}
                    className="w-full h-full object-cover"
                    draggable={false}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Brillo mágico animado */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at center, ${brujas[indiceActivo].color}40, transparent 70%)`,
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Información de la bruja */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    style={{
                      textShadow: `0 0 20px ${brujas[indiceActivo].color}80`,
                      filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {brujas[indiceActivo].nombre}
                  </motion.h2>
                  
                  <motion.p
                    className="text-lg text-purple-200 mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {brujas[indiceActivo].rol}
                  </motion.p>
                  
                  <motion.p
                    className="text-sm text-purple-300 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {brujas[indiceActivo].descripcion}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores de posición */}
        <div className="flex space-x-3 mb-8">
          {brujas.map((_, indice) => (
            <motion.button
              key={indice}
              onClick={() => cambiarBruja(indice, indice > indiceActivo ? 1 : -1)}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  indice === indiceActivo 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
              {indice === indiceActivo && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: brujas[indiceActivo].color }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Botón de elección dinámico */}
        <motion.button
          onClick={elegirBruja}
          className="relative px-12 py-4 rounded-full text-white font-bold text-lg shadow-lg transform transition-all duration-300 overflow-hidden mb-12"
          style={{
            background: `linear-gradient(135deg, ${brujas[indiceActivo].color}, #FFD700)`,
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 30px ${brujas[indiceActivo].color}60`
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <span className="relative z-10">
            ✨ Elegir a {brujas[indiceActivo].nombre} ✨
          </span>
        </motion.button>


      </div>
    </div>
  );
};

export default BrujasSwipeDeck;