import { Outlet } from "react-router-dom";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      <ScrollToTop />
      <Header />
      <main className="relative overflow-x-hidden w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 