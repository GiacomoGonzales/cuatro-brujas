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
        element: <ConsultaPage />,
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
        path: "zona-reparto",
        element: <div className="min-h-screen pt-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold magical-text mb-8">Zona de Reparto</h1>
            <p className="text-light/80">Página en construcción...</p>
          </div>
        </div>,
      },
      {
        path: "viaje-mistico",
        element: <ViajeMísticoPage />,
      },
      {
        path: "lecturas",
        element: <LecturasPage />,
      },
    ],
  },
]);

export default router; 