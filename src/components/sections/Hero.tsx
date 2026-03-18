import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { Language, t } from '../../translations';

type RightHeroSlide = {
  idx: string;
  pill: string;
  quote: string;
};

type LeftHeroSlide =
  | {
      id: 'statement';
      type: 'statement';
      label: string;
      body: string;
    }
  | {
      id: 'profile';
      type: 'profile';
      role: string;
    };

const getRightHeroSlides = (lang: Language): RightHeroSlide[] => [
  {
    idx: lang === 'FR' ? '\u2014 01 / Profil' : '\u2014 01 / Profile',
    pill:
      lang === 'FR'
        ? 'Administrateur Digital Workplace & Infrastructure'
        : 'Digital Workplace & Infrastructure Administrator',
    quote:
      lang === 'FR'
        ? '"Les infrastructures robustes ne se voient pas \u2014 elles se ressentent."'
        : '"Robust infrastructures are not seen \u2014 they are felt."',
  },
  {
    idx: lang === 'FR' ? '\u2014 02 / S\u00e9curit\u00e9' : '\u2014 02 / Security',
    pill: 'Wazuh Security Ambassador',
    quote:
      lang === 'FR'
        ? "\"Anticiper les menaces avant qu'elles n'atteignent le c\u0153ur du syst\u00e8me.\""
        : '"Anticipate threats before they reach the core of the system."',
  },
  {
    idx: lang === 'FR' ? '\u2014 03 / Vision' : '\u2014 03 / Vision',
    pill:
      lang === 'FR' ? 'Architecte R\u00e9seaux & Syst\u00e8mes' : 'Network & Systems Architect',
    quote:
      lang === 'FR'
        ? '"Connecter les environnements complexes avec fiabilit\u00e9 et performance."'
        : '"Connecting complex environments with reliability and performance."',
  },
];

const getLeftHeroSlides = (lang: Language): LeftHeroSlide[] => [
  {
    id: 'statement',
    type: 'statement',
    label: lang === 'FR' ? 'Vision infrastructure' : 'Infrastructure focus',
    body:
      lang === 'FR'
        ? "Ing\u00e9nieur r\u00e9seaux & syst\u00e8mes bas\u00e9 \u00e0 Lom\u00e9 \u2014 je con\u00e7ois, d\u00e9ploie et s\u00e9curise les infrastructures IT avec une approche rigoureuse, lisible et orient\u00e9e r\u00e9sultat. Master II mention bien \u00b7 Wazuh Security Ambassador."
        : 'Network & systems engineer based in Lome \u2014 I design, deploy, and secure IT infrastructures with a rigorous, readable, and results-driven approach. Master II with honors \u00b7 Wazuh Security Ambassador.',
  },
  {
    id: 'profile',
    type: 'profile',
    role:
      lang === 'FR'
        ? 'Administrateur Digital Workplace & Infrastructure'
        : 'Digital Workplace & Infrastructure Administrator',
  },
];

const renderStatementTitle = (lang: Language) => {
  if (lang === 'FR') {
    return (
      <>
        {'B\u00e2tir des'}
        <br />
        {'infra'}
        <span className="it">{'struc'}</span>
        {'tures'}
        <br />
        <span className="out">{'robustes'}</span>
        {' &'}
        <br />
        <span className="it">{'s\u00e9curis\u00e9es.'}</span>
      </>
    );
  }

  return (
    <>
      {'Building'}
      <br />
      {'ro'}
      <span className="it">{'bust'}</span>
      {' &'}
      <br />
      <span className="it">{'secure'}</span>
      <br />
      <span className="out">{'infrastructures.'}</span>
    </>
  );
};

