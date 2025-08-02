import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const LecturasPage = () => {
  const navigate = useNavigate();

  // Verificar control de acceso al cargar la página
  useEffect(() => {
    const accessValidated = sessionStorage.getItem('accessValidated');
    if (accessValidated !== 'true') {
      // Comentar temporalmente para pruebas - descomenta para producción
      // navigate('/viaje-mistico');
      // return;
      
      // Para pruebas: establecer acceso temporal
      sessionStorage.setItem('accessValidated', 'true');
      console.log('🔧 Acceso temporal establecido para pruebas');
    }
  }, [navigate]);

  // Datos de las brujas según especificaciones
  const brujas = [
    {
      id: 'calypso',
      name: 'CALYPSO',
      specialty: 'Tarot',
      image: '/avatares/elvira.png',
      buttonText: 'Consultar',
      route: '/consulta/calypso'
    },
    {
      id: 'orula',
      name: 'ORULA',
      specialty: 'Numerología y Destino',
      image: '/avatares/numina.png',
      buttonText: 'Descifrar',
      route: '/consulta/orula'
    },
    {
      id: 'aisha',
      name: 'AISHA',
      specialty: 'Chakras y Energía',
      image: '/avatares/lunara.png',
      buttonText: 'Armonizar',
      route: '/consulta/aisha'
    },
    {
      id: 'sirona',
      name: 'SIRONA',
      specialty: 'Horóscopo y Carta Astral',
      image: '/avatares/zodika.png',
      buttonText: 'Explorar',
      route: '/consulta/sirona'
    }
  ];

  const handleBrujaClick = (bruja) => {
    navigate(bruja.route);
  };

  const BrujaCard = ({ bruja, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="magical-card p-8 text-center group hover:scale-105 transition-all duration-300"
    >
      {/* Imagen de la bruja */}
      <div className="relative mb-6 mx-auto w-48 h-48 lg:w-56 lg:h-56">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full"></div>
        <img
          src={bruja.image}
          alt={bruja.name}
          className="w-full h-full object-cover rounded-full border-4 border-secondary/30 group-hover:border-secondary/60 transition-colors duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-full"></div>
      </div>

      {/* Nombre de la bruja */}
      <h3 className="text-3xl lg:text-4xl font-bold font-title magical-text mb-4">
        {bruja.name}
      </h3>

      {/* Especialidad */}
      <p className="text-lg lg:text-xl text-secondary mb-8 font-body">
        {bruja.specialty}
      </p>

      {/* Botón */}
      <button
        onClick={() => handleBrujaClick(bruja)}
        className="bg-gradient-to-r from-secondary to-accent text-primary px-8 py-4 rounded-full text-lg font-body font-semibold hover:from-secondary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-300 animate-glow"
      >
        ✨ {bruja.buttonText}
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-primary">
      {/* Fondo mágico */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10"></div>
        <img 
          src="/backgrounds/hero-bg.png" 
          alt="Fondo mágico" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 pt-24 pb-16">
        {/* Header de la página */}
        <section className="text-center mb-16 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-title magical-text mb-6"
          >
            ✨ Elige tu Lectura Mágica ✨
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-light/90 font-body max-w-3xl mx-auto"
          >
            Selecciona a la bruja que resonará con tu energía y descubre los secretos que tiene para ti.
          </motion.p>
        </section>

        {/* Grid de brujas - Desktop */}
        <section className="hidden lg:block px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">
              {brujas.map((bruja, index) => (
                <BrujaCard key={bruja.id} bruja={bruja} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Carrusel de brujas - Mobile y Tablet */}
        <section className="lg:hidden px-4 relative">
          <div className="container mx-auto relative">
            {/* Indicadores de scroll en los bordes */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-24 bg-gradient-to-r from-primary/80 to-transparent pointer-events-none flex items-center">
              <div className="w-1 h-12 bg-secondary/30 rounded-full ml-2 animate-pulse"></div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-24 bg-gradient-to-l from-primary/80 to-transparent pointer-events-none flex items-center justify-end">
              <div className="w-1 h-12 bg-secondary/30 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="brujas-swiper"
            >
              {brujas.map((bruja, index) => (
                <SwiperSlide key={bruja.id}>
                  <BrujaCard bruja={bruja} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Indicador sutil de scroll horizontal - solo móvil */}
        <section className="lg:hidden text-center mt-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-secondary/60"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-secondary/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <span className="text-sm font-body">Desliza para ver más brujas</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-secondary/60 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </motion.div>
        </section>
      </div>



      {/* Estilos personalizados para Swiper */}
      <style jsx>{`
        .brujas-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        
        .brujas-swiper .swiper-pagination-bullet {
          background-color: rgba(165, 106, 255, 0.3) !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
        }
        
        .brujas-swiper .swiper-pagination-bullet-active {
          background-color: #a56aff !important;
          transform: scale(1.2) !important;
        }
        
        .magical-card {
          background: linear-gradient(135deg, rgba(20, 0, 24, 0.9) 0%, rgba(20, 0, 24, 0.7) 100%);
          border: 1px solid rgba(165, 106, 255, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .magical-card:hover {
          border-color: rgba(165, 106, 255, 0.4);
          box-shadow: 0 25px 50px rgba(165, 106, 255, 0.1);
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(165, 106, 255, 0.3);
          }
          to {
            box-shadow: 0 0 30px rgba(165, 106, 255, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default LecturasPage;