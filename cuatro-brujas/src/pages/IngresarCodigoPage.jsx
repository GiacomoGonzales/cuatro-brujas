import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateAccessCode } from '../services/firestoreService';
import { saveSessionData } from '../services/sessionService';

const IngresarCodigoPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationStatus, setValidationStatus] = useState(''); // 'success', 'error', ''
  const [showCodeSection, setShowCodeSection] = useState(false);

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

  // Autocompletar código desde URL
  useEffect(() => {
    const codigoFromUrl = searchParams.get('codigo');
    if (codigoFromUrl) {
      setCode(codigoFromUrl);
      setShowCodeSection(true);
    }
  }, [searchParams]);

  const scrollToCodeSection = () => {
    setShowCodeSection(true);
    setTimeout(() => {
      const codeSection = document.getElementById('code-section');
      if (codeSection) {
        // Calcular offset personalizado para móvil
        const isMobile = window.innerWidth < 768;
        const headerHeight = 80; // Altura aproximada del header
        const extraPadding = isMobile ? 60 : 40; // Más espacio en móvil
        
        const rect = codeSection.getBoundingClientRect();
        const scrollPosition = window.pageYOffset + rect.top - headerHeight - extraPadding;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleValidateCode = async () => {
    if (!code.trim()) {
      setValidationMessage('Por favor ingresa tu código portal mágico.');
      setValidationStatus('error');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');
    setValidationStatus('');

    try {
      const result = await validateAccessCode(code.trim());
      
      if (result.success) {
        setValidationMessage('¡Portal activado! Has accedido al reino místico. Elige a tu bruja favorita para comenzar tu lectura.');
        setValidationStatus('success');
        
        // Guardar los datos de la sesión usando el nuevo servicio
        saveSessionData(code.trim(), result.codeData);
        
        // Redirigir a la página de lecturas después de 2 segundos
        setTimeout(() => {
          navigate('/lecturas');
        }, 2000);
      } else {
        setValidationMessage(result.message || 'Código portal inválido o expirado. Verifica tu código e inténtalo nuevamente.');
        setValidationStatus('error');
      }
    } catch (error) {
      console.error('Error validating code:', error);
      setValidationMessage('Error al activar el portal. Por favor intenta nuevamente.');
      setValidationStatus('error');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleValidateCode();
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Fondo con imagen mágica */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90 z-10"></div>
          <img 
            src="/backgrounds/hero-bg.png" 
            alt="Fondo mágico" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-20 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-title magical-text mb-6"
          >
            Has Atravesado el Portal Mágico
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-light/90 mb-12 font-light"
          >
            Bienvenido al reino místico de las cuatro brujas. Ahora que has cruzado el portal, activa tu código mágico para acceder a tus lecturas esotéricas.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToCodeSection}
            className="bg-secondary text-light px-8 py-4 rounded-full text-lg font-body hover:bg-secondary/90 transition-all duration-300 animate-glow"
          >
            🗝️ Activar código portal
          </motion.button>
        </div>
      </section>

      {/* Sección de Ingreso de Código */}
      <AnimatePresence>
        {showCodeSection && (
          <motion.section
            id="code-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-24 pb-20 px-4 bg-gradient-to-b from-primary to-dark"
          >
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-title magical-text mb-8"
              >
                🗝️ Activa tu código portal mágico
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="Introduce tu código portal"
                  className="w-full max-w-md px-6 py-4 bg-primary/50 border border-secondary/30 rounded-full text-center text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors text-lg font-body"
                  disabled={isValidating}
                />

                <button
                  onClick={handleValidateCode}
                  disabled={isValidating || !code.trim()}
                  className="w-full max-w-md bg-secondary text-light px-8 py-4 rounded-full text-lg font-body hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isValidating ? '🌀 Conectando... Puede tardar unos segundos' : '✨ Ingresar al reino místico'}
                </button>

                {/* Mensaje de validación */}
                <AnimatePresence>
                  {validationMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border ${
                        validationStatus === 'success'
                          ? 'bg-green-900/30 border-green-500/50 text-green-300'
                          : 'bg-red-900/30 border-red-500/50 text-red-300'
                      }`}
                    >
                      {validationMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Sección ¿Aún no tienes tu código? */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark to-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-title magical-text mb-8"
          >
            🔮 ¿Aún no tienes tu código portal?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-light/90 mb-8 leading-relaxed font-body"
          >
            ¡Es muy fácil obtener tu llave al reino místico! Solo necesitas pedir una de nuestras deliciosas hamburguesas encantadas y recibirás un código portal único para acceder a tus lecturas semanales.
            <br /><br />
            <span className="magical-text font-semibold">
              Vive la experiencia Cuatro Brujas: hamburguesas mágicas + portal a lecturas esotéricas.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
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
                🍔 Ver Carta y Pedir
              </motion.button>
              
              {/* Botón oculto de Gloria Food - Debe estar visible en el DOM pero oculto visualmente */}
              <span 
                className="glf-button glf-button-hidden"
                data-glf-cuid="cab9aa12-59eb-4058-ac46-594953a61cfa"
                data-glf-ruid="0a86274a-3227-422f-b140-e04bf8f9b334"
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              >
                Order Online
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IngresarCodigoPage;