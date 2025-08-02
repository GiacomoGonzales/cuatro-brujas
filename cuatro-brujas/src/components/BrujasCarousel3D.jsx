import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Plane } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TextureLoader } from 'three';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// Datos de las brujas
const brujasData = [
  {
    id: 'calypso',
    nombre: 'Calypso',
    imagen: '/avatares/calypso.png',
    especialidad: 'Tarot',
    ruta: '/consulta/calypso',
    color: '#9333ea'
  },
  {
    id: 'orula',
    nombre: 'Orula',
    imagen: '/avatares/orula.png',
    especialidad: 'Numerología y Destino',
    ruta: '/consulta/orula',
    color: '#dc2626'
  },
  {
    id: 'aisha',
    nombre: 'Aisha',
    imagen: '/avatares/aisha.png',
    especialidad: 'Chakras y Energía',
    ruta: '/consulta/aisha',
    color: '#059669'
  },
  {
    id: 'sirona',
    nombre: 'Sirona',
    imagen: '/avatares/sirona.png',
    especialidad: 'Horóscopo y Carta Astral',
    ruta: '/consulta/sirona',
    color: '#2563eb'
  }
];

// Componente individual de una bruja en 3D
function BrujaCard({ bruja, position, isActive, onClick }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, bruja.imagen);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Efecto de hover/activa - escala y resplandor
      const targetScale = isActive ? 1.2 : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: 1 }, delta * 3);
      
      // Rotación suave hacia la cámara
      meshRef.current.lookAt(0, position[1], 5);
      
      // Efecto de brillo sutil
      if (isActive) {
        meshRef.current.material.emissive.setHex(0x221144);
      } else {
        meshRef.current.material.emissive.setHex(0x000000);
      }
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <Plane ref={meshRef} args={[2, 2.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </Plane>
      
      {/* Texto con nombre de la bruja */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.3}
        color={isActive ? bruja.color : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {bruja.nombre}
      </Text>
      
      {/* Texto con especialidad */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.15}
        color={isActive ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
      >
        {bruja.especialidad}
      </Text>
    </group>
  );
}

// Componente del carrusel giratorio
function Carousel({ onBrujaSelect, activeBruja }) {
  const groupRef = useRef();
  const [rotation, setRotation] = useState(0);
  
  const radius = 4;
  const brujaPositions = useMemo(() => {
    return brujasData.map((_, index) => {
      const angle = (index / brujasData.length) * Math.PI * 2;
      return [
        Math.sin(angle) * radius,
        0,
        Math.cos(angle) * radius
      ];
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotación automática lenta
      groupRef.current.rotation.y += delta * 0.2;
      setRotation(groupRef.current.rotation.y);
    }
  });

  // Calcular cuál bruja está más cerca del frente
  const activeBrujaIndex = useMemo(() => {
    const normalizedRotation = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const segmentSize = (Math.PI * 2) / brujasData.length;
    return Math.round(normalizedRotation / segmentSize) % brujasData.length;
  }, [rotation]);

  return (
    <group ref={groupRef}>
      {brujasData.map((bruja, index) => (
        <BrujaCard
          key={bruja.id}
          bruja={bruja}
          position={brujaPositions[index]}
          isActive={index === activeBrujaIndex}
          onClick={() => onBrujaSelect(bruja)}
        />
      ))}
    </group>
  );
}

// Componente principal del carrusel 3D
const BrujasCarousel3D = () => {
  const navigate = useNavigate();
  const [selectedBruja, setSelectedBruja] = useState(null);
  const [activeBruja, setActiveBruja] = useState(brujasData[0]);

  const handleBrujaSelect = (bruja) => {
    setSelectedBruja(bruja);
    setActiveBruja(bruja);
  };

  const handleNavigateToBruja = () => {
    if (selectedBruja) {
      navigate(selectedBruja.ruta);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-black to-purple-900 overflow-hidden">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6} 
          color="#ffffff"
        />
        <pointLight 
          position={[0, 0, 5]} 
          intensity={0.3} 
          color="#9333ea"
        />

        {/* Estrellas de fondo */}
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />

        {/* Carrusel de brujas */}
        <Carousel 
          onBrujaSelect={handleBrujaSelect}
          activeBruja={activeBruja}
        />

        {/* Controles de órbita limitados */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />
      </Canvas>

      {/* Overlay con información y botón */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título principal */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elige Tu Bruja Guía
          </motion.h1>

          {/* Descripción */}
          <motion.p 
            className="text-xl text-purple-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Rota el carrusel místico y descubre el poder de cada una de nuestras brujas
          </motion.p>

          {/* Información de la bruja activa */}
          {activeBruja && (
            <motion.div
              key={activeBruja.id}
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                {activeBruja.nombre}
              </h2>
              <p className="text-lg text-purple-300">
                {activeBruja.especialidad}
              </p>
            </motion.div>
          )}

          {/* Botón de selección */}
          {activeBruja && (
            <motion.button
              onClick={handleNavigateToBruja}
              className={`px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              style={{ backgroundColor: activeBruja.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Elegir a {activeBruja.nombre} ✨
            </motion.button>
          )}
        </div>
      </div>

      {/* Partículas decorativas adicionales */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Instrucciones para móvil */}
      <div className="absolute top-4 left-4 right-4 md:hidden">
        <motion.p 
          className="text-center text-purple-200 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Desliza para rotar el carrusel
        </motion.p>
      </div>
    </div>
  );
};

export default BrujasCarousel3D;