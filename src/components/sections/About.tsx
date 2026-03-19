import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { t, Language } from '../../translations';

interface AboutProps {
  lang: Language;
  onReadMore: () => void;
}

const About: React.FC<AboutProps> = ({ lang, onReadMore }) => {
  const [statIndex, setStatIndex] = useState(0);
  const [isHoveringStats, setIsHoveringStats] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const statTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3 };

  const v = t[lang];

  useEffect(() => {
    let statTimer: ReturnType<typeof setInterval> | undefined;
    if (!isHoveringStats && !prefersReducedMotion) {
      statTimer = setInterval(() => {
        setStatIndex((prev) => (prev + 1) % 4);
      }, 3000);
    }

    return () => {
      if (statTimer) {
        clearInterval(statTimer);
      }
    };
  }, [isHoveringStats, prefersReducedMotion]);

  return (
    <section className="sec" id="about">
      <div className="sec-hdr">
        <span className="sec-num">{v.about.num}</span>
        <h2 className="sec-ttl">{v.about.title}.</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          {lang === 'FR' ? (
            <>
              <p>
                Ingénieur des travaux informatiques formé à l&apos;IAI-Togo, j&apos;ai ensuite obtenu mon
                <strong> Master II Réseaux & Systèmes d&apos;Information </strong>
                au Collège de Paris Supérieur de Lomé avec la
                <strong> mention bien</strong>.
              </p>
              <p>
                Chez <strong>Neemba Togo</strong>, j&apos;interviens sur les infrastructures, le support avancé,
                les sujets télécoms, ainsi que sur l&apos;amélioration des environnements IT avec une approche
                orientée fiabilité, clarté et efficacité.
              </p>
              <p>
                En tant que <strong>Wazuh Security Ambassador</strong>, je conçois et déploie aussi des
                architectures de supervision et de sécurité capables d&apos;apporter une visibilité concrète sur
                les menaces et les événements critiques.
              </p>
              <p style={{ marginTop: '1.25rem' }}>
                <button type="button" className="nav-btn" onClick={onReadMore}>
                  En savoir plus →
                </button>
              </p>
            </>
          ) : (
            <>
              <p>
                Trained in IT engineering at IAI-Togo, I later earned a
                <strong> Master II in Information Systems & Networks </strong>
                from Collège de Paris Supérieur in Lome with
                <strong> honors</strong>.
              </p>
              <p>
                At <strong>Neemba Togo</strong>, I work across infrastructure, advanced support, telecom
                operations, and IT environment improvement with a strong focus on reliability, clarity, and
                execution quality.
              </p>
              <p>
                As a <strong>Wazuh Security Ambassador</strong>, I also design and deploy monitoring and
                security architectures that provide concrete visibility into threats and critical events.
              </p>
              <p style={{ marginTop: '1.25rem' }}>
                <button type="button" className="nav-btn" onClick={onReadMore}>
                  Read more →
                </button>
              </p>
            </>
          )}
        </div>
        <div
          className="acard overflow-hidden"
          onMouseEnter={() => setIsHoveringStats(true)}
          onMouseLeave={() => setIsHoveringStats(false)}
        >
          <small>{lang === 'FR' ? 'Expérience IT' : 'IT experience'}</small>
          <div className="anim-stat-wrap">
            <AnimatePresence mode="wait">
              {statIndex === 0 && (
                <motion.div
                  key="stat1"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big>3+</big>
                  <br />
                  <em>{lang === 'FR' ? 'Années · Admin & sécurité' : 'Years · Admin & security'}</em>
                </motion.div>
              )}
              {statIndex === 1 && (
                <motion.div
                  key="stat2"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big>15+</big>
                  <br />
                  <em>{lang === 'FR' ? 'Technologies maîtrisées' : 'Technologies mastered'}</em>
                </motion.div>
              )}
              {statIndex === 2 && (
                <motion.div
                  key="stat3"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big>6</big>
                  <br />
                  <em>{lang === 'FR' ? 'Projets techniques livrés' : 'Technical projects delivered'}</em>
                </motion.div>
              )}
              {statIndex === 3 && (
                <motion.div
                  key="stat4"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big style={{ fontSize: '2rem' }}>Master II</big>
                  <br />
                  <em>{lang === 'FR' ? 'Collège de Paris · Mention bien' : 'College de Paris · With honors'}</em>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div
          className="acard-dark overflow-hidden"
          onMouseEnter={() => setIsHoveringStats(true)}
          onMouseLeave={() => setIsHoveringStats(false)}
        >
          <small>{lang === 'FR' ? 'Localisation & poste' : 'Location & role'}</small>
          <div className="anim-stat-wrap">
            <AnimatePresence mode="wait">
              {statIndex % 2 === 0 && (
                <motion.div
                  key="loc1"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big>
                    {lang === 'FR' ? 'Lomé,' : 'Lome,'}
                    <br />
                    Togo
                  </big>
                </motion.div>
              )}
              {statIndex % 2 === 1 && (
                <motion.div
                  key="loc2"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  transition={statTransition}
                  className="anim-stat-abs"
                >
                  <big style={{ fontSize: '1.375rem' }}>Neemba Togo</big>
                  <br />
                  <em>{lang === 'FR' ? 'Admin Digital Workplace' : 'Digital Workplace Admin'}</em>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
