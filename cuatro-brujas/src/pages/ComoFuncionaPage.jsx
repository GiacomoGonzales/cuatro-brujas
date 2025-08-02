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
      title: "Explora Nuestra Carta",
      description: "Hamburguesas artesanales disponibles 24/7 para satisfacer tu antojo a cualquier hora.",
      icon: "🍔"
    },
    {
      number: "2",
      title: "Obtén tu Código Mágico",
      description: "Cada pedido incluye un código válido por 7 días que abre las puertas al mundo místico.",
      icon: "🔑"
    },
    {
      number: "3",
      title: "Elige tu Bruja Guía",
      description: "Selecciona entre tarot, astrología, numerología y más especialidades místicas.",
      icon: "🔮"
    },
    {
      number: "4",
      title: "Recibe tu Lectura",
      description: "Disfruta de una experiencia personalizada guiada por nuestras expertas brujas.",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-title mb-6 magical-text"
          >
            Cómo Funciona
          </motion.h1>

          {/* Secciones */}
          <div className="grid gap-12 mt-16">
            {/* Sección 1: Haz tu Pedido Mágico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-4 magical-text">
                1. Haz tu Pedido Mágico
              </h2>
              <p className="text-xl text-light/80 leading-relaxed">
                Explora nuestra carta disponible las 24 horas y elige nuestras hamburguesas artesanales, 
                creadas para satisfacer tu antojo a cualquier hora del día… o de la noche.
              </p>
            </motion.div>

            {/* Sección 2: Recibe tu Código de Acceso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-4 magical-text">
                2. Recibe tu Código de Acceso
              </h2>
              <p className="text-xl text-light/80 leading-relaxed">
                Con cada pedido, obtienes un código mágico válido por 7 días. Este código te abre la puerta 
                al mundo místico de Cuatro Brujas, donde podrás consultar con la bruja que elijas.
              </p>
            </motion.div>

            {/* Sección 3: Disfruta tu Lectura Exclusiva */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-4 magical-text">
                3. Disfruta tu Lectura Exclusiva
              </h2>
              <p className="text-xl text-light/80 leading-relaxed">
                Usa tu código en nuestra web y accede a una lectura personalizada: tarot, astrología, 
                numerología y más, guiada por nuestras brujas.
              </p>
            </motion.div>
          </div>

          {/* Mensaje final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-2xl font-bold magical-text">
              ¡Comida deliciosa y magia real, en un solo lugar!
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-4">🕐</div>
                <h3 className="text-xl font-bold text-light mb-2">Disponible 24/7</h3>
                <p className="text-light/70">
                  Hamburguesas artesanales a cualquier hora del día o de la noche.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-light mb-2">Código 7 Días</h3>
                <p className="text-light/70">
                  Tu código mágico es válido por una semana completa para que disfrutes cuando quieras.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-light mb-2">Lectura Personalizada</h3>
                <p className="text-light/70">
                  Tarot, astrología, numerología y más, todo adaptado a tu energía única.
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