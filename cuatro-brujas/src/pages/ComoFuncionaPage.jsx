import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StepCard = ({ number, title, description, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="magical-card p-6 relative"
  >
    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-light font-bold">
      {number}
    </div>
    <div className="text-4xl mb-4 text-center">{icon}</div>
    <h3 className="text-xl font-bold text-light mb-3 text-center">{title}</h3>
    <p className="text-light/70 text-center">{description}</p>
  </motion.div>
);

const ComoFuncionaPage = () => {
  const steps = [
    {
      number: "1",
      title: "Elige tu Combo Mágico",
      description: "Selecciona entre nuestras deliciosas hamburguesas místicas y acompañamientos encantados.",
      icon: "🍔"
    },
    {
      number: "2",
      title: "Realiza tu Pedido",
      description: "Completa tu orden y recibe tu código místico único para tu lectura personal.",
      icon: "🎫"
    },
    {
      number: "3",
      title: "Disfruta tu Comida",
      description: "Mientras disfrutas de tu pedido, prepárate para tu experiencia mística.",
      icon: "✨"
    },
    {
      number: "4",
      title: "Accede a tu Lectura",
      description: "Usa tu código para recibir una lectura personalizada de nuestras brujas expertas.",
      icon: "🔮"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold magical-text mb-6">
              Cómo Funciona la Magia
            </h1>
            <p className="text-xl text-light/80 leading-relaxed">
              En Cuatro Brujas, fusionamos la gastronomía con el misticismo. 
              Cada pedido te acerca más a los secretos que el universo tiene preparados para ti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="magical-card p-8"
          >
            <h2 className="text-3xl font-bold magical-text text-center mb-8">
              Beneficios Místicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-light mb-2">Código Único</h3>
                <p className="text-light/70">
                  Cada pedido incluye un código místico personal que desbloquea tu lectura.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-light mb-2">Lectura Personalizada</h3>
                <p className="text-light/70">
                  Nuestras brujas realizan lecturas específicas para tu energía.
                </p>
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
            <div className="space-y-4">
              <Link 
                to="/nuestra-carta"
                className="magical-btn inline-block bg-secondary hover:bg-secondary/90 text-light px-8 py-4 rounded-full transition"
              >
                🍔 Ver Nuestra Carta
              </Link>
              <p className="text-light/60 text-sm mt-4">
                * El código místico se enviará junto con la confirmación de tu pedido
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ComoFuncionaPage; 