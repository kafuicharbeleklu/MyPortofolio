import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const heroSlides = [
  {
    idx: "— 01 / Profil",
    pill: "Administrateur Digital Workplace & Infrastructure",
    quote: "\"Les infrastructures robustes ne se voient pas — elles se ressentent.\""
  },
  {
    idx: "— 02 / Sécurité",
    pill: "Wazuh Security Ambassador",
    quote: "\"Anticiper les menaces avant qu'elles n'atteignent le cœur du système.\""
  },
  {
    idx: "— 03 / Vision",
    pill: "Architecte Réseaux & Systèmes",
    quote: "\"Connecter les environnements complexes avec fiabilité et performance.\""
  }
];

interface HeroProps {
  onDiscoverProfile: () => void;
  onViewProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDiscoverProfile, onViewProjects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const slideTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.5 };

  useEffect(() => {
    let timer: any;
    if (!isHoveringHero && !prefersReducedMotion) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isHoveringHero, prefersReducedMotion]);

  return (
    <>
      <section id="hero" className="kp-hero">
        <div className="kp-hero-top">
          <div className="kp-hero-index">Kafui Charbel Eklu — 2026</div>
          <div className="kp-hero-main">
            <div>
              <div className="kp-hero-eyebrow">Administrateur Réseaux & Systèmes</div>
              <h1 className="kp-hero-h1">
                Bâtir des<br />
                infra<span className="it">struc</span>tures<br />
                <span className="out">robustes</span> &<br />
                <span className="it">sécurisées.</span>
              </h1>
              <p className="kp-hero-body">
                Ingénieur réseaux & systèmes basé à Lomé — je conçois, déploie et sécurise les infrastructures IT avec la rigueur d'un architecte. Master II Mention Bien · Wazuh Security Ambassador.
              </p>
              <div className="kp-hero-btns">
                <button className="kp-btn-dark" onClick={onDiscoverProfile}>Découvrir mon profil</button>
                <button className="kp-btn-line" onClick={onViewProjects}>Voir mes projets →</button>
              </div>
            </div>
          </div>
          <div className="hero-r">
            <div 
              className="hr-top overflow-hidden"
              onMouseEnter={() => setIsHoveringHero(true)}
              onMouseLeave={() => setIsHoveringHero(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={slideTransition}
                  className="hero-slide-inner"
                >
                  <p className="hr-idx">{heroSlides[currentSlide].idx}</p>
                  <div>
                    <div className="hr-pill">{heroSlides[currentSlide].pill}</div>
                    <p className="hr-quote">{heroSlides[currentSlide].quote}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hr-bot">
              <div className="ib">
                <small>Certification</small>
                <a href="https://wazuh.com/ambassador/" target="_blank" rel="noopener noreferrer" className="wazuh-badge">
                  Wazuh Security<br />Ambassador
                </a>
              </div>
              <div className="ib"><small>Contact</small><p>charbelkafuieklu<br />@gmail.com</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS STRIP */}
      <div className="skills-strip">
        <div className="skills-track">
          <span className="sk">Wazuh / SIEM XDR</span><div className="sk-sep"></div>
          <span className="sk">Windows Server</span><div className="sk-sep"></div>
          <span className="sk">VSAT / Réseaux</span><div className="sk-sep"></div>
          <span className="sk">Power BI / DAX</span><div className="sk-sep"></div>
          <span className="sk">Azure / M365</span><div className="sk-sep"></div>
          <span className="sk">Bash · PowerShell · Python</span><div className="sk-sep"></div>
          <span className="sk">SCCM / MECM</span><div className="sk-sep"></div>
          <span className="sk">EVE-NG / GNS3</span><div className="sk-sep"></div>
          <span className="sk">TCP/IP · Routage · Switching</span><div className="sk-sep"></div>
          <span className="sk">Wazuh / SIEM XDR</span><div className="sk-sep"></div>
          <span className="sk">Windows Server</span><div className="sk-sep"></div>
          <span className="sk">VSAT / Réseaux</span><div className="sk-sep"></div>
          <span className="sk">Power BI / DAX</span><div className="sk-sep"></div>
          <span className="sk">Azure / M365</span><div className="sk-sep"></div>
          <span className="sk">Bash · PowerShell · Python</span><div className="sk-sep"></div>
          <span className="sk">SCCM / MECM</span><div className="sk-sep"></div>
          <span className="sk">EVE-NG / GNS3</span><div className="sk-sep"></div>
          <span className="sk">TCP/IP · Routage · Switching</span>
        </div>
      </div>
    </>
  );
};

export default Hero;
