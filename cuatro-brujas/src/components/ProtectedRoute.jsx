import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false, requireAccess = false }) => {
  const { currentUser, isAdmin } = useAuth();

  // Verificar acceso mediante código
  if (requireAccess) {
    const accessValidated = sessionStorage.getItem('accessValidated');
    if (accessValidated !== 'true') {
      return <Navigate to="/viaje-mistico" replace />;
    }
    return children;
  }

  // Verificar admin (lógica existente)
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!requireAdmin && !currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;