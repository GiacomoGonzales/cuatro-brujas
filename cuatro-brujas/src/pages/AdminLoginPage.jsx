import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container flex items-center justify-center px-4">
      {/* Formulario de login */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="admin-card">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              🔐
            </motion.div>
            <h1 className="admin-title" style={{fontSize: '2rem', textAlign: 'center'}}>
              Panel Administrativo
            </h1>
            <p className="admin-subtitle" style={{textAlign: 'center'}}>
              Acceso solo para administradores
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div className="admin-form-group">
              <label className="admin-label">
                Email Administrativo
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@cuatrobrujas.app"
                disabled={loading}
              />
            </div>

            {/* Campo Password */}
            <div className="admin-form-group">
              <label className="admin-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-alert admin-alert-error"
              >
                {error}
              </motion.div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="admin-spinner" style={{width: '1.25rem', height: '1.25rem', marginRight: '0.75rem'}}></div>
                  Verificando...
                </span>
              ) : (
                'Acceder al Panel'
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <p style={{color: '#a0aec0', fontSize: '0.875rem'}}>
              Solo administradores autorizados
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;