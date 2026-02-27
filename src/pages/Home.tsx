import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Philosophy from '../components/Philosophy';
import Contact from '../components/Contact';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-carbon-bg text-carbon-text-primary selection:bg-carbon-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Philosophy />
        <Expertise />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-carbon-text-secondary border-t border-carbon-border-subtle bg-carbon-layer-1">
        <p>Designed & Built by Charbel Kafui Eklu</p>
      </footer>
    </div>
  );
}
