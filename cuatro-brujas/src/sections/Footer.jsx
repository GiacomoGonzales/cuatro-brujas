import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', url: '#', icon: 'ri-instagram-line' },
    { name: 'Facebook', url: '#', icon: 'ri-facebook-circle-line' },
    { name: 'TikTok', url: '#', icon: 'ri-tiktok-line' },
    { name: 'WhatsApp', url: '#', icon: 'ri-whatsapp-line' },
  ];

  const quickLinks = [
    { name: 'Quiénes somos', url: '/quienes-somos' },
    { name: 'Zona de reparto', url: '/zona-reparto' },
    { name: 'Cómo funciona', url: '/como-funciona' },
    { name: 'Blog Místico', url: '/blog' },
  ];

  const services = [
    { 
      name: 'Lectura de Tarot',
      url: '/consulta/calypso',
      bruja: 'Calypso'
    },
    { 
      name: 'Numerología y Destino',
      url: '/consulta/orula',
      bruja: 'Orula'
    },
    { 
      name: 'Chakras y Energía',
      url: '/consulta/aisha',
      bruja: 'Aisha'
    },
    { 
      name: 'Horóscopo y Carta Astral',
      url: '/consulta/sirona',
      bruja: 'Sirona'
    }
  ];

  return (
    <footer className="bg-primary/90 border-t border-secondary/30">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Cuatro Brujas" 
                className="h-12 md:h-14 w-auto mx-auto md:mx-0"
                onError={(e) => {
                  console.error('Error loading logo:', e);
                  e.target.src = '/vite.svg'; // Fallback image
                }}
              />
            </div>
            <p className="text-light/70 mb-6 leading-relaxed">
              Conectamos el mundo místico con la tecnología moderna. 
              Guiamos tu camino espiritual con sabiduría ancestral.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  <i className={`${social.icon} text-2xl`}></i>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-semibold text-light mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-light/70 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-semibold text-light mb-4">Nuestros Servicios</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.url} 
                    className="text-light/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group md:justify-start justify-center"
                  >
                    <span>{service.name}</span>
                    <span className="text-xs text-secondary/50 group-hover:text-accent/70 transition-colors duration-300 hidden md:inline">
                      por {service.bruja}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-semibold text-light mb-4">Contacto</h4>
            <div className="space-y-3 text-light/70">
              <p>
                <i className="ri-mail-line mr-2"></i>
                consultas@cuatrobrujas.app
              </p>
              <p>
                <i className="ri-whatsapp-line mr-2"></i>
                +51 941 465 012
              </p>
              <p>
                <i className="ri-time-line mr-2"></i>
                Horario 24/7
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-secondary/30 pt-8 mt-8 text-center"
        >
          <p className="text-light/60">
            © 2025 Cuatro Brujas. Todos los derechos reservados en esta dimensión y otras paralelas.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 