import React from 'react';

const BackgroundParticles = () => {
  // Crear array de partículas
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? '#ffffff' : '#a56aff',
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles; 