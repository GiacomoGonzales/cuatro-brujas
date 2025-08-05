import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

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

  const handleScrollToBrujas = () => {
    onClose();
    navigate('/');
    setTimeout(() => {
      const brujasSection = document.getElementById('brujas-section');
      if (brujasSection) {
        brujasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Panel lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-64 bg-primary border-l border-secondary/30 z-50"
          >
            <div className="p-6">
              {/* Botón de cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-light hover:text-secondary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Logo */}
              <div className="mb-8 mt-2">
                <Link to="/" onClick={onClose}>
                  <img 
                    src="/logo.png" 
                    alt="Cuatro Brujas" 
                    className="h-12 w-auto mx-auto"
                  />
                </Link>
              </div>

              {/* Enlaces de navegación */}
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/quienes-somos"
                  className="text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20"
                  onClick={onClose}
                >
                  Quiénes somos
                </Link>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20 font-semibold"
                    onClick={() => {
                      onClose();
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
                    Ver Carta y Pedir
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

                <Link
                  to="/como-funciona"
                  className="text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20"
                  onClick={onClose}
                >
                  Cómo funciona
                </Link>

              </nav>

              {/* Botones de acción */}
              <div className="mt-8 space-y-4">
                <button 
                  onClick={handleScrollToBrujas}
                  className="block w-full border border-secondary/30 text-light px-6 py-3 rounded-full hover:border-secondary/50 transition font-body text-center"
                >
                  🔮 Comenzar Lectura
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 