import { useState } from 'react';
import { motion } from 'framer-motion';
import { brujas } from '../data/brujas';
import { consultarBruja } from '../services/openaiService';
import { markReadingCompleted } from '../services/sessionService';

const ConsultaBruja = ({ idBruja }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState('');
  const [datosConsulta, setDatosConsulta] = useState({
    nombre: '',
    fechaNacimiento: '',
    pregunta: ''
  });

  // Obtener los datos de la bruja
  const bruja = brujas[idBruja];

  if (!bruja) {
    return <div className="text-red-500">Bruja no encontrada</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosConsulta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setRespuesta('');

    try {
      const respuestaIA = await consultarBruja(bruja, datosConsulta);
      setRespuesta(respuestaIA);
      
      // Marcar la lectura como completada solo cuando se obtiene la respuesta exitosamente
      markReadingCompleted(idBruja, 'consulta');
      console.log('✅ Lectura completada exitosamente con', bruja.nombre);
    } catch (err) {
      setError(err.message || 'Error al realizar la consulta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-light mb-2 font-title">
          Consulta con {bruja.nombre}
        </h2>
        <p className="text-secondary text-xl mb-4">
          {bruja.servicio}
        </p>
        <p className="text-light/70">
          {bruja.descripcion}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-light mb-2">
            Tu nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={datosConsulta.nombre}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-lg bg-dark/50 border border-secondary/30 text-light focus:border-secondary focus:outline-none"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className="block text-light mb-2">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={datosConsulta.fechaNacimiento}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-lg bg-dark/50 border border-secondary/30 text-light focus:border-secondary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="pregunta" className="block text-light mb-2">
            Tu pregunta
          </label>
          <textarea
            id="pregunta"
            name="pregunta"
            value={datosConsulta.pregunta}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-dark/50 border border-secondary/30 text-light focus:border-secondary focus:outline-none"
            placeholder="¿Qué deseas consultar?"
          />
        </div>

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
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consultando...
            </span>
          ) : respuesta ? (
            '✅ Consulta Completada'
          ) : (
            'Realizar Consulta'
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
          className="mt-8 p-4 md:p-6 bg-dark/50 border border-secondary/30 rounded-lg w-full max-w-none mobile-response-container"
        >
          <h3 className="text-xl font-semibold text-secondary mb-4 text-center">
            Respuesta de {bruja.nombre}
          </h3>
          <div className="bg-primary/20 rounded-lg p-4 md:p-6 overflow-hidden">
            <div className="whitespace-pre-wrap font-sans text-light/90 leading-relaxed text-sm md:text-base mobile-response-text">
              {respuesta}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ConsultaBruja; 