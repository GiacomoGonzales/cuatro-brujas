import { motion } from "framer-motion";
import { useEffect } from "react";

const LeyendaPage = () => {
  // Cargar script de Gloria Food
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.fbgcdn.com/embedder/js/ewm2.js';
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar script al desmontar componente
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generar partículas místicas
  const particulas = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 3,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      
      {/* Fondo con imagen mágica */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-repeat opacity-30"
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
              background: 'radial-gradient(circle, #A259FF, #FFB700, transparent)',
              boxShadow: '0 0 15px #A259FF, 0 0 25px #FFB700',
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
              'radial-gradient(circle at 20% 20%, #A259FF 0%, transparent 60%)',
              'radial-gradient(circle at 80% 80%, #FFB700 0%, transparent 60%)',
              'radial-gradient(circle at 20% 20%, #A259FF 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Título principal */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold magical-text font-title mb-8"
              animate={{
                textShadow: [
                  '0 0 20px #A259FF, 0 0 40px #FFB700',
                  '0 0 30px #FFB700, 0 0 50px #A259FF',
                  '0 0 20px #A259FF, 0 0 40px #FFB700',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              La Leyenda de las Cuatro Brujas
            </motion.h1>
          </motion.div>

          {/* Contenido de la historia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="magical-card p-8 md:p-12 text-center"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              
              <motion.p 
                className="text-lg md:text-xl text-light/90 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hace milenios nació un enemigo eterno: <span className="text-red-400 font-semibold">Hambrosius</span>, la encarnación del Hambre. Una sombra cósmica que se alimenta del vacío y la desesperanza. Hoy, en nuestra época, Hambrosius se ha encarnado nuevamente en la forma del Hambre moderno, extendiendo comida sin alma y llenando al mundo de vacío disfrazado de abundancia.
              </motion.p>

              <motion.p 
                className="text-lg md:text-xl text-light/90 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Para combatirlo, cuatro brujas cruzaron desde otro espectro hasta nuestra realidad.
                <br />
                <span className="text-secondary font-semibold">Orula</span>, <span className="text-secondary font-semibold">Calypso</span>, <span className="text-secondary font-semibold">Sirona</span> y <span className="text-secondary font-semibold">Aisha</span> guardan el secreto de la hamburguesa smash perfecta, una receta ancestral con fuego sagrado y magia que devuelve energía y alegría en cada bocado.
              </motion.p>

              <motion.div
                className="my-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="text-6xl mb-4">🔮✨🍔✨</div>
              </motion.div>

              <motion.p 
                className="text-lg md:text-xl text-light/90 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Su magia viaja contigo: cuando pides una hamburguesa de <span className="text-accent font-semibold">Cuatro Brujas</span>, no solo recibes alimento, recibes un conjuro.
                <br />
                Y junto a él, llega un <span className="text-golden font-semibold">código secreto</span> que abre el acceso a su portal místico, donde las brujas leen el tarot y te entregan una guía espiritual para tu camino.
              </motion.p>

              <motion.p 
                className="text-xl md:text-2xl text-accent font-semibold leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                Porque en cada pedido no solo derrotas al Hambre de Hambrosius… también descubres un poco de tu destino.
              </motion.p>

            </div>
          </motion.div>

          {/* Botón de acción */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-secondary to-accent text-primary px-8 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all duration-300 animate-glow"
                onClick={() => {
                  // Pequeño delay para asegurar que Gloria Food esté inicializado
                  setTimeout(() => {
                    const gloriaButton = document.querySelector('.glf-button-hidden');
                    if (gloriaButton) {
                      gloriaButton.click();
                    } else {
                      console.log('Gloria Food button not found, trying alternative approach');
                      // Intentar disparar el evento manualmente
                      if (window.GloriaFood && window.GloriaFood.openModal) {
                        window.GloriaFood.openModal();
                      }
                    }
                  }, 100);
                }}
              >
                🍔 Haz un pedido 🍔
              </motion.button>
              
              {/* Botón oculto de Gloria Food - Debe estar visible en el DOM pero oculto visualmente */}
              <span 
                className="glf-button glf-button-hidden"
                data-glf-cuid="cab9aa12-59eb-4058-ac46-594953a61cfa"
                data-glf-ruid="0a86274a-3227-422f-b140-e04bf8f9b334"
                style={{ 
                  position: 'absolute', 
                  left: '-9999px', 
                  top: '-9999px',
                  opacity: 0,
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden'
                }}
              >
                Ver el MENÚ y PEDIR
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default LeyendaPage;
