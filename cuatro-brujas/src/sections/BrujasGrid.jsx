import { motion } from "framer-motion";
import WitchCard from "../components/WitchCard";

const BrujasGrid = () => {
  const witches = [
    {
      name: "Calypso",
      role: "Tarot",
      description: "Maestra del tarot con 20 años de experiencia.",
      image: "/avatares/elvira.png",
      route: "/tarot",
    },
    {
      name: "Orula",
      role: "Carta Astral",
      description: "Interpreta los astros para descubrir tu esencia cósmica.",
      image: "/avatares/zodika.png",
      route: "/carta-astral",
    },
    {
      name: "Aisha",
      role: "Numerología",
      description: "Los números revelan secretos ocultos sobre tu destino.",
      image: "/avatares/numina.png",
      route: "/numerologia",
    },
    {
      name: "Sirona",
      role: "Horóscopo",
      description: "Tus signos celestiales te guían a través del día.",
      image: "/avatares/lunara.png",
      route: "/horoscopo",
    }
  ];

  return (
    <section 
      className="relative bg-no-repeat bg-cover bg-center py-20 px-4 md:px-8"
      style={{ backgroundImage: "url('/backgrounds/constelaciones.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 magical-text">
            Conoce a Nuestras Brujas
          </h2>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Cada bruja tiene su especialidad mística. Elige tu camino hacia el conocimiento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {witches.map((witch, index) => (
            <motion.div
              key={witch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <WitchCard
                name={witch.name}
                role={witch.role}
                description={witch.description}
                image={witch.image}
                route={witch.route}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrujasGrid; 