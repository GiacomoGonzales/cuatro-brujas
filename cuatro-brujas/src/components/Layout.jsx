import { Outlet } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-primary text-light overflow-hidden">
      <BackgroundParticles />
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 