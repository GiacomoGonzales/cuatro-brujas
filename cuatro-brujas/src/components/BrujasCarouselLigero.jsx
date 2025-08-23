import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Datos de las brujas (optimizado)
const brujas = [
  { 
    nombre: "Calypso", 
    rol: "Tarot - Lectura Diaria", 
    imagen: "/avatares/calypso.mp4", 
    ruta: "/consulta/calypso",
    color: "#9333ea",
    descripcion: "Las cartas revelan tu día"
  },
  { 
    nombre: "Orula", 
    rol: "Numerología - Lectura Semanal", 
    imagen: "/avatares/orula.mp4", 
    ruta: "/consulta/orula",
    color: "#dc2626",
    descripcion: "Los números guían tu semana"
  },
  { 
    nombre: "Zaira", 
    rol: "Chakras - Lectura Mensual", 
    imagen: "/avatares/zaira.mp4", 
    ruta: "/consulta/zaira",
    color: "#059669",
    descripcion: "Equilibra tu energía mensual"
  },
  { 
    nombre: "Sirona", 
    rol: "Astrología - Lectura Anual", 
    imagen: "/avatares/sirona.mp4", 
    ruta: "/consulta/sirona",
    color: "#2563eb",
    descripcion: "Los astros revelan tu año"
  }
];

const BrujasCarouselLigero = () => {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const navigate = useNavigate();

  const siguienteBruja = () => {
    setIndiceActivo((prev) => (prev + 1) % brujas.length);
  };

  const anteriorBruja = () => {
    setIndiceActivo((prev) => (prev - 1 + brujas.length) % brujas.length);
  };

  const seleccionarBruja = (indice) => {
    setIndiceActivo(indice);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Carrusel principal */}
      <div className="relative">
        {/* Botón anterior */}
        <button
          onClick={anteriorBruja}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        >
          <ChevronLeftIcon className="w-5 h-5 text-white" />
        </button>

        {/* Botón siguiente */}
        <button
          onClick={siguienteBruja}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        >
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </button>

        {/* Contenedor de cartas */}
        <div className="overflow-visible rounded-2xl py-4">
          <motion.div
            className="flex"
            animate={{ x: `-${indiceActivo * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {brujas.map((bruja, indice) => (
              <div
                key={bruja.nombre}
                className="w-full flex-shrink-0 relative px-2"
              >
                <div 
                  className="aspect-[4/5] max-w-sm mx-auto relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 group"
                  onClick={() => navigate(bruja.ruta)}
                >
                  {/* Video/Imagen de la bruja */}
                  {bruja.imagen.endsWith('.mp4') ? (
                    <video
                      src={bruja.imagen}
                      alt={bruja.nombre}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={bruja.imagen}
                      alt={bruja.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Información de la bruja */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{bruja.nombre}</h3>
                    <p className="text-lg mb-2" style={{ color: bruja.color }}>
                      {bruja.rol}
                    </p>
                    <p className="text-sm opacity-90">{bruja.descripcion}</p>
                  </div>

                  {/* Borde activo */}
                  {indice === indiceActivo && (
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{ borderColor: bruja.color }}
                    />
                  )}

                  {/* Botón de selección superpuesto - Solo escritorio */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <div 
                      className="px-6 py-3 rounded-full text-white font-semibold backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      style={{ backgroundColor: `${bruja.color}66` }}
                    >
                      ✨ Elegir a {bruja.nombre} ✨
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-12 mb-8 space-x-2">
        {brujas.map((_, indice) => (
          <button
            key={indice}
            onClick={() => seleccionarBruja(indice)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              indice === indiceActivo 
                ? 'bg-white scale-110' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrujasCarouselLigero;
