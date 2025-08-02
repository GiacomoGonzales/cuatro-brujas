import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos base de las brujas
const brujasData = [
  { 
    nombre: "Calypso", 
    rol: "Tarot", 
    imagen: "/avatares/calypso.png", 
    rutaDirecta: "/consulta/calypso",
    color: "#9333ea",
    descripcion: "Descubre tu destino a través de las cartas místicas del tarot"
  },
  { 
    nombre: "Orula", 
    rol: "Numerología y Destino", 
    imagen: "/avatares/orula.png", 
    rutaDirecta: "/consulta/orula",
    color: "#dc2626",
    descripcion: "Los números y el destino revelan el camino de tu vida"
  },
  { 
    nombre: "Aisha", 
    rol: "Chakras y Energía", 
    imagen: "/avatares/aisha.png", 
    rutaDirecta: "/consulta/aisha",
    color: "#059669",
    descripcion: "Equilibra tus chakras y armoniza tu energía vital"
  },
  { 
    nombre: "Sirona", 
    rol: "Horóscopo y Carta Astral", 
    imagen: "/avatares/sirona.png", 
    rutaDirecta: "/consulta/sirona",
    color: "#2563eb",
    descripcion: "Los astros guían tu camino y revelan tu verdadera esencia"
  }
];

const BrujasHomeCoverflow = ({ isLecturasPage = false }) => {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [direccion, setDireccion] = useState(0);
  const navigate = useNavigate();

  // Generar datos de brujas con rutas correctas según la página
  const brujas = brujasData.map(bruja => ({
    ...bruja,
    ruta: isLecturasPage ? bruja.rutaDirecta : "/viaje-mistico"
  }));

  // Texto del botón según la página
  const textoBoton = isLecturasPage 
    ? `✨ Elegir a ${brujas[indiceActivo].nombre} ✨`
    : "Comenzar Lectura Mística";

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
    const isMobile = window.innerWidth < 768;
    
    if (diferencia === 0) {
      // Bruja central
      return {
        x: 0,
        scale: 1.1,
        rotateY: 0,
        z: 10,
        opacity: 1,
      };
    } else if (diferencia === 1 || (diferencia === -(brujas.length - 1))) {
      // Bruja derecha
      return {
        x: isMobile ? 150 : 300,
        scale: 0.7,
        rotateY: -20,
        z: 0,
        opacity: 0.3,
        filter: 'blur(2px)',
      };
    } else if (diferencia === -1 || (diferencia === brujas.length - 1)) {
      // Bruja izquierda
      return {
        x: isMobile ? -150 : -300,
        scale: 0.7,
        rotateY: 20,
        z: 0,
        opacity: 0.3,
        filter: 'blur(2px)',
      };
    } else {
      // Brujas ocultas
      return {
        x: diferencia > 0 ? (isMobile ? 400 : 500) : (isMobile ? -400 : -500),
        scale: 0.6,
        rotateY: 0,
        z: -10,
        opacity: 0,
        filter: 'blur(3px)',
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
    <div className="relative py-8 overflow-hidden w-full">
      {/* Partículas de fondo simplificadas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Contenedor del carrusel */}
      <div className="relative w-full h-96 md:h-[500px] flex items-center justify-center perspective-1000 px-0 z-10">
        
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
                className={`absolute ${indice === indiceActivo ? 'cursor-grab' : 'cursor-pointer'}`}
                style={{
                  perspective: '1000px',
                }}
                animate={cardProps}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                drag={indice === indiceActivo ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={indice === indiceActivo ? handleDragEnd : undefined}
                onClick={() => irABruja(indice)}
              >
                <div 
                  className="relative w-48 h-64 md:w-72 md:h-80 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: indice === indiceActivo 
                      ? '0 20px 40px rgba(147, 51, 234, 0.4)' 
                      : '0 10px 20px rgba(0, 0, 0, 0.3)',
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
                  
                  {/* Información de la bruja - solo en bruja activa */}
                  {indice === indiceActivo && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                      <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
                        {bruja.nombre}
                      </h3>
                      <p className="text-sm md:text-base text-purple-200">
                        {bruja.rol}
                      </p>
                    </div>
                  )}
                  
                  {/* Borde brillante para bruja activa */}
                  {indice === indiceActivo && (
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{
                        borderColor: bruja.color,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Información de la bruja activa */}
      <div className="text-center mt-8 px-4 md:px-0">
        <div className="max-w-2xl mx-auto">
          <p className="text-light/90 mb-6 leading-relaxed">
            {brujas[indiceActivo].descripcion}
          </p>
        </div>
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
            {textoBoton}
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