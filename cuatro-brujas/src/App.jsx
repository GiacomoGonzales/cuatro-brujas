import BackgroundParticles from './components/BackgroundParticles';
import Header from './sections/Header';
import Hero from './sections/Hero';
import BrujasGrid from './sections/BrujasGrid';
import Footer from './sections/Footer';
import './styles/index.css';

function App() {
  return (
    <div className="relative min-h-screen bg-[#140018] text-white overflow-hidden">
      <BackgroundParticles />
      <main className="relative z-10">
        <Header />
        <Hero />
        <BrujasGrid />
        <Footer />
      </main>
    </div>
  );
}

export default App;
