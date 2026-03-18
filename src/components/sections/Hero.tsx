import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import TestimonialCard from '../TestimonialCard';
import { t, Language } from '../../translations';

const getHeroSlides = (lang: Language) => [
  {
    idx: lang === 'FR' ? '01 / Signature' : '01 / Signature',
    cardQuote:
      lang === 'FR'
        ? 'Bâtir des\ninfrastructures\nrobustes &\nsécurisées.'
        : 'Building\nrobust & secure\ninfrastructures.',
    role:
      lang === 'FR'
        ? 'Administrateur Digital Workplace & Infrastructure'
        : 'Digital Workplace & Infrastructure Administrator',
    eyebrow: lang === 'FR' ? 'Vision métier' : 'Core focus',
  },
  {
    idx: lang === 'FR' ? '02 / Sécurité' : '02 / Security',
    cardQuote:
      lang === 'FR'
        ? 'Anticiper les menaces avant qu’elles n’atteignent le cœur du système.'
        : 'Anticipate threats before they reach the core of the system.',
    role: 'Wazuh Security Ambassador',
    eyebrow: lang === 'FR' ? 'Approche sécurité' : 'Security mindset',
  },
  {
    idx: lang === 'FR' ? '03 / Exécution' : '03 / Execution',
    cardQuote:
      lang === 'FR'
        ? 'Concevoir des environnements fiables, lisibles et prêts pour la production.'
        : 'Design reliable, readable environments that are ready for production.',
    role: lang === 'FR' ? 'Architecte réseaux & systèmes' : 'Network & Systems Architect',
    eyebrow: lang === 'FR' ? 'Mode opératoire' : 'Delivery mode',
  },
];

interface HeroProps {
  lang: Language;
  onDiscoverProfile: () => void;
  onViewProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onDiscoverProfile, onViewProjects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const slideTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.5 };

  const v = t[lang];
  const heroSlides = getHeroSlides(lang);
  const skillItems = v.skills.stripItems;
  const profileImage = `${import.meta.env.BASE_URL}_KSP4314.jpg`;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (!isHoveringHero && !prefersReducedMotion) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 4200);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [heroSlides.length, isHoveringHero, prefersReducedMotion]);

  return (
    <>
      <section id="hero" className="kp-hero">
        <div className="kp-hero-top">
          <div className="kp-hero-index">Kafui Charbel Eklu · 2026</div>
          <div className="kp-hero-main">
            <div>
              <div className="kp-hero-eyebrow">{v.hero.eyebrow}</div>
              <h1 className="kp-hero-h1">
                {lang === 'FR' ? (
                  <>
                    Bâtir des
                    <br />
                    infra<span className="it">struc</span>tures
                    <br />
                    <span className="out">robustes</span> &
                    <br />
                    <span className="it">sécurisées.</span>
                  </>
                ) : (
                  <>
                    Building
                    <br />
                    ro<span className="it">bust</span> &
                    <br />
                    <span className="it">secure</span>
                    <br />
                    <span className="out">infrastructures.</span>
                  </>
                )}
              </h1>
              <p className="kp-hero-body">
                {lang === 'FR'
                  ? "Ingénieur réseaux & systèmes basé à Lomé, je conçois, déploie et sécurise des infrastructures IT avec une approche rigoureuse, lisible et orientée résultat. Master II mention bien · Wazuh Security Ambassador."
                  : 'Network & systems engineer based in Lome, I design, deploy, and secure IT infrastructures with a rigorous, readable, and results-driven approach. Master II with honors · Wazuh Security Ambassador.'}
              </p>
              <div className="kp-hero-btns">
                <button type="button" className="kp-btn-dark" onClick={onDiscoverProfile}>
                  {v.hero.btnPrimary}
                </button>
                <button type="button" className="kp-btn-line" onClick={onViewProjects}>
                  {v.hero.btnSecondary} →
                </button>
              </div>
            </div>
          </div>
          <div className="hero-r">
            <div
              className="hr-top overflow-hidden hero-card-stage"
              onMouseEnter={() => setIsHoveringHero(true)}
              onMouseLeave={() => setIsHoveringHero(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
                  transition={slideTransition}
                  className="hero-slide-inner"
                >
                  <p className="hr-idx">— {heroSlides[currentSlide].idx}</p>
                  <TestimonialCard
                    imageSrc={profileImage}
                    imageAlt="Portrait de Kafui Charbel Eklu"
                    quote={heroSlides[currentSlide].cardQuote}
                    author="Kafui Charbel Eklu"
                    role={heroSlides[currentSlide].role}
                    eyebrow={heroSlides[currentSlide].eyebrow}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hr-bot">
              <div className="ib">
                <small>{lang === 'FR' ? 'Certification' : 'Certification'}</small>
                <a
                  href="https://wazuh.com/ambassadors/kafui-charbel-eklu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wazuh-badge"
                >
                  Wazuh Security
                  <br />
                  Ambassador
                </a>
              </div>
              <div className="ib">
                <small>{lang === 'FR' ? 'Contact' : 'Contact'}</small>
                <p>charbelkafuieklu@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="skills-strip">
        <div className="skills-track" style={{ animationDuration: '30s' }}>
          {[...skillItems, ...skillItems, ...skillItems].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span className="sk">{item}</span>
              {index < skillItems.length * 3 - 1 && <div className="sk-sep"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
