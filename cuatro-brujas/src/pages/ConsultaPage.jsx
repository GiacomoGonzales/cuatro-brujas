import { useParams, useEffect } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormularioBruja from '../components/FormularioBruja';
import BackgroundParticles from '../components/BackgroundParticles';

const ConsultaPage = () => {
  const { idBruja } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20 relative">
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 relative z-10"
      >
        <FormularioBruja idBruja={idBruja} />
      </motion.div>
    </div>
  );
};

export default ConsultaPage; 