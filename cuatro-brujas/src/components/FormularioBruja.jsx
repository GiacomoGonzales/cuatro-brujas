import { useState } from 'react';
import { motion } from 'framer-motion';
import { brujas } from '../data/brujas';
import { consultarBruja } from '../services/openaiService';
import { markReadingCompleted } from '../services/sessionService';

// Mazo de cartas del tarot para Calypso
const MAZO_TAROT = [
  'El Mago', 'La Sacerdotisa', 'La Emperatriz', 'El Emperador',
  'El Hierofante', 'Los Enamorados', 'El Carro', 'La Fuerza',
  'El Ermitaño', 'La Rueda de la Fortuna', 'La Justicia', 'El Colgado',
  'La Muerte', 'La Templanza', 'El Diablo', 'La Torre',
  'La Estrella', 'La Luna', 'El Sol', 'El Juicio', 'El Mundo', 'El Loco'
];

// Temas para las consultas
const TEMAS_TAROT = ['Amor', 'Dinero', 'Salud', 'General'];
const TEMAS_ASTRO = ['Análisis natal', 'Signo lunar'];

const FormularioBruja = ({ idBruja }) => {
  const bruja = brujas[idBruja];
  const [isLoading, setIsLoading] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState('');
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  
  // Estado inicial según la bruja
  const [formData, setFormData] = useState({
    nombre: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    horaNacimiento: '',
    lugarNacimiento: '',
    tema: '',
    emociones: '',
    pregunta: ''
  });

  if (!bruja) {
    return <div className="text-red-500">Bruja no encontrada</div>;
  }

  // Función para obtener 3 cartas aleatorias
  const obtenerCartasAleatorias = () => {
    const mazoMezclado = [...MAZO_TAROT].sort(() => Math.random() - 0.5);
    return mazoMezclado.slice(0, 3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setRespuesta('');

    // Construir datos del cliente según la bruja
    const datosCliente = {
      ...formData
    };

    // Agregar cartas seleccionadas para Calypso
    if (idBruja === 'calypso') {
      const nuevasCartas = obtenerCartasAleatorias();
      setCartasSeleccionadas(nuevasCartas);
      datosCliente.cartasSeleccionadas = nuevasCartas;
    }

    try {
      const respuestaIA = await consultarBruja(bruja, datosCliente);
      setRespuesta(respuestaIA);
      
      // Marcar la lectura como completada solo cuando se obtiene la respuesta exitosamente
      markReadingCompleted(idBruja, 'consulta');
      console.log('✅ Lectura completada exitosamente con', bruja.nombre);
    } catch (err) {
      setError(err.message || 'Error en la consulta mística');
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar campos según la bruja
  const renderCampos = () => {
    switch (idBruja) {
      case 'calypso':
        return (
          <>
            <div>
              <label htmlFor="nombre" className="block text-light mb-2 font-medium">
                Tu nombre (opcional)
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mobile-input"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="fechaNacimiento" className="block text-light mb-2 font-medium">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
                className="mobile-input"
              />
            </div>
            <div>
              <label htmlFor="tema" className="block text-light mb-2 font-medium">
                Tema de la consulta *
              </label>
              <select
                id="tema"
                name="tema"
                value={formData.tema}
                onChange={handleInputChange}
                required
                className="mobile-select"
              >
                <option value="">Selecciona un tema</option>
                {TEMAS_TAROT.map(tema => (
                  <option key={tema} value={tema}>{tema}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pregunta" className="block text-light mb-2 font-medium">
                Tu pregunta (opcional)
              </label>
              <textarea
                id="pregunta"
                name="pregunta"
                value={formData.pregunta}
                onChange={handleInputChange}
                rows="3"
                className="mobile-textarea"
                placeholder="¿Qué deseas saber?"
              />
            </div>
          </>
        );

      case 'orula':
        return (
          <>
            <div>
              <label htmlFor="nombreCompleto" className="block text-light mb-2 font-medium">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                required
                className="mobile-input"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="fechaNacimiento" className="block text-light mb-2 font-medium">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
                className="mobile-input"
              />
            </div>
          </>
        );

      case 'aisha':
        return (
          <>
            <div>
              <label htmlFor="nombre" className="block text-light mb-2 font-medium">
                Tu nombre (opcional)
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mobile-input"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="emociones" className="block text-light mb-2 font-medium">
                ¿Cómo te sientes? Describe tus emociones o síntomas *
              </label>
              <textarea
                id="emociones"
                name="emociones"
                value={formData.emociones}
                onChange={handleInputChange}
                required
                rows="4"
                className="mobile-textarea"
                style={{ minHeight: '120px' }}
                placeholder="Describe cómo te sientes física y emocionalmente..."
              />
            </div>
          </>
        );

      case 'sirona':
        return (
          <>
            <div>
              <label htmlFor="nombre" className="block text-light mb-2 font-medium">
                Tu nombre (opcional)
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mobile-input"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="fechaNacimiento" className="block text-light mb-2 font-medium">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
                className="mobile-input"
              />
            </div>
            <div>
              <label htmlFor="horaNacimiento" className="block text-light mb-2 font-medium">
                Hora de nacimiento (opcional)
              </label>
              <input
                type="time"
                id="horaNacimiento"
                name="horaNacimiento"
                value={formData.horaNacimiento}
                onChange={handleInputChange}
                className="mobile-input"
              />
            </div>
            <div>
              <label htmlFor="lugarNacimiento" className="block text-light mb-2 font-medium">
                Lugar de nacimiento (opcional)
              </label>
              <input
                type="text"
                id="lugarNacimiento"
                name="lugarNacimiento"
                value={formData.lugarNacimiento}
                onChange={handleInputChange}
                className="mobile-input"
                placeholder="Ciudad, País"
              />
            </div>
            <div>
              <label htmlFor="tema" className="block text-light mb-2 font-medium">
                Tipo de lectura *
              </label>
              <select
                id="tema"
                name="tema"
                value={formData.tema}
                onChange={handleInputChange}
                required
                className="mobile-select"
              >
                <option value="">Selecciona el tipo de lectura</option>
                {TEMAS_ASTRO.map(tema => (
                  <option key={tema} value={tema}>{tema}</option>
                ))}
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (idBruja) {
      case 'calypso': return 'Consultar a Calypso';
      case 'orula': return 'Descifrar con Orula';
      case 'aisha': return 'Armonizar con Aisha';
      case 'sirona': return 'Explorar con Sirona';
      default: return 'Consultar';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mobile-form-container overflow-hidden px-4">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto">
        {renderCampos()}

        {/* Mostrar cartas seleccionadas para Calypso */}
        {idBruja === 'calypso' && cartasSeleccionadas.length > 0 && (
          <div className="mt-6 p-4 bg-dark/30 border border-secondary/30 rounded-lg overflow-x-auto">
            <h3 className="text-light mb-2">Tus cartas del tarot:</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              {cartasSeleccionadas.map((carta, index) => (
                <div
                  key={index}
                  className="p-3 bg-dark/50 border border-secondary/50 rounded text-light text-center"
                >
                  {carta}
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading || respuesta}
          whileHover={{ scale: respuesta ? 1 : 1.02 }}
          whileTap={{ scale: respuesta ? 1 : 0.98 }}
          className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-secondary to-accent 
            text-light font-semibold transition-all duration-300
            ${(isLoading || respuesta) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-secondary/20'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consultando...
            </span>
          ) : respuesta ? (
            'Consulta Completada'
          ) : (
            getButtonText()
          )}
        </motion.button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200"
        >
          {error}
        </motion.div>
      )}

      {respuesta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 md:p-6 bg-dark/50 border border-secondary/30 rounded-lg shadow-lg shadow-secondary/10 w-full max-w-none mobile-response-container"
        >
          <h3 className="text-xl font-semibold text-secondary mb-4 text-center">
            Respuesta de {bruja.nombre}
          </h3>
          <div className="bg-primary/20 rounded-lg p-4 md:p-6 mb-6 overflow-hidden">
            <div className="whitespace-pre-wrap font-sans text-light/90 leading-relaxed text-sm md:text-base mobile-response-text">
              {respuesta}
            </div>
          </div>

          {/* Botones de compartir */}
          <div className="mt-8 border-t border-secondary/30 pt-6">
            <p className="text-light/80 mb-4 text-center font-title text-sm">
              Comparte tu lectura mística
            </p>
            
            {/* Botón de compartir nativo para móviles */}
            <div className="md:hidden flex justify-center">
              <motion.button
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: `Lectura mística con ${bruja.nombre} - Cuatro Brujas`,
                      text: `✨ Mi lectura mística con ${bruja.nombre} en Cuatro Brujas:\n\n${respuesta}`,
                      url: window.location.href
                    });
                  } catch (error) {
                    console.log('Error compartiendo:', error);
                  }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(162, 89, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 border border-secondary/30 rounded-full 
                          text-light font-light hover:border-secondary transition-all duration-300
                          backdrop-blur-sm bg-dark/30 text-sm w-40"
              >
                <i className="ri-share-line text-lg"></i>
                Compartir
              </motion.button>
            </div>

            {/* Botones de compartir para desktop */}
            <div className="hidden md:flex flex-wrap gap-4 justify-center">
              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/?text=${encodeURIComponent(`✨ Mi lectura mística con ${bruja.nombre} en Cuatro Brujas:\n\n${respuesta}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(162, 89, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 border border-secondary/30 rounded-full 
                          text-light font-light hover:border-secondary transition-all duration-300
                          backdrop-blur-sm bg-dark/30 text-sm w-40 justify-center"
              >
                <i className="ri-whatsapp-line text-lg"></i>
                WhatsApp
              </motion.a>

              {/* Facebook */}
              <motion.a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(162, 89, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 border border-secondary/30 rounded-full 
                          text-light font-light hover:border-secondary transition-all duration-300
                          backdrop-blur-sm bg-dark/30 text-sm w-40 justify-center"
              >
                <i className="ri-facebook-circle-line text-lg"></i>
                Facebook
              </motion.a>

              {/* Twitter/X */}
              <motion.a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`✨ Mi lectura mística con ${bruja.nombre} en @CuatroBrujas\n\n${respuesta.substring(0, 200)}...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(162, 89, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 border border-secondary/30 rounded-full 
                          text-light font-light hover:border-secondary transition-all duration-300
                          backdrop-blur-sm bg-dark/30 text-sm w-40 justify-center"
              >
                <i className="ri-twitter-x-line text-lg"></i>
                Twitter
              </motion.a>

              {/* Copiar texto */}
              <motion.button
                onClick={() => {
                  navigator.clipboard.writeText(`✨ Mi lectura mística con ${bruja.nombre} en Cuatro Brujas:\n\n${respuesta}`);
                  alert('Texto copiado al portapapeles!');
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(162, 89, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 border border-secondary/30 rounded-full 
                          text-light font-light hover:border-secondary transition-all duration-300
                          backdrop-blur-sm bg-dark/30 text-sm w-40 justify-center"
              >
                <i className="ri-file-copy-line text-lg"></i>
                Copiar
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FormularioBruja; 