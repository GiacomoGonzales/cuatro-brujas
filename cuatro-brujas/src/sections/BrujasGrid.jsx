import { motion } from "framer-motion";
import BrujasHomeCoverflow from "../components/BrujasHomeCoverflow";

const BrujasGrid = () => {
  return (
    <section 
      id="brujas-section"
      className="relative bg-no-repeat bg-cover bg-center py-20 overflow-hidden"
      style={{ backgroundImage: "url('/backgrounds/constelaciones.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 magical-text font-title">
            Conoce a Nuestras Brujas
          </h2>
          <p className="text-lg md:text-xl text-light/80 max-w-3xl mx-auto leading-relaxed">
            Cada bruja tiene su especialidad mística. Elige tu camino hacia el conocimiento.
          </p>
        </motion.div>

        {/* Carrusel Coverflow 3D */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BrujasHomeCoverflow />
        </motion.div>
      </div>
    </section>
  );
};

export default BrujasGrid; 