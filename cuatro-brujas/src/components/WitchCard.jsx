import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WitchCard = ({ name, role, description, image, route }) => {
  const navigate = useNavigate();

  const handleConsult = () => {
    navigate(route);
  };

  const getButtonText = () => {
    switch (role) {
      case 'Tarot':
        return 'Consultar';
      case 'Carta Astral':
        return 'Explorar';
      case 'Numerología':
        return 'Descifrar';
      case 'Horóscopo':
        return 'Ver mi Signo';
      default:
        return 'Consultar Ahora';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer flex flex-col items-center"
      onClick={handleConsult}
    >
      {/* Main Image - Without container */}
      <div className="relative mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-64 h-64 object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Name below image */}
      <div className="text-center mb-2">
        <h3 className="text-3xl font-bold text-light font-title">
          {name}
        </h3>
      </div>

      {/* Role text below name */}
      <div className="text-center mb-6">
        <p className="text-secondary text-xl font-semibold">
          {role}
        </p>
      </div>
      
      {/* Modern Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 
                     text-light font-semibold py-3 px-8 rounded-full shadow-lg shadow-secondary/25 
                     hover:shadow-secondary/40 transition-all duration-300 font-body
                     border border-secondary/30 hover:border-secondary/50"
        >
          {getButtonText()}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WitchCard; 