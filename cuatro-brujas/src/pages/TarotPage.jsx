import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TarotPage = () => {
  return (
    <div className="min-h-screen relative">
      
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mystic-dark/80 backdrop-blur-md border-b border-mystic-purple/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold magical-text">
            ✨ Cuatro Brujas
          </Link>
          <Link 
            to="/" 
            className="text-mystic-light hover:text-mystic-purple transition-colors duration-300"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
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
              🔮
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 magical-text">
              Elvira - Maestra del Tarot
            </h1>
            
            <p className="text-xl text-mystic-light/80 max-w-2xl mx-auto mb-8">
              Bienvenido al reino de las cartas. Elvira te guiará a través de la sabiduría ancestral 
              del tarot para revelar los secretos de tu destino.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="magical-card text-center p-8">
              <h2 className="text-3xl font-bold mb-6 text-mystic-light">
                🚧 Próximamente Disponible 🚧
              </h2>
              
              <div className="space-y-4 text-mystic-light/70">
                <p className="text-lg">
                  Elvira está preparando su mesa de tarot digital...
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-mystic-purple/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🃏</div>
                    <h3 className="font-semibold">Lectura de Cartas</h3>
                    <p className="text-sm">Interpretación personalizada</p>
                  </div>
                  
                  <div className="bg-mystic-purple/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎭</div>
                    <h3 className="font-semibold">IA Conversacional</h3>
                    <p className="text-sm">Elvira te hablará directamente</p>
                  </div>
                  
                  <div className="bg-mystic-purple/20 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📜</div>
                    <h3 className="font-semibold">Predicciones</h3>
                    <p className="text-sm">Resultados hermosos y compartibles</p>
                  </div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8"
              >
                <Link 
                  to="/" 
                  className="magical-btn inline-block"
                >
                  🏠 Explorar Otras Brujas
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TarotPage; 