import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartaAstralPage = () => {
  return (
    <div className="min-h-screen relative">
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold magical-text">
            ✨ Cuatro Brujas
          </Link>
          <Link 
            to="/" 
            className="text-light hover:text-secondary transition-colors duration-300"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl mb-6"
            >
              ⭐
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 magical-text">
              Morgana - Intérprete de Estrellas
            </h1>
            
            <p className="text-xl text-light/80 max-w-2xl mx-auto mb-8">
              Las estrellas y planetas revelan los secretos de tu personalidad cósmica. 
              Morgana interpreta tu carta astral personal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="magical-card text-center p-8">
              <h2 className="text-3xl font-bold mb-6 text-light">
                🚧 Próximamente Disponible 🚧
              </h2>
              
              <div className="space-y-4 text-light/70">
                <p className="text-lg">
                  Morgana está alineando los planetas para tu carta astral...
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-500/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🌌</div>
                    <h3 className="font-semibold">Mapa Astral</h3>
                    <p className="text-sm">Posición de planetas al nacer</p>
                  </div>
                  
                  <div className="bg-blue-500/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">♈</div>
                    <h3 className="font-semibold">Signos y Casas</h3>
                    <p className="text-sm">Interpretación completa</p>
                  </div>
                  
                  <div className="bg-blue-500/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold">Predicciones</h3>
                    <p className="text-sm">Tendencias y oportunidades</p>
                  </div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8"
              >
                <button className="magical-btn">
                  ⭐ Notificarme cuando esté listo
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CartaAstralPage; 