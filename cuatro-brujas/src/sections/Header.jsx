import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-mystic-dark/80 backdrop-blur-md border-b border-mystic-purple/30"
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
            className="text-mystic-light hover:text-mystic-purple transition-colors duration-300"
          >
            Quiénes somos
          </Link>
          <Link 
            to="/zona-reparto" 
            className="text-mystic-light hover:text-mystic-purple transition-colors duration-300"
          >
            Zona de reparto
          </Link>
          <Link 
            to="/como-funciona" 
            className="text-mystic-light hover:text-mystic-purple transition-colors duration-300"
          >
            Cómo funciona
          </Link>
        </nav>

        {/* Mobile Info Button */}
        <Link 
          to="/info" 
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-mystic-light text-mystic-light hover:text-mystic-purple hover:border-mystic-purple transition-colors duration-300"
        >
          <span className="text-sm font-bold">i</span>
        </Link>

      </div>
    </motion.header>
  );
};

export default Header; 