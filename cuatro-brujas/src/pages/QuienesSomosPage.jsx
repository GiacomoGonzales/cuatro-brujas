import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const QuienesSomosPage = () => {
  const teamMembers = [
    {
      name: "Elvira",
      role: "Maestra del Tarot",
      description: "Con más de 20 años de experiencia en la lectura del tarot, Elvira combina la sabiduría ancestral con técnicas modernas de interpretación.",
      image: "/avatares/elvira.png"
    },
    {
      name: "Zodika",
      role: "Intérprete de Estrellas",
      description: "Especialista en astrología y cartas astrales, Zodika descifra los mensajes que los astros tienen reservados para ti.",
      image: "/avatares/zodika.png"
    },
    {
      name: "Numina",
      role: "Guardiana de los Números",
      description: "Experta en numerología y análisis numerológico, Numina revela los secretos ocultos en los números que rigen tu vida.",
      image: "/avatares/numina.png"
    },
    {
      name: "Lunara",
      role: "Vidente Lunar",
      description: "Conectada con los ciclos lunares y las energías celestiales, Lunara te guía a través de predicciones precisas y consejos místicos.",
      image: "/avatares/lunara.png"
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
            <h1 className="text-5xl md:text-6xl font-bold magical-text mb-6">
              Nuestra Historia Mística
            </h1>
            <p className="text-xl text-light/80 leading-relaxed">
              Cuatro Brujas nació de la unión entre la magia ancestral y la innovación moderna. 
              Somos un equipo de videntes y místicas expertas dedicadas a guiar tu camino espiritual 
              a través de diferentes artes adivinatorias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-light mb-3">Sabiduría Ancestral</h3>
              <p className="text-light/70">
                Preservamos y transmitimos conocimientos místicos milenarios adaptados al mundo moderno.
              </p>
            </div>
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-bold text-light mb-3">Conexión Espiritual</h3>
              <p className="text-light/70">
                Facilitamos tu viaje de autodescubrimiento y crecimiento personal.
              </p>
            </div>
            <div className="magical-card text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-bold text-light mb-3">Innovación Mística</h3>
              <p className="text-light/70">
                Combinamos tradición con tecnología para una experiencia mágica única.
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
            className="text-4xl font-bold magical-text text-center mb-12"
          >
            Conoce a Nuestras Brujas
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
                <h3 className="text-2xl font-bold text-light mb-2">{member.name}</h3>
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
            <h2 className="text-3xl font-bold magical-text mb-6">
              Comienza Tu Viaje Místico
            </h2>
            <p className="text-light/80 mb-8">
              Descubre los secretos que el universo tiene preparados para ti. 
              Nuestras brujas están listas para guiarte en tu camino espiritual.
            </p>
            <Link to="/tarot" className="magical-btn inline-block">
              🔮 Consulta Ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomosPage; 