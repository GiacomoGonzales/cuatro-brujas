import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileMenu from "../components/MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary/30"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/logo.png" 
                alt="Cuatro Brujas" 
                className="h-12 w-auto"
              />
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <Link 
              to="/quienes-somos" 
              className="text-light hover:text-secondary transition-colors duration-300"
            >
              Quiénes somos
            </Link>
            <div className="mx-4 text-accent/40 transform rotate-45">◆</div>
            <Link 
              to="/la-leyenda" 
              className="text-light hover:text-secondary transition-colors duration-300"
            >
              La Leyenda
            </Link>
            <div className="mx-4 text-accent/40 transform rotate-45">◆</div>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-light hover:text-secondary transition-colors duration-300 font-semibold"
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
            <div className="mx-4 text-accent/40 transform rotate-45">◆</div>
            <Link 
              to="/como-funciona" 
              className="text-light hover:text-secondary transition-colors duration-300"
            >
              Cómo funciona
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-secondary/30 text-light hover:text-secondary hover:border-secondary transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header; 