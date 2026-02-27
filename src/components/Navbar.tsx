import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, Close, Translate } from '@carbon/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.expertise'), href: '/#expertise' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-carbon-layer-1/95 backdrop-blur-md border-b border-carbon-border-subtle py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-carbon-text-primary">
            EKLU Kafui Charbel
          </span>
          <span className="text-xs font-medium text-carbon-text-secondary">
            {t('nav.role')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="px-4 py-2 text-sm font-medium text-carbon-text-secondary hover:bg-carbon-layer-2 hover:text-carbon-text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleLanguage}
            className="ml-2 p-2 text-carbon-text-secondary hover:bg-carbon-layer-2 hover:text-carbon-text-primary transition-colors flex items-center gap-2 border border-carbon-border-subtle rounded-sm"
            title="Switch Language"
          >
            <Translate className="w-4 h-4" />
            <span className="text-xs font-bold uppercase flex gap-1">
              <span className={language === 'en' ? 'text-carbon-blue' : 'opacity-50'}>EN</span>
              <span className="opacity-30">|</span>
              <span className={language === 'fr' ? 'text-carbon-blue' : 'opacity-50'}>FR</span>
            </span>
          </button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="ml-4 px-6 py-2.5 bg-carbon-blue text-white text-sm font-medium hover:bg-carbon-blue-hover transition-colors">
            {t('nav.resume')}
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="p-2 text-carbon-text-secondary hover:bg-carbon-layer-2 flex items-center gap-2 border border-carbon-border-subtle rounded-sm"
          >
            <Translate className="w-4 h-4" />
            <span className="text-xs font-bold uppercase flex gap-1">
              <span className={language === 'en' ? 'text-carbon-blue' : 'opacity-50'}>EN</span>
              <span className="opacity-30">|</span>
              <span className={language === 'fr' ? 'text-carbon-blue' : 'opacity-50'}>FR</span>
            </span>
          </button>
          <button className="p-2 text-carbon-text-secondary hover:bg-carbon-layer-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-carbon-layer-1 py-4 px-6 flex flex-col gap-2 border-b border-carbon-border-subtle shadow-lg"
        >
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-sm font-medium text-carbon-text-secondary py-3 px-4 hover:bg-carbon-layer-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mt-4 text-center px-6 py-3 bg-carbon-blue text-white text-sm font-medium hover:bg-carbon-blue-hover">
            {t('nav.resume')}
          </a>
        </motion.div>
      )}
    </header>
  );
}
