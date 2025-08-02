import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrujasCoverflow3D from '../components/BrujasCoverflow3D';

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

  return (
    <BrujasCoverflow3D />
  );
};

export default LecturasPage;