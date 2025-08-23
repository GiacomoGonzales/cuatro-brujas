import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import CartaAstralPage from "../pages/CartaAstralPage";
import NumerologiaPage from "../pages/NumerologiaPage";
import HoroscopoPage from "../pages/HoroscopoPage";
import QuienesSomosPage from "../pages/QuienesSomosPage";
import NuestraCartaPage from "../pages/NuestraCartaPage";
import ComoFuncionaPage from "../pages/ComoFuncionaPage";
import ConsultaPage from "../pages/ConsultaPage";
import ViajeMísticoPage from "../pages/ViajeMísticoPage";
import LecturasPage from "../pages/LecturasPage";
import AdminPage from "../pages/AdminPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import IngresarCodigoPage from "../pages/IngresarCodigoPage";
import LecturaCompletadaPage from "../pages/LecturaCompletadaPage";
import ProtectedRoute from "../components/ProtectedRoute";

// Página 404
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold magical-text mb-4">✨ 404 - Página no encontrada</h1>
        <p className="text-light/80 mb-8">Parece que te has perdido en el reino místico...</p>
        <a href="/" className="magical-btn">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "consulta/:idBruja",
        element: (
          <ProtectedRoute requireAccess={true}>
            <ConsultaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "quienes-somos",
        element: <QuienesSomosPage />,
      },
      {
        path: "nuestra-carta",
        element: <NuestraCartaPage />,
      },
      {
        path: "como-funciona",
        element: <ComoFuncionaPage />,
      },

      {
        path: "viaje-mistico",
        element: <ViajeMísticoPage />,
      },
      {
        path: "lecturas",
        element: <LecturasPage />,
      },
      {
        path: "ingresar-codigo",
        element: <IngresarCodigoPage />,
      },
      {
        path: "lectura-completada",
        element: <LecturaCompletadaPage />,
      },
      {
        path: "admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router; 