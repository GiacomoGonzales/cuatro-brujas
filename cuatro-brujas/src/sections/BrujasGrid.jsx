import { motion } from "framer-motion";
import WitchCard from "../components/WitchCard";

const BrujasGrid = () => {
  const witches = [
    {
      name: "Calypso",
      role: "Tarot",
      description: "Descubre tu destino a través de las cartas místicas del tarot.",
      image: "/avatares/calypso.png",
      route: "/tarot",
      idBruja: "calypso"
    },
    {
      name: "Orula",
      role: "Numerología y Destino",
      description: "Los números y el destino revelan el camino de tu vida.",
      image: "/avatares/orula.png",
      route: "/numerologia",
      idBruja: "orula"
    },
    {
      name: "Aisha",
      role: "Chakras y Energía",
      description: "Equilibra tus chakras y armoniza tu energía vital.",
      image: "/avatares/aisha.png",
      route: "/chakras",
      idBruja: "aisha"
    },
    {
      name: "Sirona",
      role: "Horóscopo y Carta Astral",
      description: "Los astros guían tu camino y revelan tu verdadera esencia.",
      image: "/avatares/sirona.png",
      route: "/horoscopo",
      idBruja: "sirona"
    }
  ];

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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 magical-text font-title">
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
                idBruja={witch.idBruja}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrujasGrid; 