interface HeroProps {
  lang: Language;
  onDiscoverProfile: () => void;
  onViewProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onDiscoverProfile, onViewProjects }) => {
  const [leftSlide, setLeftSlide] = useState(1);
  const [rightSlide, setRightSlide] = useState(0);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const leftTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.72 };
  const rightTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.46 };

  const v = t[lang];
  const rightHeroSlides = getRightHeroSlides(lang);
  const leftHeroSlides = getLeftHeroSlides(lang);
  const activeLeftSlide = leftHeroSlides[leftSlide];
  const activeRightSlide = rightHeroSlides[rightSlide];
  const skillItems = [...v.skills.stripItems].sort((a, b) =>
    a.localeCompare(b, lang === 'FR' ? 'fr' : 'en', { sensitivity: 'base' })
  );
  const marqueeItems = [...skillItems, ...skillItems];
  const profileImage = `${import.meta.env.BASE_URL}_KSP4314.jpg`;

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let intervalTimer: ReturnType<typeof setInterval> | undefined;

    if (!isHoveringLeft && !prefersReducedMotion && leftHeroSlides.length > 1) {
      startTimer = setTimeout(() => {
        intervalTimer = setInterval(() => {
          setLeftSlide((prev) => (prev + 1) % leftHeroSlides.length);
        }, 6200);
      }, 450);
    }

    return () => {
      if (startTimer) {
        clearTimeout(startTimer);
      }
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, [isHoveringLeft, leftHeroSlides.length, prefersReducedMotion]);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let intervalTimer: ReturnType<typeof setInterval> | undefined;

    if (!isHoveringRight && !prefersReducedMotion && rightHeroSlides.length > 1) {
      startTimer = setTimeout(() => {
        intervalTimer = setInterval(() => {
          setRightSlide((prev) => (prev + 1) % rightHeroSlides.length);
        }, 4300);
      }, 1550);
    }

    return () => {
      if (startTimer) {
        clearTimeout(startTimer);
      }
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, [isHoveringRight, prefersReducedMotion, rightHeroSlides.length]);

  useEffect(() => {
    if (!isPortraitOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPortraitOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPortraitOpen]);

  return (
    <>
      <section id="hero" className="kp-hero">
        <div className="kp-hero-top">
          <div className="kp-hero-index">{`Kafui Charbel Eklu \u00b7 2026`}</div>

          <div className="kp-hero-main">
            <div className="kp-hero-eyebrow">{v.hero.eyebrow}</div>

            <div
              className="kp-hero-showcase"
              onMouseEnter={() => setIsHoveringLeft(true)}
              onMouseLeave={() => setIsHoveringLeft(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activeLeftSlide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={leftTransition}
                  className="kp-hero-showcase-panel"
                >
                  {activeLeftSlide.type === 'statement' ? (
                    <div className="kp-hero-statement-card">
                      <div className="kp-hero-slide-label">{activeLeftSlide.label}</div>
                      <h1 className="kp-hero-h1">{renderStatementTitle(lang)}</h1>
                      <p className="kp-hero-body">{activeLeftSlide.body}</p>
                    </div>
                  ) : (
                    <div className="kp-hero-card-frame">
                      <article className="kp-hero-portrait-card">
                        <button
                          type="button"
                          className="kp-hero-portrait-media kp-hero-portrait-media-btn"
                          onClick={() => setIsPortraitOpen(true)}
                          aria-label={
                            lang === 'FR'
                              ? 'Afficher la photo en plein ecran'
                              : 'Open portrait in full screen'
                          }
                        >
                          <img
                            src={profileImage}
                            alt={
                              lang === 'FR'
                                ? 'Portrait de Kafui Charbel Eklu'
                                : 'Portrait of Kafui Charbel Eklu'
                            }
                            className="kp-hero-portrait-image"
                          />
                        </button>
                        <div className="kp-hero-portrait-meta">
                          <span className="kp-hero-portrait-name">Kafui Charbel Eklu</span>
                          <span className="kp-hero-portrait-role">{activeLeftSlide.role}</span>
                        </div>
                      </article>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="kp-hero-btns">
              <button type="button" className="kp-btn-dark" onClick={onDiscoverProfile}>
                {v.hero.btnPrimary}
              </button>
              <button type="button" className="kp-btn-line" onClick={onViewProjects}>
                {v.hero.btnSecondary} {'\u2192'}
              </button>
            </div>
          </div>

          <div className="hero-r">
            <div
              className="hr-top overflow-hidden"
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseLeave={() => setIsHoveringRight(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activeRightSlide.idx}`}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={rightTransition}
                  className="hero-slide-inner"
                >
                  <p className="hr-idx">{activeRightSlide.idx}</p>
                  <div>
                    <div className="hr-pill">{activeRightSlide.pill}</div>
                    <p className="hr-quote">{activeRightSlide.quote}</p>
                  </div>
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

      <AnimatePresence>
        {isPortraitOpen && (
          <motion.div
            className="kp-portrait-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={() => setIsPortraitOpen(false)}
          >
            <button
              type="button"
              className="kp-portrait-lightbox-close"
              onClick={() => setIsPortraitOpen(false)}
              aria-label={lang === 'FR' ? 'Fermer la photo' : 'Close portrait'}
            >
              ×
            </button>
            <motion.div
              className="kp-portrait-lightbox-dialog"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={profileImage}
                alt={
                  lang === 'FR'
                    ? 'Portrait de Kafui Charbel Eklu en plein ecran'
                    : 'Full-screen portrait of Kafui Charbel Eklu'
                }
                className="kp-portrait-lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="skills-strip">
        <div className="skills-track" style={{ animationDuration: '26s' }}>
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span className="sk">{item}</span>
              {index < marqueeItems.length - 1 && <div className="sk-sep"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
