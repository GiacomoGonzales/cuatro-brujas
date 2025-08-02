import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createAccessCode, getRecentCodes, formatDate } from '../services/adminService';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recentCodes, setRecentCodes] = useState([]);
  
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Cargar códigos recientes
  useEffect(() => {
    if (isAdmin) {
      loadRecentCodes();
    }
  }, [isAdmin]);

  const loadRecentCodes = async () => {
    try {
      const codes = await getRecentCodes();
      setRecentCodes(codes);
    } catch (error) {
      console.error('Error loading recent codes:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Nombre y email son obligatorios');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const result = await createAccessCode(formData);
      
      if (result.success) {
        setSuccess(`¡Código ${result.code} generado exitosamente!`);
        setFormData({ name: '', email: '', whatsapp: '' });
        loadRecentCodes(); // Recargar la tabla
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Error al generar código');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Función para enviar email con SendGrid
  const sendEmail = async (email, name, code) => {
    try {
      setLoading(true);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, name, code }),
      });

      if (response.ok) {
        setSuccess("✅ Correo enviado correctamente");
        setError('');
      } else {
        const errorData = await response.json();
        setError(`❌ Error enviando el correo: ${errorData.error || 'Error desconocido'}`);
        setSuccess('');
      }
    } catch (error) {
      console.error("Error enviando el correo:", error);
      setError("❌ Hubo un problema enviando el correo");
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };



  // Función para enviar email desde historial usando SendGrid
  const handleSendEmailFromHistory = (codeData) => {
    sendEmail(codeData.email, codeData.name, codeData.code);
  };

  // Función para enviar WhatsApp desde historial
  const handleSendWhatsAppFromHistory = (codeData) => {
    if (!codeData.whatsapp) {
      setError('Este registro no tiene número de WhatsApp');
      return;
    }
    
    const message = encodeURIComponent(
      `Hola ${codeData.name}, tu código de acceso a Cuatro Brujas es: ${codeData.code}. ` +
      `Ingresa en cuatrobrujas.app/viaje-mistico para usarlo.`
    );
    
    const cleanNumber = codeData.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  if (!isAdmin) {
    return null; // Redirigiendo...
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Fondo mágico */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10"></div>
        <img 
          src="/backgrounds/hero-bg.png" 
          alt="Fondo mágico" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-20 pt-24 pb-16 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-title magical-text">
              🔮 Panel Administrativo
            </h1>
            <p className="text-light/70 font-body mt-2">
              Bienvenido, {currentUser?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors font-body self-start sm:self-auto"
          >
            🚪 Salir
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Formulario de generación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="magical-card p-6"
          >
            <h2 className="text-2xl font-title magical-text mb-6">
              ✨ Generar Código de Acceso
            </h2>

            <form onSubmit={handleGenerateCode} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label className="block text-light/90 font-body mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary/50 border border-secondary/30 rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors font-body"
                    placeholder="Nombre del cliente"
                    disabled={loading}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-light/90 font-body mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary/50 border border-secondary/30 rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors font-body"
                    placeholder="cliente@ejemplo.com"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-light/90 font-body mb-2">
                  WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary/50 border border-secondary/30 rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors font-body"
                  placeholder="+573001234567"
                  disabled={loading}
                />
              </div>

              {/* Mensajes */}
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm font-body">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-sm font-body">
                  {success}
                </div>
              )}

              {/* Botón generar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-secondary to-accent text-primary px-6 py-3 rounded-lg font-body font-semibold hover:from-secondary/90 hover:to-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🔮 Generando...' : '✨ Generar Código'}
              </button>
            </form>
          </motion.div>



          {/* Historial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="magical-card p-6"
          >
            <h3 className="text-xl font-title magical-text mb-4">
              📊 Últimos Códigos Creados
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary/20">
                    <th className="text-left text-light/90 font-body py-2">Nombre</th>
                    <th className="text-left text-light/90 font-body py-2">Email</th>
                    <th className="text-left text-light/90 font-body py-2">Código</th>
                    <th className="text-left text-light/90 font-body py-2">Estado</th>
                    <th className="text-left text-light/90 font-body py-2">Fecha</th>
                    <th className="text-left text-light/90 font-body py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCodes.map((code) => (
                    <tr key={code.id} className="border-b border-secondary/10">
                      <td className="text-light font-body py-3">{code.name}</td>
                      <td className="text-light/70 font-body py-3">{code.email}</td>
                      <td className="font-mono text-secondary py-3">{code.code}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          code.used 
                            ? 'bg-red-900/30 text-red-300' 
                            : 'bg-green-900/30 text-green-300'
                        }`}>
                          {code.used ? 'Usado' : 'Disponible'}
                        </span>
                      </td>
                      <td className="text-light/70 font-body py-3 text-sm">
                        {formatDate(code.createdAt)}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {/* Botón Email con SendGrid */}
                          <button
                            onClick={() => handleSendEmailFromHistory(code)}
                            disabled={loading}
                            className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title={`Enviar email con SendGrid a ${code.email}`}
                          >
                            {loading ? '⏳' : '✉️'}
                          </button>
                          
                          {/* Botón WhatsApp - solo si tiene número */}
                          {code.whatsapp && (
                            <button
                              onClick={() => handleSendWhatsAppFromHistory(code)}
                              className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 p-2 rounded-lg transition-colors text-sm"
                              title={`Enviar WhatsApp a ${code.whatsapp}`}
                            >
                              📱
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {recentCodes.length === 0 && (
                <div className="text-center text-light/50 py-8 font-body">
                  No hay códigos generados aún
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Estilos */}
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

export default AdminPage;