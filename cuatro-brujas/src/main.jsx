import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './styles/index.css'

// Importar funciones de utilidad para desarrollo
import './utils/accessCodes.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
