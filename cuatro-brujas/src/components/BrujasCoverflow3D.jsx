import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos de las brujas
const brujas = [
  { 
    nombre: "Calypso", 
    rol: "Tarot - Lectura Diaria", 
    imagen: "/avatares/calypso.mp4", 
    ruta: "/consulta/calypso",
    color: "#9333ea" 
  },
  { 
    nombre: "Orula", 
    rol: "Numerología - Lectura Semanal", 
    imagen: "/avatares/orula.mp4", 
    ruta: "/consulta/orula",
    color: "#dc2626" 
  },
  { 
    nombre: "Zaira", 
    rol: "Chakras - Lectura Mensual", 
    imagen: "/avatares/zaira.mp4", 
    ruta: "/consulta/zaira",
    color: "#059669" 
  },
  { 
    nombre: "Sirona", 
    rol: "Astrología - Lectura Anual", 
    imagen: "/avatares/sirona.mp4", 
    ruta: "/consulta/sirona",
    color: "#2563eb" 
  }
];

const BrujasCoverflow3D = () => {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const navigate = useNavigate();

  const siguienteBruja = () => {
    setIndiceActivo((prev) => (prev + 1) % brujas.length);
  };

  const anteriorBruja = () => {
    setIndiceActivo((prev) => (prev - 1 + brujas.length) % brujas.length);
  };

  const irABruja = (indice) => {
    setIndiceActivo(indice);
  };

  const elegirBruja = () => {
    navigate(brujas[indiceActivo].ruta);
  };

  const getCardProps = (indice) => {
    const diferencia = indice - indiceActivo;
    
    if (diferencia === 0) {
      // Bruja central
      return {
        x: 0,
        scale: 1.2,
        rotateY: 0,
        z: 100,
        opacity: 1,
        filter: 'blur(0px)',
      };
    } else if (diferencia === 1 || (diferencia === -(brujas.length - 1))) {
      // Bruja derecha
      return {
        x: 200,
        scale: 0.8,
        rotateY: -30,
        z: 0,
        opacity: 0.7,
        filter: 'blur(2px)',
      };
    } else if (diferencia === -1 || (diferencia === brujas.length - 1)) {
      // Bruja izquierda
      return {
        x: -200,
        scale: 0.8,
        rotateY: 30,
        z: 0,
        opacity: 0.7,
        filter: 'blur(2px)',
      };
    } else {
      // Brujas ocultas
      return {
        x: diferencia > 0 ? 400 : -400,
        scale: 0.6,
        rotateY: diferencia > 0 ? -45 : 45,
        z: -100,
        opacity: 0,
        filter: 'blur(4px)',
      };
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      anteriorBruja();
    } else if (info.offset.x < -threshold) {
      siguienteBruja();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
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
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ✨ Elige Tu Bruja Guía ✨
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Desliza para explorar y descubre la bruja perfecta para tu lectura mística
          </p>
        </motion.div>

        {/* Carrusel Coverflow */}
        <div className="relative w-full max-w-6xl h-96 md:h-[500px] flex items-center justify-center perspective-1000">
          
          {/* Botón Anterior - Desktop */}
          <button
            onClick={anteriorBruja}
            className="hidden md:flex absolute left-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Botón Siguiente - Desktop */}
          <button
            onClick={siguienteBruja}
            className="hidden md:flex absolute right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronRightIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Contenedor de las cartas */}
          <div className="relative w-full h-full flex items-center justify-center">
            {brujas.map((bruja, indice) => {
              const cardProps = getCardProps(indice);
              
              return (
                <motion.div
                  key={bruja.nombre}
                  className="absolute cursor-pointer"
                  style={{
                    perspective: '1000px',
                  }}
                  animate={cardProps}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  onClick={() => irABruja(indice)}
                  whileHover={{ scale: cardProps.scale * 1.05 }}
                >
                  <div 
                    className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      boxShadow: `0 20px 60px rgba(147, 51, 234, ${indice === indiceActivo ? 0.4 : 0.2})`,
                      filter: cardProps.filter,
                    }}
                  >
                    {/* Imagen/Video de la bruja */}
                    {bruja.imagen.endsWith('.MP4') ? (
                      <video
                        src={bruja.imagen}
                        alt={bruja.nombre}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        draggable={false}
                      />
                    ) : (
                      <img
                        src={bruja.imagen}
                        alt={bruja.nombre}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    )}
                    
                    {/* Overlay degradado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Información de la bruja */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{bruja.nombre}</h3>
                      <p className="text-lg opacity-90">{bruja.rol}</p>
                    </div>
                    
                    {/* Borde brillante para bruja activa */}
                    {indice === indiceActivo && (
                      <div 
                        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                        style={{
                          borderColor: bruja.color,
                          boxShadow: `inset 0 0 20px ${bruja.color}40`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Indicadores de posición */}
        <div className="flex space-x-2 mt-8 mb-8">
          {brujas.map((_, indice) => (
            <button
              key={indice}
              onClick={() => irABruja(indice)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                indice === indiceActivo 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Botón de acción */}
        <motion.button
          onClick={elegirBruja}
          className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: brujas[indiceActivo].color }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          ✨ Elegir a {brujas[indiceActivo].nombre} ✨
        </motion.button>

        {/* Instrucciones móvil */}
        <motion.p
          className="text-purple-300 text-sm mt-6 md:hidden text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Desliza las cartas para navegar • Toca para seleccionar
        </motion.p>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default BrujasCoverflow3D;