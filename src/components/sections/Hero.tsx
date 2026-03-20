import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { assetPaths, withBaseAsset } from '../../config/assets';
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
  onViewBiography: () => void;
}

const Hero: React.FC<HeroProps> = ({
  lang,
  onDiscoverProfile,
  onViewProjects,
  onViewBiography,
}) => {
  const [leftSlide, setLeftSlide] = useState(1);
  const [rightSlide, setRightSlide] = useState(0);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const swipeStartRef = useRef<{
    left: { x: number | null; y: number | null };
    right: { x: number | null; y: number | null };
  }>({
    left: { x: null, y: null },
    right: { x: null, y: null },
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const leftTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const rightTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const };

  const v = t[lang];
  const rightHeroSlides = getRightHeroSlides(lang);
  const leftHeroSlides = getLeftHeroSlides(lang);
  const activeLeftSlide = leftHeroSlides[leftSlide];
  const activeRightSlide = rightHeroSlides[rightSlide];
  const skillItems = [...v.skills.stripItems].sort((a, b) =>
    a.localeCompare(b, lang === 'FR' ? 'fr' : 'en', { sensitivity: 'base' })
  );
  const profileImage = withBaseAsset(assetPaths.profilePortrait);
  const linkedInUrl = 'https://www.linkedin.com/in/kafui-charbel-eklu';
  const swipeThreshold = 42;

  const captureSwipeStart =
    (side: 'left' | 'right') => (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      swipeStartRef.current[side] = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

  const handleSwipe =
    (
      side: 'left' | 'right',
      totalSlides: number,
      setSlide: React.Dispatch<React.SetStateAction<number>>
    ) =>
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];
      const swipeStart = swipeStartRef.current[side];

      if (!touch || swipeStart.x === null || swipeStart.y === null) {
        return;
      }

      const deltaX = touch.clientX - swipeStart.x;
      const deltaY = touch.clientY - swipeStart.y;
      swipeStartRef.current[side] = { x: null, y: null };

      if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) {
        return;
      }

      setSlide((current) =>
        deltaX < 0
          ? (current + 1) % totalSlides
          : (current - 1 + totalSlides) % totalSlides
      );
    };

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

            <div className="hero-carousel-shell">
              <div
                className="kp-hero-showcase"
                onMouseEnter={() => setIsHoveringLeft(true)}
                onMouseLeave={() => setIsHoveringLeft(false)}
                onTouchStart={captureSwipeStart('left')}
                onTouchEnd={handleSwipe('left', leftHeroSlides.length, setLeftSlide)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`left-${activeLeftSlide.id}`}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, x: 18, y: 8, scale: 0.988, filter: 'blur(6px)' }
                    }
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, x: -18, y: -8, scale: 0.992, filter: 'blur(6px)' }
                    }
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
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                            />
                          </button>
                          <button
                            type="button"
                            className="kp-hero-portrait-meta kp-hero-portrait-meta-btn"
                            onClick={onViewBiography}
                            aria-label={
                              lang === 'FR'
                                ? 'Ouvrir la biographie de Kafui Charbel Eklu'
                                : 'Open Kafui Charbel Eklu biography'
                            }
                          >
                            <span className="kp-hero-portrait-name">Kafui Charbel Eklu</span>
                            <span className="kp-hero-portrait-role">{activeLeftSlide.role}</span>
                          </button>
                        </article>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div
                className="carousel-dots hero-carousel-dots"
                aria-label={lang === 'FR' ? 'Navigation du slide principal' : 'Primary slide navigation'}
              >
                {leftHeroSlides.map((slide, index) => (
                  <button
                    key={`left-dot-${slide.id}`}
                    type="button"
                    className={`carousel-dot ${leftSlide === index ? 'active' : ''}`}
                    onClick={() => setLeftSlide(index)}
                    aria-label={
                      lang === 'FR'
                        ? `Afficher le slide ${index + 1}`
                        : `Show slide ${index + 1}`
                    }
                    aria-current={leftSlide === index ? 'true' : undefined}
                  />
                ))}
              </div>
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
              onTouchStart={captureSwipeStart('right')}
              onTouchEnd={handleSwipe('right', rightHeroSlides.length, setRightSlide)}
            >
              <div className="hero-carousel-shell hero-carousel-shell-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`right-${activeRightSlide.idx}`}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, x: 14, y: 8, scale: 0.992, filter: 'blur(5px)' }
                    }
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
                        : { opacity: 0, x: -14, y: -6, scale: 0.994, filter: 'blur(5px)' }
                    }
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
                <div
                  className="carousel-dots hero-carousel-dots hero-carousel-dots-right"
                  aria-label={lang === 'FR' ? 'Navigation du slide secondaire' : 'Secondary slide navigation'}
                >
                  {rightHeroSlides.map((slide, index) => (
                    <button
                      key={`right-dot-${slide.idx}`}
                      type="button"
                      className={`carousel-dot ${rightSlide === index ? 'active' : ''}`}
                      onClick={() => setRightSlide(index)}
                      aria-label={
                        lang === 'FR'
                          ? `Afficher le slide secondaire ${index + 1}`
                          : `Show secondary slide ${index + 1}`
                      }
                      aria-current={rightSlide === index ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hr-bot">
              <div className="ib">
                <small>{lang === 'FR' ? 'Certification' : 'Certification'}</small>
                <div className="wazuh-cert-row">
                  <a
                    href="https://wazuh.com/ambassadors/kafui-charbel-eklu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wazuh-cert-btn"
                  >
                    Wazuh Ambassador {'\u2197'}
                  </a>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wazuh-cert-linkedin"
                    aria-label={
                      lang === 'FR'
                        ? 'Voir le profil LinkedIn de Kafui Charbel Eklu'
                        : 'View Kafui Charbel Eklu LinkedIn profile'
                    }
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="ib">
                <small>{lang === 'FR' ? 'Contact' : 'Contact'}</small>
                <p>
                  <a className="hero-contact-link" href="mailto:charbelkafuieklu@gmail.com">
                    charbelkafuieklu@gmail.com
                  </a>
                  <br />
                  <a className="hero-contact-link" href="tel:+22870664225">
                    +228 70664225
                  </a>
                </p>
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
        <div className="skills-track" style={{ animationDuration: '22s' }}>
          {[0, 1].map((groupIndex) => (
            <div
              key={`skills-group-${groupIndex}`}
              className="skills-track-group"
              aria-hidden={groupIndex === 1 ? 'true' : undefined}
            >
              {skillItems.map((item) => (
                <span key={`${groupIndex}-${item}`} className="skills-item">
                  <span className="sk-sep" aria-hidden="true"></span>
                  <span className="sk">{item}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
