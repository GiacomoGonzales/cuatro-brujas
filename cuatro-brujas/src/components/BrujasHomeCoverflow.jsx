import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos de las brujas para la homepage
const brujas = [
  { 
    nombre: "Calypso", 
    rol: "Tarot", 
    imagen: "/avatares/calypso.png", 
    ruta: "/consulta/calypso",
    color: "#9333ea",
    descripcion: "Descubre tu destino a través de las cartas místicas del tarot"
  },
  { 
    nombre: "Orula", 
    rol: "Numerología y Destino", 
    imagen: "/avatares/orula.png", 
    ruta: "/consulta/orula",
    color: "#dc2626",
    descripcion: "Los números y el destino revelan el camino de tu vida"
  },
  { 
    nombre: "Aisha", 
    rol: "Chakras y Energía", 
    imagen: "/avatares/aisha.png", 
    ruta: "/consulta/aisha",
    color: "#059669",
    descripcion: "Equilibra tus chakras y armoniza tu energía vital"
  },
  { 
    nombre: "Sirona", 
    rol: "Horóscopo y Carta Astral", 
    imagen: "/avatares/sirona.png", 
    ruta: "/consulta/sirona",
    color: "#2563eb",
    descripcion: "Los astros guían tu camino y revelan tu verdadera esencia"
  }
];

const BrujasHomeCoverflow = () => {
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

  const irABruja = (indice) => {
    const dir = indice > indiceActivo ? 1 : -1;
    cambiarBruja(indice, dir);
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
        x: window.innerWidth > 768 ? 280 : 180,
        scale: 0.8,
        rotateY: -30,
        z: 0,
        opacity: 0.7,
        filter: 'blur(2px)',
      };
    } else if (diferencia === -1 || (diferencia === brujas.length - 1)) {
      // Bruja izquierda
      return {
        x: window.innerWidth > 768 ? -280 : -180,
        scale: 0.8,
        rotateY: 30,
        z: 0,
        opacity: 0.7,
        filter: 'blur(2px)',
      };
    } else {
      // Brujas ocultas
      return {
        x: diferencia > 0 ? (window.innerWidth > 768 ? 500 : 300) : (window.innerWidth > 768 ? -500 : -300),
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
    <div className="relative py-16 overflow-hidden">
      {/* Partículas de fondo sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Contenedor del carrusel */}
      <div className="relative w-full max-w-6xl mx-auto h-96 md:h-[500px] flex items-center justify-center perspective-1000 px-4">
        
        {/* Botón Anterior - Desktop */}
        <motion.button
          onClick={anteriorBruja}
          className="hidden md:flex absolute left-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Botón Siguiente - Desktop */}
        <motion.button
          onClick={siguienteBruja}
          className="hidden md:flex absolute right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </motion.button>

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
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => irABruja(indice)}
                whileHover={{ scale: cardProps.scale * 1.02 }}
              >
                <div 
                  className="relative w-56 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: `0 20px 60px rgba(147, 51, 234, ${indice === indiceActivo ? 0.4 : 0.2})`,
                    filter: cardProps.filter,
                  }}
                >
                  {/* Imagen de la bruja */}
                  <img
                    src={bruja.imagen}
                    alt={bruja.nombre}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Información de la bruja */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold mb-1"
                      style={{
                        textShadow: `0 0 15px ${bruja.color}80`,
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {bruja.nombre}
                    </motion.h3>
                    <motion.p 
                      className="text-sm md:text-base text-purple-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {bruja.rol}
                    </motion.p>
                  </div>
                  
                  {/* Borde brillante para bruja activa */}
                  {indice === indiceActivo && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{
                        borderColor: bruja.color,
                        boxShadow: `inset 0 0 20px ${bruja.color}40`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Información de la bruja activa */}
      <div className="text-center mt-8 px-4">
        <motion.div
          key={indiceActivo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-light/90 mb-6 leading-relaxed">
            {brujas[indiceActivo].descripcion}
          </p>
        </motion.div>
      </div>

      {/* Indicadores de posición */}
      <div className="flex space-x-2 justify-center mt-6 mb-8">
        {brujas.map((_, indice) => (
          <motion.button
            key={indice}
            onClick={() => irABruja(indice)}
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

      {/* Botón de acción */}
      <div className="text-center">
        <motion.button
          onClick={elegirBruja}
          className="relative px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg transform transition-all duration-300 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${brujas[indiceActivo].color}, #FFD700)`,
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 30px ${brujas[indiceActivo].color}60`
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 300] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <span className="relative z-10">
            ✨ Elegir a {brujas[indiceActivo].nombre} ✨
          </span>
        </motion.button>
      </div>



      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default BrujasHomeCoverflow;