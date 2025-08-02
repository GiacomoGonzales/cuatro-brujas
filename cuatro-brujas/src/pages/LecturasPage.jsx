import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrujasHomeCoverflow from '../components/BrujasHomeCoverflow';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 relative overflow-hidden">
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        
        {/* Título */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-title text-golden mb-4 drop-shadow-lg">
            Elige Tu Bruja Guía
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
            Desliza o usa las flechas para descubrir tu guía espiritual perfecta
          </p>
        </div>

        {/* Carrusel Coverflow 3D */}
        <BrujasHomeCoverflow />
      </div>
    </div>
  );
};

export default LecturasPage;