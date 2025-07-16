import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-primary/90 border-t border-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold magical-text mb-4">
            ✨ Cuatro Brujas
          </h3>
          <p className="text-light/70 mb-4 leading-relaxed max-w-2xl mx-auto">
            Conectamos el mundo místico con la tecnología moderna. 
            Nuestras brujas digitales te guían en tu camino espiritual 
            con sabiduría ancestral y predicciones precisas.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-secondary/30 mt-8 pt-8 text-center"
        >
          <p className="text-light/60">
            © 2024 Cuatro Brujas. Todos los derechos reservados en esta dimensión y otras paralelas.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 