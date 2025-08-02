import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      {/* Fondo mágico */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10"></div>
        <img 
          src="/backgrounds/hero-bg.png" 
          alt="Fondo mágico" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Formulario de login */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 w-full max-w-md"
      >
        <div className="magical-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              🔮
            </motion.div>
            <h1 className="text-3xl font-title magical-text mb-2">
              Panel Administrativo
            </h1>
            <p className="text-light/70 font-body">
              Acceso solo para administradores
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-light/90 font-body mb-2">
                Email Administrativo
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-primary/50 border border-secondary/30 rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors font-body"
                placeholder="admin@cuatrobrujas.app"
                disabled={loading}
              />
            </div>

            {/* Campo Password */}
            <div>
              <label htmlFor="password" className="block text-light/90 font-body mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-primary/50 border border-secondary/30 rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors font-body"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm font-body"
              >
                {error}
              </motion.div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-accent text-primary px-6 py-3 rounded-lg font-body font-semibold hover:from-secondary/90 hover:to-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔮 Verificando...' : '✨ Acceder al Panel'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-light/50 text-sm font-body">
              Solo administradores autorizados
            </p>
          </div>
        </div>
      </motion.div>

      {/* Estilos personalizados */}
      <style jsx>{`
        .magical-card {
          background: linear-gradient(135deg, rgba(20, 0, 24, 0.9) 0%, rgba(20, 0, 24, 0.7) 100%);
          border: 1px solid rgba(165, 106, 255, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;