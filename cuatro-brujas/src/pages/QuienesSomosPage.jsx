import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const QuienesSomosPage = () => {
  const teamMembers = [
    {
      name: "Calypso",
      role: "Maestra del Tarot",
      description: "Experta en lectura de cartas del tarot, Calypso revela los misterios de tu destino mientras disfrutas de nuestras hamburguesas místicas.",
      image: "/avatares/calypso.png"
    },
    {
      name: "Orula",
      role: "Numerología y Destino",
      description: "Especialista en numerología y destino, Orula descifra los patrones numéricos que influyen en tu vida y te guía hacia tu verdadero camino.",
      image: "/avatares/orula.png"
    },
    {
      name: "Aisha",
      role: "Chakras y Energía",
      description: "Maestra en armonización de chakras y energías, Aisha te ayuda a encontrar el equilibrio perfecto entre cuerpo, mente y espíritu.",
      image: "/avatares/aisha.png"
    },
    {
      name: "Sirona",
      role: "Horóscopo y Carta Astral",
      description: "Intérprete de los astros y cartas astrales, Sirona lee los mensajes celestiales para revelar tu verdadera esencia y destino.",
      image: "/avatares/sirona.png"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary z-0"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold font-title mb-6 magical-text"
            >
              Magia y Sabor Unidos
            </motion.h1>
            <p className="text-xl text-light/80 leading-relaxed">
              En Cuatro Brujas, fusionamos la magia ancestral con el arte culinario moderno. 
              Nuestras smash burgers, preparadas con ingredientes seleccionados y un toque místico, 
              te transportarán a una experiencia única mientras descubres lo que el destino tiene preparado para ti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold font-title mb-8 magical-text text-center"
          >
            Nuestros Valores
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">🍔</div>
              <h3 className="text-xl font-bold text-light mb-3">Smash Burgers Místicas</h3>
              <p className="text-light/70">
                Hamburguesas smash preparadas con ritual y pasión, usando ingredientes premium y técnicas artesanales.
              </p>
            </div>
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-bold text-light mb-3">Consultas Místicas</h3>
              <p className="text-light/70">
                Servicios de lectura espiritual personalizados mientras disfrutas de tu comida.
              </p>
            </div>
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-light mb-3">Delivery 24/7</h3>
              <p className="text-light/70">
                Entrega a domicilio las 24 horas, porque la magia y el antojo no tienen horario.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-title mb-8 magical-text text-center"
          >
            Nuestras Brujas Místicas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="magical-card p-6 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold font-title text-light mb-2">
                  {member.name}
                </h3>
                <p className="text-secondary mb-3">{member.role}</p>
                <p className="text-light/70 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="magical-card text-center max-w-3xl mx-auto p-8"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold font-title mb-6 magical-text"
            >
              ¡Pide tu Hamburguesa Mística!
            </motion.h2>
            <p className="text-light/80 mb-8">
              Disfruta de nuestras deliciosas smash burgers mientras descubres los secretos que el universo 
              tiene preparados para ti. Delivery 24/7 y consultas místicas en cada pedido.
            </p>
            <Link to="/nuestra-carta" className="magical-btn inline-block">
              🍔 Ver Carta Mágica
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomosPage; 