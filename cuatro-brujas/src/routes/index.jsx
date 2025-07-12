import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import TarotPage from "../pages/TarotPage";
import CartaAstralPage from "../pages/CartaAstralPage";
import NumerologiaPage from "../pages/NumerologiaPage";
import HoroscopoPage from "../pages/HoroscopoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "tarot",
        element: <TarotPage />,
      },
      {
        path: "carta-astral",
        element: <CartaAstralPage />,
      },
      {
        path: "numerologia",
        element: <NumerologiaPage />,
      },
      {
        path: "horoscopo",
        element: <HoroscopoPage />,
      },
    ],
  },
]);

export default router; 