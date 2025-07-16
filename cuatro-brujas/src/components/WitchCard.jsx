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
      case 'Numerología y Destino':
        return 'Descifrar';
      case 'Chakras y Energía':
        return 'Armonizar';
      case 'Horóscopo y Carta Astral':
        return 'Explorar';
      default:
        return 'Consultar Ahora';
    }
  };

  const getAuraColor = () => {
    switch (role) {
      case 'Tarot':
        return 'from-purple-500/30 via-fuchsia-500/20 to-transparent';
      case 'Numerología y Destino':
        return 'from-emerald-500/30 via-teal-500/20 to-transparent';
      case 'Chakras y Energía':
        return 'from-indigo-500/30 via-violet-500/20 to-transparent';
      case 'Horóscopo y Carta Astral':
        return 'from-orange-500/30 via-amber-500/20 to-transparent';
      default:
        return 'from-violet-500/30 via-purple-500/20 to-transparent';
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
      {/* Animated Aura Effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 group-hover:opacity-70 
                        bg-gradient-radial ${getAuraColor()} animate-pulse-slow`}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-60 
                     bg-gradient-radial ${getAuraColor()}`}
        />
      </div>

      {/* Main Image - Without container */}
      <div className="relative mb-4 z-10">
        <img 
          src={image} 
          alt={name}
          className="w-64 h-64 object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Name below image */}
      <div className="text-center mb-2 z-10">
        <h3 className="text-3xl font-bold text-light font-title">
          {name}
        </h3>
      </div>

      {/* Role text below name */}
      <div className="text-center mb-6 z-10">
        <p className="text-secondary text-xl font-semibold">
          {role}
        </p>
      </div>
      
      {/* Modern Button */}
      <div className="flex justify-center z-10">
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