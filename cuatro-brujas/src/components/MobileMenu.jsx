import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
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
                <Link
                  to="/zona-reparto"
                  className="text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20"
                  onClick={onClose}
                >
                  Zona de reparto
                </Link>
                <Link
                  to="/como-funciona"
                  className="text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20"
                  onClick={onClose}
                >
                  Cómo funciona
                </Link>
                <Link
                  to="/nuestra-carta"
                  className="text-light hover:text-secondary transition-colors py-2 border-b border-secondary/20"
                  onClick={onClose}
                >
                  🍔 Nuestra Carta
                </Link>
              </nav>

              {/* Botones de acción */}
              <div className="mt-8 space-y-4">
                <Link 
                  to="/tarot"
                  onClick={onClose}
                  className="block w-full border border-secondary/30 text-light px-6 py-3 rounded-full hover:border-secondary/50 transition font-body text-center"
                >
                  🔮 Comenzar Lectura
                </Link>
                <Link 
                  to="/nuestra-carta"
                  onClick={onClose}
                  className="block w-full bg-secondary hover:bg-secondary/90 text-light px-6 py-3 rounded-full transition font-body text-center"
                >
                  🍔 Ver Carta Mágica
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 