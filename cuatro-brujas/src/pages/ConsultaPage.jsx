import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormularioBruja from '../components/FormularioBruja';
import BackgroundParticles from '../components/BackgroundParticles';

const ConsultaPage = () => {
  const { idBruja } = useParams();

  return (
    <div className="min-h-screen pt-20 relative">
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 relative z-10"
      >
        <FormularioBruja idBruja={idBruja} />
      </motion.div>
    </div>
  );
};

export default ConsultaPage; 