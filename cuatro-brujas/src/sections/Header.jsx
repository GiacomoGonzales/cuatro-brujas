import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../components/MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary/30"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold magical-text"
            >
              ✨ Cuatro Brujas
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/quienes-somos" 
              className="text-light hover:text-secondary transition-colors duration-300"
            >
              Quiénes somos
            </Link>
            <Link 
              to="/zona-reparto" 
              className="text-light hover:text-secondary transition-colors duration-300"
            >
              Zona de reparto
            </Link>
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