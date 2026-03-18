import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

interface AboutProps {
  onReadMore: () => void;
}

const About: React.FC<AboutProps> = ({ onReadMore }) => {
  const [statIndex, setStatIndex] = useState(0);
  const [isHoveringStats, setIsHoveringStats] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const statTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3 };

  useEffect(() => {
    let statTimer: any;
    if (!isHoveringStats && !prefersReducedMotion) {
      statTimer = setInterval(() => {
        setStatIndex((prev) => (prev + 1) % 4);
      }, 3000);
    }
    return () => clearInterval(statTimer);
  }, [isHoveringStats, prefersReducedMotion]);

  return (
    <section className="sec" id="about">
      <div className="sec-hdr">
        <span className="sec-num">02</span>
        <h2 className="sec-ttl">À propos de moi.</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <p>Ingénieur des Travaux Informatiques (IAI-Togo, Bac+3), j'ai obtenu mon <strong>Master II Réseaux & Systèmes d'Information</strong> au Collège de Paris Supérieur de Lomé avec la <strong>Mention Bien</strong>.</p>
          <p>Actuellement chez <strong>Neemba Togo</strong>, je pilote les budgets IT et des projets télécoms d'envergure tout en optimisant les infrastructures via l'IA. En tant que <strong>Wazuh Security Ambassador</strong>, je déploie des solutions SIEM/XDR avancées pour une protection proactive.</p>
          <p style={{ marginTop: '1.25rem' }}><button className="nav-btn" onClick={onReadMore}>En savoir plus →</button></p>
        </div>
        <div 
          className="acard overflow-hidden"
          onMouseEnter={() => setIsHoveringStats(true)}
          onMouseLeave={() => setIsHoveringStats(false)}
        >
          <small>Expérience IT</small>
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
                  <big>3+</big><br/><em>Années · Admin & Sécurité</em>
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
                  <big>15+</big><br/><em>Technologies maîtrisées</em>
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
                  <big>6</big><br/><em>Projets techniques livrés</em>
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
                  <big style={{ fontSize: '2rem' }}>Master II</big><br/><em>Collège de Paris · Mention Bien</em>
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
          <small>Localisation & Poste</small>
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
                  <big>Lomé,<br />Togo</big>
                  <em><div className="dot-g"></div>Mobilité internationale</em>
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
                  <big style={{ fontSize: '1.375rem' }}>Neemba Togo</big><br />
                  <em>Admin Digital Workplace</em>
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
