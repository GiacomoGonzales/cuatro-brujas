import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createAccessCode, getRecentCodes, formatDate } from '../services/adminService';
import AdminReadingStats from '../components/AdminReadingStats';
import '../styles/admin.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const codesPerPage = 6;
  
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
        setSuccess('¡Código generado exitosamente!');
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
      `Ingresa en https://cuatrobrujas.pe/viaje-mistico para usarlo.`
    );
    
    const cleanNumber = codeData.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  // Funciones de paginación
  const totalPages = Math.ceil(recentCodes.length / codesPerPage);
  const startIndex = (currentPage - 1) * codesPerPage;
  const endIndex = startIndex + codesPerPage;
  const currentCodes = recentCodes.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!isAdmin) {
    return null; // Redirigiendo...
  }

  return (
    <div className="admin-container">
      {/* Header profesional */}
      <div className="admin-header">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="admin-title">
              Panel Administrativo
            </h1>
            <p className="admin-subtitle">
              Bienvenido, {currentUser?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Layout de 2 columnas para escritorio */}
        <div className="admin-two-column-layout grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          
          {/* Columna izquierda - Formulario de generación */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="admin-card"
          >
            <h2 className="admin-card-title">
              📝 Generar Código de Acceso
            </h2>

            <form onSubmit={handleGenerateCode}>
              {/* Nombre */}
              <div className="admin-form-group">
                <label className="admin-label">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="Nombre del cliente"
                  disabled={loading}
                  required
                />
              </div>

              {/* Email */}
              <div className="admin-form-group">
                <label className="admin-label">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="cliente@ejemplo.com"
                  disabled={loading}
                  required
                />
              </div>

              {/* WhatsApp */}
              <div className="admin-form-group">
                <label className="admin-label">
                  WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="admin-input"
                  placeholder="+573001234567"
                  disabled={loading}
                />
              </div>

              {/* Mensajes */}
              {error && (
                <div className="admin-alert admin-alert-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="admin-alert admin-alert-success">
                  {success}
                </div>
              )}

              {/* Botón generar */}
              <button
                type="submit"
                disabled={loading}
                className="admin-btn-primary"
              >
                {loading ? 'Generando...' : 'Generar Código'}
              </button>
            </form>
          </motion.div>

          {/* Columna derecha - Estadísticas de Lecturas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AdminReadingStats />
          </motion.div>

        </div>

        {/* Historial - Tabla completa debajo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="admin-card"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h3 className="admin-card-title mb-0">
              📋 Códigos de Acceso Generados
            </h3>
            <div className="text-sm" style={{color: '#718096'}}>
              {recentCodes.length} códigos totales
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Código</th>
                  <th>Estado</th>
                  <th>Creado</th>
                  <th>WhatsApp</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCodes.map((code) => (
                  <tr key={code.id}>
                    <td>
                      <div className="font-medium" style={{color: '#2d3748'}}>{code.name}</div>
                    </td>
                    <td>
                      <div className="text-sm" style={{color: '#4a5568'}}>{code.email}</div>
                    </td>
                    <td>
                      <code className="admin-badge" style={{
                        fontSize: '0.875rem', 
                        background: '#edf2f7', 
                        color: '#2d3748',
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '0.375rem',
                        fontWeight: '600'
                      }}>
                        {code.code}
                      </code>
                    </td>
                    <td>
                      <span className={`admin-badge ${
                        code.used 
                          ? 'admin-badge-error' 
                          : 'admin-badge-success'
                      }`}>
                        {code.used ? 'Usado' : 'Disponible'}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm" style={{color: '#718096'}}>
                        {formatDate(code.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {code.whatsapp ? (
                          <span className="admin-badge admin-badge-success">
                            📱 {code.whatsapp}
                          </span>
                        ) : (
                          <span style={{color: '#a0aec0'}}>Sin WhatsApp</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSendEmailFromHistory(code)}
                          disabled={loading}
                          className="admin-btn-secondary"
                          title={`Enviar email a ${code.email}`}
                        >
                          {loading ? '⏳' : '✉️'}
                        </button>
                        
                        {code.whatsapp && (
                          <button
                            onClick={() => handleSendWhatsAppFromHistory(code)}
                            className="admin-btn-secondary"
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
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">📄</div>
                <div className="admin-empty-state-text">No hay códigos generados aún</div>
              </div>
            )}
          </div>

          {/* Paginación */}
          {recentCodes.length > 0 && totalPages > 1 && (
            <div className="admin-pagination">
              <div className="admin-pagination-info">
                Mostrando {startIndex + 1}-{Math.min(endIndex, recentCodes.length)} de {recentCodes.length} códigos
              </div>
              
              <div className="admin-pagination-nav">
                {/* Botón anterior */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="admin-pagination-button"
                  title="Página anterior"
                >
                  ‹
                </button>

                {/* Números de página */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  // Mostrar solo páginas cercanas a la actual
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`admin-pagination-button ${
                          currentPage === pageNumber ? 'active' : ''
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} style={{color: '#a0aec0'}}>...</span>;
                  }
                  return null;
                })}

                {/* Botón siguiente */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="admin-pagination-button"
                  title="Página siguiente"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default AdminPage;