import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const QuienesSomosPage = () => {
  // Cargar script de Gloria Food
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.fbgcdn.com/embedder/js/ewm2.js';
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar script al desmontar componente
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Calypso",
      role: "Maestra del Tarot",
      description: "Experta en lectura de cartas del tarot, Calypso revela los misterios de tu destino mientras disfrutas de nuestras hamburguesas místicas.",
      image: "/avatares/calypso.MP4"
    },
    {
      name: "Orula",
      role: "Numerología y Destino",
      description: "Especialista en numerología y destino, Orula descifra los patrones numéricos que influyen en tu vida y te guía hacia tu verdadero camino.",
      image: "/avatares/orula.MP4"
    },
    {
      name: "Zaira",
      role: "Chakras y Energía",
      description: "Maestra en armonización de chakras y energías, Zaira te ayuda a encontrar el equilibrio perfecto entre cuerpo, mente y espíritu.",
      image: "/avatares/zaira.MP4"
    },
    {
      name: "Sirona",
      role: "Horóscopo y Carta Astral",
      description: "Intérprete de los astros y cartas astrales, Sirona lee los mensajes celestiales para revelar tu verdadera esencia y destino.",
      image: "/avatares/sirona.MP4"
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
                Entrega a domicilio las 24 horas a casi todo Lima Metropolitana. 
                Llevamos magia y sabor a tu puerta sin importar la hora.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-primary/95 to-primary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold font-title mb-6 magical-text"
            >
              🚚 Delivery Mágico 24/7
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="magical-card p-6">
                <div className="text-3xl mb-4">🌃</div>
                <h3 className="text-xl font-bold text-light mb-3">24 Horas, 7 Días</h3>
                <p className="text-light/80">
                  No importa si es medianoche o madrugada, estamos aquí para satisfacer 
                  tus antojos místicos las 24 horas del día, todos los días del año.
                </p>
              </div>
              <div className="magical-card p-6">
                <div className="text-3xl mb-4">🏙️</div>
                <h3 className="text-xl font-bold text-light mb-3">Lima Metropolitana</h3>
                <p className="text-light/80">
                  Delivery 24 horas a todo Lima Metropolitana. Los pedidos se realizan 
                  a través de nuestra carta virtual directamente en esta web.
                </p>
              </div>
            </motion.div>
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
                  {member.image.toLowerCase().endsWith('.mp4') || member.image.toLowerCase().endsWith('.MP4') ? (
                    <video
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  )}
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
              tiene preparados para ti. Con delivery 24 horas a casi todo Lima Metropolitana, 
              puedes disfrutar de la magia culinaria en cualquier momento del día o la noche.
            </p>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-primary px-8 py-4 rounded-full text-lg font-body font-semibold hover:bg-accent/90 transition-all duration-300 animate-glow"
                onClick={() => {
                  // Pequeño delay para asegurar que Gloria Food esté inicializado
                  setTimeout(() => {
                    const gloriaButton = document.querySelector('.glf-button-hidden');
                    if (gloriaButton) {
                      gloriaButton.click();
                    } else {
                      console.log('Gloria Food button not found, trying alternative approach');
                      // Intentar disparar el evento manualmente
                      if (window.GloriaFood && window.GloriaFood.openModal) {
                        window.GloriaFood.openModal();
                      }
                    }
                  }, 100);
                }}
              >
                🍔 Ver Carta Mágica
              </motion.button>
              
              {/* Botón oculto de Gloria Food - Debe estar visible en el DOM pero oculto visualmente */}
              <span 
                className="glf-button glf-button-hidden"
                data-glf-cuid="cab9aa12-59eb-4058-ac46-594953a61cfa"
                data-glf-ruid="0a86274a-3227-422f-b140-e04bf8f9b334"
                style={{ 
                  position: 'absolute', 
                  left: '-9999px', 
                  top: '-9999px',
                  opacity: 0,
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden'
                }}
              >
                Ver el MENÚ y PEDIR
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomosPage; 