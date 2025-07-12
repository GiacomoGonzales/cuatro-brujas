import { Outlet } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-[#140018] text-white overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 