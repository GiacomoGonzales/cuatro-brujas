import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PortalMagico = () => {
  const navigate = useNavigate();

  const handlePortalClick = () => {
    navigate('/ingresar-codigo');
  };

  // Configuración de partículas flotantes
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2,
    size: 4 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section 
      id="portal-section"
      className="relative bg-no-repeat bg-cover bg-center py-20 overflow-hidden min-h-[80vh] flex items-center justify-center"
      style={{ backgroundImage: "url('/backgrounds/constelaciones.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 magical-text font-title">
            Portal Mágico
          </h2>
          <p className="text-lg md:text-xl text-light/80 max-w-3xl mx-auto leading-relaxed">
            Haz clic en el portal para acceder al reino místico de las cuatro brujas
          </p>
        </motion.div>

        {/* Portal Mágico */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Partículas flotantes */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-r from-secondary/60 to-accent/60"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Portal Principal */}
          <motion.div
            className="relative cursor-pointer group"
            onClick={handlePortalClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Anillos exteriores */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-secondary/30"
              style={{ width: '400px', height: '400px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-accent/40"
              style={{ width: '384px', height: '384px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Portal central */}
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{ width: '320px', height: '320px' }}
              animate={{
                boxShadow: [
                  '0 0 20px #A259FF, 0 0 40px #A259FF, 0 0 80px #A259FF',
                  '0 0 40px #FFB700, 0 0 80px #FFB700, 0 0 120px #FFB700',
                  '0 0 20px #A259FF, 0 0 40px #A259FF, 0 0 80px #A259FF',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Gradiente de fondo del portal */}
              <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-primary/80 to-dark rounded-full" />
              
              {/* Efecto de remolino */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary/40 via-transparent to-accent/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Centro brillante */}
              <motion.div
                className="absolute inset-1/4 rounded-full bg-gradient-radial from-light/30 via-secondary/50 to-transparent"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Pulso central */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accent"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.3, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Texto de instrucción */}
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <p className="text-secondary font-semibold text-lg">
                ✨ Entrar al Portal
              </p>
            </motion.div>
          </motion.div>

          {/* Partículas orbitales */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orbital-${i}`}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-accent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: `0 ${200 + i * 20}px`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortalMagico;