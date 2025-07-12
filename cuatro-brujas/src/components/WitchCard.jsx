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
      className="relative group cursor-pointer"
      onClick={handleConsult}
    >
      {/* Main Image - Large and prominent */}
      <div className="relative mb-4">
        <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-purple-600/50 
                        shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 
                        transition-all duration-500 group-hover:border-purple-400">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Name below image */}
      <div className="text-center mb-2">
        <h3 className="text-3xl font-bold text-white font-['Playfair_Display',serif]">
          {name}
        </h3>
      </div>

      {/* Role text below name */}
      <div className="text-center mb-6">
        <p className="text-purple-300 text-xl font-semibold">
          {role}
        </p>
      </div>
      
      {/* Modern Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
                     text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-purple-500/25 
                     hover:shadow-purple-500/40 transition-all duration-300 font-sans
                     border border-purple-500/30 hover:border-purple-400/50"
        >
          {getButtonText()}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WitchCard; 