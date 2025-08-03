import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const phrases = [
  "Predice tu destino… o pídetelo con papas 🍟 a cualquier hora.",
  "Tu futuro sabe a smash burger. 🔮🍔",
  "Hamburguesas mágicas a domicilio, 24/7.",
  "Lecturas cósmicas y combos encantados.",
  "¿Tarot o triple con queso? Tú decides."
];

const HeroTextRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-lg md:text-xl mt-4 h-[48px] relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="absolute text-light"
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const BackgroundVideo = ({ src, fallbackImage }) => {
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const fadeOutStart = 4;
      const videoDuration = 5;
      
      if (currentTime >= fadeOutStart) {
        const fadeProgress = (currentTime - fadeOutStart) / (videoDuration - fadeOutStart);
        const newOpacity = Math.max(0, 1 - fadeProgress);
        setVideoOpacity(newOpacity);
      } else {
        setVideoOpacity(1);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      setVideoOpacity(1);
      video.play().catch(() => {
        // Si falla el play automático, no hacemos nada
        // El usuario tendrá que interactuar con la página
      });
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Si falla el play automático, no hacemos nada
        // El usuario tendrá que interactuar con la página
      });
    };

    // Intentar reproducir cuando haya interacción con la página
    const handleInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Si falla el play, no hacemos nada
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('click', handleInteraction);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <>
      {/* Imagen de respaldo (solo se muestra si el video no está cargado) */}
      {!isVideoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Video de fondo */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        muted
        playsInline
        autoPlay
        loop={false}
        style={{ 
          opacity: videoOpacity,
          '-webkit-media-controls-start-playback-button': 'none',
          '-webkit-media-controls': 'none',
          '-webkit-media-controls-overlay-play-button': 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? videoOpacity : 0 }}
        transition={{ duration: 0.3 }}
        playsinline="true"
        webkit-playsinline="true"
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </>
  );
};

const Hero = () => {
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

  const scrollToPortal = () => {
    const portalSection = document.getElementById('portal-section');
    if (portalSection) {
      portalSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video de fondo con fade out */}
      <BackgroundVideo 
        src="/hero-video.mp4"
        fallbackImage="/backgrounds/hero-bg.png"
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-20"></div>
      
      <div className="relative z-30 flex items-start md:items-center justify-end min-h-screen px-6 md:px-20 pt-40 md:pt-20">
        <div className="text-right max-w-lg">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold font-title mb-4 text-golden"
          >
            Cuatro Brujas
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6"
          >
            <HeroTextRotator />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 items-end"
          >
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-light px-6 py-3 rounded-full hover:bg-secondary/80 transition font-body"
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
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPortal}
              className="border border-secondary text-light px-6 py-3 rounded-full hover:bg-secondary/20 transition font-body"
            >
              ✨ Comenzar tu Viaje Místico
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 