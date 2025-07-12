import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "Predice tu destino… o pídetelo con papas 🍟 a cualquier hora.",
  "Tu futuro sabe a smash burger. 🔮🍔",
  "Hamburguesas mágicas a domicilio, 24/7.",
  "Lecturas cósmicas y combos encantados.",
  "¿Tarot o triple con queso? Tú decides."
];

const HeroTextRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000); // cambia cada 4 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-lg md:text-xl mt-4 h-[48px] relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="absolute text-white"
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/backgrounds/hero-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 flex items-start md:items-center justify-end min-h-screen px-6 md:px-20 pt-40 md:pt-20">
        <div className="text-right max-w-lg">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold text-white font-playfair mb-4"
          >
            Cuatro Brujas
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6"
          >
            <HeroTextRotator />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 items-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition font-sans"
            >
              🧙‍♀️ Ver Carta Mágica
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-purple-400 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition font-sans"
            >
              ✨ Comenzar tu Viaje Místico
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 