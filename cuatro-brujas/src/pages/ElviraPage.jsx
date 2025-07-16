import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, description, price, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="magical-card p-6"
  >
    <div className="text-4xl mb-4 text-center">{icon}</div>
    <h3 className="text-xl font-bold text-light mb-3 text-center">{title}</h3>
    <p className="text-light/70 text-center mb-4">{description}</p>
    <p className="text-accent font-bold text-center text-2xl">{price}</p>
  </motion.div>
);

const ElviraPage = () => {
  const services = [
    {
      title: "Lectura General",
      description: "Descubre las energías que te rodean y las influencias en tu camino actual.",
      price: "Incluido con Combo Místico",
      icon: "🌟"
    },
    {
      title: "Amor y Relaciones",
      description: "Explora tu vida amorosa, relaciones futuras y conexiones espirituales.",
      price: "Incluido con Combo del Corazón",
      icon: "💝"
    },
    {
      title: "Carrera y Abundancia",
      description: "Conoce las oportunidades laborales y financieras en tu horizonte.",
      price: "Incluido con Combo Próspero",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary z-0"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h1 className="text-5xl md:text-6xl font-bold magical-text mb-6">
                Elvira
              </h1>
              <h2 className="text-2xl text-secondary mb-6">
                Maestra del Tarot
              </h2>
              <p className="text-xl text-light/80 leading-relaxed mb-8">
                Con más de 20 años de experiencia en las artes místicas, 
                Elvira combina la sabiduría ancestral del tarot con una 
                conexión única con las energías universales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/brujas/elvira/lectura"
                  className="magical-btn bg-secondary hover:bg-secondary/90 text-center"
                >
                  🔮 Comenzar Lectura Gratis
                </Link>
                <Link 
                  to="/nuestra-carta"
                  className="magical-btn border border-secondary hover:bg-secondary/20 text-center"
                >
                  🍔 Ver Combos Místicos
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-secondary/50 shadow-2xl shadow-secondary/30">
                  <img
                    src="/avatares/elvira.png"
                    alt="Elvira"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl animate-bounce">
                  🔮
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold magical-text text-center mb-12"
          >
            Servicios Místicos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="magical-card p-8"
          >
            <h2 className="text-3xl font-bold magical-text text-center mb-8">
              ¿Cómo Funciona?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">1️⃣</div>
                <div>
                  <h3 className="text-xl font-bold text-light mb-2">Elige tu Combo</h3>
                  <p className="text-light/70">
                    Selecciona el combo que más te llame. Cada uno incluye una lectura específica.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">2️⃣</div>
                <div>
                  <h3 className="text-xl font-bold text-light mb-2">Recibe tu Código</h3>
                  <p className="text-light/70">
                    Con tu pedido recibirás un código místico único para tu lectura.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">3️⃣</div>
                <div>
                  <h3 className="text-xl font-bold text-light mb-2">Prepárate</h3>
                  <p className="text-light/70">
                    Mientras disfrutas tu comida, piensa en las preguntas que deseas hacer.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">4️⃣</div>
                <div>
                  <h3 className="text-xl font-bold text-light mb-2">Recibe tu Lectura</h3>
                  <p className="text-light/70">
                    Ingresa tu código y recibe una lectura personalizada de Elvira.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-bold magical-text mb-6">
              ¿Listo para Descubrir tu Destino?
            </h2>
            <p className="text-light/80 mb-8">
              Haz tu pedido ahora y prepárate para una experiencia mística única 
              que combina los mejores sabores con la sabiduría del tarot.
            </p>
            <div className="space-y-4">
              <Link 
                to="/brujas/elvira/lectura"
                className="magical-btn inline-block bg-secondary hover:bg-secondary/90 text-light px-8 py-4 rounded-full transition"
              >
                🔮 Lectura Gratuita
              </Link>
              <p className="text-light/60 text-sm">
                * También disponible con código de pedido
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ElviraPage; 