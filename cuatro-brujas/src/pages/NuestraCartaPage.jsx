import { motion } from "framer-motion";

const NuestraCartaPage = () => {
  const menuCategories = [
    {
      title: "🌟 Combos Mágicos",
      items: [
        {
          name: "Combo Místico",
          description: "Hamburguesa doble, papas místicas, bebida encantada",
          price: "$15.99",
          image: "/menu/combo-mistico.jpg"
        },
        {
          name: "Combo Zodiacal",
          description: "Hamburguesa especial, aros de cebolla mágicos, bebida",
          price: "$13.99",
          image: "/menu/combo-zodiacal.jpg"
        }
      ]
    },
    {
      title: "🍔 Hamburguesas Místicas",
      items: [
        {
          name: "La Bruja Suprema",
          description: "Doble carne, queso cheddar, bacon, salsa secreta",
          price: "$12.99",
          image: "/menu/bruja-suprema.jpg"
        },
        {
          name: "La Hechicera",
          description: "Carne especial, champiñones, queso suizo, rúcula",
          price: "$11.99",
          image: "/menu/hechicera.jpg"
        }
      ]
    },
    {
      title: "🍟 Acompañamientos Encantados",
      items: [
        {
          name: "Papas Místicas",
          description: "Papas fritas con polvo de especias mágicas",
          price: "$4.99",
          image: "/menu/papas-misticas.jpg"
        },
        {
          name: "Aros de Poder",
          description: "Aros de cebolla con salsa especial",
          price: "$5.99",
          image: "/menu/aros-poder.jpg"
        }
      ]
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
            Carta Mágica
          </motion.h1>
          <p className="text-xl text-light/80 leading-relaxed">
            Descubre nuestras creaciones místicas, donde cada bocado es una 
            experiencia mágica que transporta tus sentidos a otra dimensión.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Categorías */}
          <div className="grid gap-16 mt-16">
            {/* Hamburguesas */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-8 magical-text">
                Hamburguesas Místicas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menuCategories[1].items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: itemIndex * 0.1 }}
                    className="magical-card p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-secondary/30">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-food.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-light mb-2">
                          {item.name}
                        </h3>
                        <p className="text-light/70 text-sm mb-2">
                          {item.description}
                        </p>
                        <p className="text-accent font-bold">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Complementos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-8 magical-text">
                Complementos Mágicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menuCategories[2].items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: itemIndex * 0.1 }}
                    className="magical-card p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-secondary/30">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-food.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-light mb-2">
                          {item.name}
                        </h3>
                        <p className="text-light/70 text-sm mb-2">
                          {item.description}
                        </p>
                        <p className="text-accent font-bold">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Bebidas */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-title font-bold mb-8 magical-text">
                Pociones y Elixires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menuCategories[0].items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: itemIndex * 0.1 }}
                    className="magical-card p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-secondary/30">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-food.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-light mb-2">
                          {item.name}
                        </h3>
                        <p className="text-light/70 text-sm mb-2">
                          {item.description}
                        </p>
                        <p className="text-accent font-bold">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
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
              ¿Listo para un Festín Mágico?
            </h2>
            <p className="text-light/80 mb-8">
              Haz tu pedido ahora y déjate llevar por los sabores místicos de 
              nuestras creaciones especiales.
            </p>
            <button className="magical-btn">
              🛵 Hacer Pedido
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NuestraCartaPage; 