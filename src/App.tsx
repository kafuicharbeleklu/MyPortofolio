import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackToTop from './components/BackToTop';
import ChatbotButton from './components/ChatbotButton';

function App() {
  const [activePage, setActivePage] = useState('main');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statIndex, setStatIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const withBase = (assetPath: string) =>
    `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}`;

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    const statTimer = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(statTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (activePage !== 'main') {
      setActivePage('main');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDiscoverProfile = () => scrollToSection('about');
  const handleViewProjects = () => scrollToSection('projets');

  const MobileNav = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-nav"
        >
          <div className="close-btn" onClick={toggleMobileMenu}>✕</div>
          <ul className="mobile-nav-links">
            <li><a href="#about" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>À propos</a></li>
            <li><a href="#skills" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Compétences</a></li>
            <li><a href="#parcours" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('parcours'); }}>Expérience</a></li>
            <li><a href="#formation" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('formation'); }}>Formation</a></li>
            <li><a href="#projets" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('projets'); }}>Projets</a></li>
            <li><a href="#refs" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('refs'); }}>Références</a></li>
            <li><a href="#contact" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const showDetail = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToMain = () => {
    setActivePage('main');
    setTimeout(() => {
      const el = document.getElementById('projets');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="app" id="app">
      {/* ====== MAIN PAGE ====== */}
      <main className={`page ${activePage === 'main' ? 'active' : ''}`} id="page-main">
        <nav className="nav">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>K · E</div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#about" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>À propos</a></li>
            <li><a href="#skills" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Compétences</a></li>
            <li><a href="#parcours" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('parcours'); }}>Expérience</a></li>
            <li><a href="#formation" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('formation'); }}>Formation</a></li>
            <li><a href="#projets" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('projets'); }}>Projets</a></li>
            <li><a href="#refs" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('refs'); }}>Références</a></li>
            <li><a href="#contact" role="button" tabIndex={0} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
          <div className="nav-tag">Lomé, Togo</div>
        </nav>
        <MobileNav />

        {/* HERO */}
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
                  <button className="kp-btn-dark" onClick={handleDiscoverProfile}>Découvrir mon profil</button>
                  <button className="kp-btn-line" onClick={handleViewProjects}>Voir mes projets →</button>
                </div>
              </div>
            </div>
            <div className="hero-r">
              <div className="hr-top" style={{ position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
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
                  <a href="https://wazuh.com/ambassador/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: '#fff', cursor: 'pointer', border: '1px solid #7DC4A0', borderRadius: '4px', padding: '0.5rem', marginTop: '0.5rem', backgroundColor: '#7DC4A0', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6ab08d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7DC4A0'}>
                    Wazuh Security<br />Ambassador
                  </a>
                </div>
                <div className="ib"><small>Contact</small><p>eklu.kafuicharbel<br />@gmail.com</p></div>
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

        {/* À PROPOS */}
        <section className="sec" id="about">
          <div className="sec-hdr">
            <span className="sec-num">02</span>
            <h2 className="sec-ttl">À propos de moi.</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>Ingénieur des Travaux Informatiques (IAI-Togo, Bac+3), j'ai obtenu mon <strong>Master II Réseaux & Systèmes d'Information</strong> au Collège de Paris Supérieur de Lomé avec la <strong>Mention Bien</strong>.</p>
              <p>Actuellement chez <strong>Neemba Togo</strong>, je pilote les budgets IT et des projets télécoms d'envergure tout en optimisant les infrastructures via l'IA. En tant que <strong>Wazuh Security Ambassador</strong>, je déploie des solutions SIEM/XDR avancées pour une protection proactive.</p>
              <p style={{ marginTop: '1.25rem' }}><button className="nav-btn" onClick={() => showDetail('biography')}>En savoir plus →</button></p>
            </div>
            <div className="acard" style={{ position: 'relative', overflow: 'hidden' }}>
              <small>Expérience IT</small>
              <div style={{ position: 'relative', height: '3.75rem' }}>
                <AnimatePresence mode="wait">
                  {statIndex === 0 && (
                    <motion.div
                      key="stat1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <big>3+</big><br/><em>Années · Admin & Sécurité</em>
                    </motion.div>
                  )}
                  {statIndex === 1 && (
                    <motion.div
                      key="stat2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <big>15+</big><br/><em>Technologies maîtrisées</em>
                    </motion.div>
                  )}
                  {statIndex === 2 && (
                    <motion.div
                      key="stat3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <big>6</big><br/><em>Projets techniques livrés</em>
                    </motion.div>
                  )}
                  {statIndex === 3 && (
                    <motion.div
                      key="stat4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <big style={{ fontSize: '2rem' }}>Master II</big><br/><em>Collège de Paris · Mention Bien</em>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="acard-dark" style={{ position: 'relative', overflow: 'hidden' }}>
              <small>Localisation & Poste</small>
              <div style={{ position: 'relative', height: '3.75rem' }}>
                <AnimatePresence mode="wait">
                  {statIndex % 2 === 0 && (
                    <motion.div
                      key="loc1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <big>Lomé,<br />Togo</big>
                      <em><div className="dot-g"></div>Mobilité internationale</em>
                    </motion.div>
                  )}
                  {statIndex % 2 === 1 && (
                    <motion.div
                      key="loc2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', top: 0, left: 0 }}
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

        {/* CE QUE JE MAÎTRISE */}
        <section className="sec" id="skills" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">03</span>
            <h2 className="sec-ttl">Ce que je maîtrise.</h2>
            <span className="sec-sub">15+ technologies au service de l'infrastructure et de la sécurité.</span>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#EDE0D4' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z" stroke="#A0603A" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="3" stroke="#A0603A" strokeWidth="1.2" fill="none" /></svg>
              </div>
              <h4>Cybersécurité</h4>
              <p>Wazuh SIEM/XDR, détection d'intrusion, audit sécurité, politiques de protection proactive.</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#D8E8F0' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="6" rx="1" stroke="#3A7A8E" strokeWidth="1.5" fill="none" /><rect x="2" y="14" width="20" height="6" rx="1" stroke="#3A7A8E" strokeWidth="1.2" fill="none" /><circle cx="19" cy="7" r="1.2" fill="#3A7A8E" /></svg>
              </div>
              <h4>Systèmes</h4>
              <p>Windows Server, Active Directory, GPO, SCCM/MECM, Ubuntu Server, maintenance parc IT.</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#D8EEE4' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2E7055" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="5" stroke="#2E7055" strokeWidth="1" fill="none" /><circle cx="12" cy="12" r="2" fill="#2E7055" opacity=".6" /></svg>
              </div>
              <h4>Réseaux</h4>
              <p>TCP/IP, routage, switching, VSAT/ARCEP, protocoles réseau, GNS3/EVE-NG, supervision.</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#E4E0F0' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="16" width="4" height="5" rx="1" fill="#5A4A90" opacity=".8" /><rect x="10" y="11" width="4" height="10" rx="1" fill="#5A4A90" opacity=".6" /><rect x="17" y="6" width="4" height="15" rx="1" fill="#5A4A90" opacity=".4" /></svg>
              </div>
              <h4>Gestion & BI</h4>
              <p>Power BI, DAX, CMDB, Matrix42, Veeam, pilotage budget IT, reporting de performance.</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#EEE0D8' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="4,17 9,12 13,15 20,7" stroke="#A0603A" strokeWidth="1.5" fill="none" /><circle cx="4" cy="17" r="1.5" fill="#A0603A" /><circle cx="20" cy="7" r="1.5" fill="#A0603A" /></svg>
              </div>
              <h4>Scripting & IA</h4>
              <p>Bash, PowerShell, Python, Power Automate, Vibe Coding, automatisation et IA générative.</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon" style={{ background: '#D8E4EE' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 8 Q12 4 20 8 Q12 12 4 8Z" stroke="#185FA5" strokeWidth="1.2" fill="none" /><path d="M4 12 Q12 8 20 12" stroke="#185FA5" strokeWidth="1" fill="none" /><path d="M4 16 Q12 12 20 16" stroke="#185FA5" strokeWidth=".8" fill="none" /></svg>
              </div>
              <h4>Cloud & Virtualisation</h4>
              <p>Microsoft Azure, Microsoft 365, solutions cloud hybrides, infrastructure virtualisée.</p>
            </div>
          </div>
        </section>

        {/* MON PARCOURS */}
        <section className="sec" id="parcours">
          <div className="sec-hdr">
            <span className="sec-num">04</span>
            <h2 className="sec-ttl">Mon parcours.</h2>
            <span className="sec-sub">Expériences professionnelles forgeant mon expertise technique.</span>
          </div>
          <div className="timeline">
            <div className="tl-item current">
              <p className="tl-date">Août 2024 — Présent</p>
              <h3 className="tl-title">Administrateur Digital Workplace & Infrastructure</h3>
              <p className="tl-co">Neemba Togo</p>
              <p className="tl-desc">Élaboration du budget IT, pilotage de la portabilité réseau mobile, supervision VSAT, support N2/N3, et optimisation via IA (Vibe Coding). Gestion de projets télécoms d'envergure.</p>
            </div>
            <div className="tl-item">
              <p className="tl-date">Mai 2023 — Août 2024</p>
              <h3 className="tl-title">Technicien Informatique</h3>
              <p className="tl-co">Neemba Togo</p>
              <p className="tl-desc">Déploiement complet SIEM/XDR Wazuh — ambassadeur officiel de la solution. Maintenance du parc informatique et surveillance des performances réseau.</p>
            </div>
            <div className="tl-item">
              <p className="tl-date">Juin 2022 — Oct. 2022</p>
              <h3 className="tl-title">Technicien Support & Système (Stage)</h3>
              <p className="tl-co">Orabank Togo</p>
              <p className="tl-desc">Installation contrôleur de domaine Windows Server, configuration des solutions de transfert de fonds, support N2/N3 sur l'ensemble des agences.</p>
            </div>
            <div className="tl-item">
              <p className="tl-date">Septembre 2021</p>
              <h3 className="tl-title">Technicien Informatique (Stage)</h3>
              <p className="tl-co">Clinique BIASA</p>
              <p className="tl-desc">Assistance aux utilisateurs et installation de services réseau sous Linux Ubuntu Server (DNS, DHCP, Apache, NAT). Formation des équipes internes.</p>
            </div>
          </div>
        </section>

        {/* MA FORMATION */}
        <section className="sec" id="formation" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">05</span>
            <h2 className="sec-ttl">Ma formation.</h2>
            <span className="sec-sub">Diplômes obtenus avec distinction dans les meilleures institutions de Lomé.</span>
          </div>
          <div className="edu-grid">
            <div className="edu-card">
              <p className="edu-year">2024 — 2025</p>
              <h3 className="edu-title">Master II Professionnel</h3>
              <p className="edu-school">Collège de Paris Supérieur · Lomé<br />Réseaux & Systèmes d'Information</p>
              <div className="edu-grade"><big>15,07</big><span>/ 20 · Mention Bien</span></div>
            </div>
            <div className="edu-card">
              <p className="edu-year">2022 — 2023</p>
              <h3 className="edu-title">Licence Professionnelle</h3>
              <p className="edu-school">IAI-TOGO · Institut Africain d'Informatique<br />Administration Système & Réseau</p>
              <p className="edu-check">✓ Diplôme obtenu</p>
            </div>
          </div>
        </section>

        {/* MES RÉALISATIONS */}
        <section className="sec" id="projets">
          <div className="sec-hdr">
            <span className="sec-num">06</span>
            <h2 className="sec-ttl">Mes réalisations.</h2>
            <span className="sec-sub">6 projets techniques livrés, chacun résolvant un problème réel.</span>
          </div>

          <div className="proj-feat" onClick={() => showDetail('siem')}>
            <div className="pf-vis" style={{ background: '#2C3E2E' }}>
              <div className="cat-b" style={{ background: 'rgba(212,149,106,.2)', color: '#D4956A' }}>Cybersécurité · Projet phare</div>
              <svg width="80" height="80" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}><path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke="#D4956A" strokeWidth="2" fill="none" /><circle cx="45" cy="46" r="13" stroke="#D4956A" strokeWidth="1.5" fill="none" /><circle cx="45" cy="46" r="5" fill="#D4956A" opacity=".6" /><line x1="45" y1="24" x2="45" y2="33" stroke="#D4956A" /><line x1="45" y1="59" x2="45" y2="68" stroke="#D4956A" /><line x1="23" y1="46" x2="32" y2="46" stroke="#D4956A" /><line x1="58" y1="46" x2="67" y2="46" stroke="#D4956A" /></svg>
            </div>
            <div className="pf-body">
              <div>
                <p className="pf-eye">— Projet 01 · Phare</p>
                <h3 className="pf-title">Déploiement SIEM / XDR Wazuh</h3>
                <p className="pf-co">Neemba Togo · 2023–2024</p>
                <p className="pf-desc">Déploiement complet d'une solution SIEM/XDR Wazuh sur l'ensemble du parc. Détection d'intrusion, corrélation d'événements et dashboards temps réel.</p>
                <div className="res-box"><div className="res-lbl">Résultat clé</div><div className="res-val">100 % des endpoints couverts · Détection proactive activée</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="tags"><span className="tag tc">Wazuh</span><span className="tag tc">SIEM</span><span className="tag tc">XDR</span></div>
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.0625em', textTransform: 'uppercase', color: '#1C1916', borderBottom: '0.0625rem solid #1C1916', paddingBottom: '0.0625rem', cursor: 'pointer' }}>Voir le détail →</span>
              </div>
            </div>
          </div>

          <div className="pj-grid">
            <div className="pj-card" onClick={() => showDetail('moov')}>
              <div className="pj-vis" style={{ background: '#2B3A4A' }}><div className="cat-b" style={{ background: 'rgba(123,191,208,.2)', color: '#7BBFD0' }}>Télécom</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="20" stroke="#7BBFD0" strokeWidth="1.5" fill="none" /><circle cx="30" cy="30" r="12" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="5" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="2" fill="#7BBFD0" /></svg></div>
              <div className="pj-body"><h3 className="pj-title">Portabilité MOOV → Togocom</h3><p className="pj-co">Neemba Togo · 2024</p><p className="pj-desc">Migration complète réseau mobile avec supervision VSAT et zéro interruption.</p><div className="pj-foot"><div className="tags"><span className="tag tt">VSAT</span><span className="tag tt">Migration</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
            </div>
            <div className="pj-card" onClick={() => showDetail('orabank')}>
              <div className="pj-vis" style={{ background: '#3A2C1E' }}><div className="cat-b" style={{ background: 'rgba(200,168,90,.2)', color: '#C8A85A' }}>Réseau</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="20" y="8" width="20" height="12" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" /><rect x="8" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><rect x="36" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><line x1="30" y1="20" x2="30" y2="34" stroke="#C8A85A" /><line x1="16" y1="28" x2="44" y2="28" stroke="#C8A85A" /><line x1="16" y1="28" x2="16" y2="34" stroke="#C8A85A" /><line x1="44" y1="28" x2="44" y2="34" stroke="#C8A85A" /></svg></div>
              <div className="pj-body"><h3 className="pj-title">Contrôleur de Domaine Orabank</h3><p className="pj-co">Orabank Togo · Stage 2022</p><p className="pj-desc">Windows Server AD, GPO et politiques de sécurité multi-agences.</p><div className="pj-foot"><div className="tags"><span className="tag tr">Windows Server</span><span className="tag tr">AD</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
            </div>
            <div className="pj-card" onClick={() => showDetail('biasa')}>
              <div className="pj-vis" style={{ background: '#2A3830' }}><div className="cat-b" style={{ background: 'rgba(125,196,160,.2)', color: '#7DC4A0' }}>Linux</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="10" y="16" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" /><rect x="10" y="28" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" /><circle cx="44" cy="20" r="2" fill="#7DC4A0" /><line x1="18" y1="40" x2="42" y2="40" stroke="#7DC4A0" /><line x1="30" y1="36" x2="30" y2="44" stroke="#7DC4A0" /></svg></div>
              <div className="pj-body"><h3 className="pj-title">Services Réseau Linux · BIASA</h3><p className="pj-co">Clinique BIASA · Stage 2021</p><p className="pj-desc">DNS, DHCP, Apache, NAT sur Ubuntu Server — réseau créé from scratch.</p><div className="pj-foot"><div className="tags"><span className="tag tl2">Ubuntu</span><span className="tag tl2">DNS/DHCP</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', position: 'relative', zIndex: 1 }}>
            <button className="kp-btn-dark" onClick={() => { setActivePage('all-projects'); window.scrollTo(0,0); }}>
              Voir tous les projets
            </button>
          </div>
        </section>

        {/* MES RÉFÉRENCES */}
        <section className="sec" id="refs" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">07</span>
            <h2 className="sec-ttl">Mes références.</h2>
          </div>
          <div className="ref-grid">
            <div className="ref-card">
              <div className="ref-av">MA</div>
              <p className="ref-name">M. AGBAZAHOU K. Jean</p>
              <p className="ref-org">Coris Bank International Togo</p>
              <p className="ref-role">Directeur des Systèmes d'Information</p>
              <p className="ref-contact">jagbazahou@corisbank.com</p>
            </div>
            <div className="ref-card">
              <div className="ref-av">MT</div>
              <p className="ref-name">M. TCHAKPIDE T. Ouro-Bawinay</p>
              <p className="ref-org">Coris Bank International Togo</p>
              <p className="ref-role">Responsable Système d'Informations</p>
              <p className="ref-contact">+228 96 11 03 56</p>
            </div>
          </div>
        </section>

        {/* ME CONTACTER */}
        <section className="sec" id="contact">
          <div className="sec-hdr">
            <span className="sec-num">08</span>
            <h2 className="sec-ttl">Me contacter.</h2>
            <span className="sec-sub">Disponible pour toute opportunité en administration système, cybersécurité ou gestion IT.</span>
          </div>
          <div className="contact-wrap">
            <div className="contact-info">
              <h3>Parlons de votre<br />prochain projet.</h3>
              <p>Disponible immédiatement pour des missions en administration système, cybersécurité ou gestion d'infrastructure IT — à Lomé ou en mobilité internationale.</p>
              <div className="contact-items">
                <div className="c-item"><div className="c-icon"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div><div><small>Email</small><p>eklu.kafuicharbel@gmail.com</p></div></div>
                <div className="c-item"><div className="c-icon"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><small>Téléphone</small><p>+228 70 66 42 25</p></div></div>
                <div className="c-item"><div className="c-icon"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></div><div><small>LinkedIn</small><p>Kafui Charbel Eklu</p></div></div>
                <div className="c-item"><div className="c-icon"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div><div><small>Localisation</small><p>Lomé, Togo · Mobilité internationale</p></div></div>
              </div>
            </div>
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group"><label>Nom complet</label><input type="text" placeholder="Votre nom" /></div>
                <div className="form-group"><label>Email</label><input type="email" placeholder="votre@email.com" /></div>
              </div>
              <div className="form-full"><div className="form-group"><label>Sujet</label><input type="text" placeholder="Objet de votre message" /></div></div>
              <div className="form-full"><div className="form-group"><label>Message</label><textarea placeholder="Décrivez votre projet ou opportunité..."></textarea></div></div>
              <button className="btn-submit" onClick={() => { window.location.href = 'mailto:eklu.kafuicharbel@gmail.com?subject=Contact via Portfolio'; }}>Envoyer le message</button>
            </div>
          </div>
        </section>

        {/* TOP OF PAGE BUTTON */}
        <BackToTop />

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2026 Kafui Charbel EKLU. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/kafui-charbel-eklu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/kafui-eklu" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </footer>
      </main>{/* end page-main */}

      {/* ====== DETAIL PAGES ====== */}

      {/* SIEM */}
      <div className={`page ${activePage === 'siem' ? 'active' : ''}`} id="page-siem">
        <nav className="nav"><div className="nav-logo" onClick={backToMain}>K · E</div><div className="nav-back" onClick={backToMain}>← Retour aux projets</div><div className="nav-tag">Cybersécurité</div></nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2C3E2E' }}><div className="det-cat" style={{ background: 'rgba(212,149,106,.2)', color: '#D4956A' }}>Cybersécurité · Projet phare</div><svg width="100" height="100" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}><path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke="#D4956A" strokeWidth="2" fill="none" /><circle cx="45" cy="46" r="14" stroke="#D4956A" strokeWidth="1.5" fill="none" /><circle cx="45" cy="46" r="6" fill="#D4956A" opacity=".5" /><line x1="45" y1="22" x2="45" y2="32" stroke="#D4956A" /><line x1="45" y1="60" x2="45" y2="70" stroke="#D4956A" /><line x1="21" y1="46" x2="31" y2="46" stroke="#D4956A" /><line x1="59" y1="46" x2="69" y2="46" stroke="#D4956A" /></svg></div>
            <div><p className="det-eye">01 — Neemba Togo · 2023–2024</p><h1 className="det-title">Déploiement SIEM / XDR Wazuh</h1><p className="det-co">Neemba Togo</p><p className="det-desc">Déploiement complet d'une plateforme SIEM/XDR Wazuh sur l'ensemble du parc afin de centraliser la détection des menaces, automatiser les alertes et fournir une visibilité totale sur les événements de sécurité.</p>
              <div className="det-meta"><div className="dm"><small>Durée</small><p>14 mois</p></div><div className="dm"><small>Rôle</small><p>Lead technique</p></div><div className="dm"><small>Env.</small><p>Linux · On-premise</p></div><div className="dm"><small>Statut</small><p style={{ color: '#4CAF7D' }}>Production active</p></div></div></div>
          </div>
          <div className="det-body">
            <div>
              <div className="blk"><h3 className="blk-ttl">Contexte & problème</h3><p>Neemba Togo ne disposait d'aucune solution centralisée de surveillance sécuritaire. Les incidents n'étaient détectés qu'après impact, sans corrélation ni historique exploitable.</p></div>
              <div className="blk"><h3 className="blk-ttl">Ce que j'ai réalisé</h3><ul className="steps"><li>Audit du parc existant et cartographie des assets à surveiller.</li><li>Installation et configuration du manager Wazuh sur serveur Linux dédié.</li><li>Déploiement des agents Wazuh sur tous les postes Windows et Linux.</li><li>Création de règles de détection personnalisées adaptées au contexte métier.</li><li>Intégration des alertes avec tableau de bord OpenSearch/Kibana.</li><li>Formation de l'équipe IT à l'analyse et l'interprétation des alertes.</li></ul></div>
              <div className="blk"><h3 className="blk-ttl">Résultats</h3><div className="res-dark"><small>Couverture endpoints</small><big>100 %</big><em>Du parc surveillé en temps réel</em></div><div className="res-dark" style={{ background: '#EDE7DE' }}><small style={{ color: '#9A8E82' }}>Posture sécurité</small><big style={{ color: '#1C1916', fontSize: '1.125rem' }}>Réactif → Proactif</big><em style={{ color: '#7A6F64' }}>Alertes avant impact confirmé</em></div></div>
            </div>
            <div>
              <div className="sb-blk"><div className="sb-lbl">Technologies</div><div className="tags" style={{ gap: '0.375rem' }}><span className="tag tc">Wazuh</span><span className="tag tc">SIEM</span><span className="tag tc">XDR</span><span className="tag tl2">Linux</span><span className="tag tl2">OpenSearch</span><span className="tag">Kibana</span><span className="tag">Bash</span></div></div>
              <div className="sb-blk"><div className="sb-lbl">Chronologie</div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Mai 2023</span>Audit & cahier des charges</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Juil. 2023</span>Installation manager Wazuh</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Sept. 2023</span>Déploiement agents parc</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Déc. 2023</span>Règles personnalisées actives</div></div>
                <div className="tl-li"><div className="tl-d ok"></div><div><span>Août 2024</span>100 % couverture · Production</div></div>
              </div>
              <div className="sb-blk"><div className="sb-lbl">Certification liée</div><p style={{ fontSize: '0.75rem', color: '#5A4F44', lineHeight: '1.6' }}>Wazuh Security Ambassador — Ambassadeur officiel reconnu pour l'expertise SIEM/XDR.</p></div>
            </div>
          </div>
          <div className="rel"><h3 className="rel">Projets similaires</h3><div className="rel-grid" style={{ marginTop: '1rem' }}><div className="rel-card" onClick={() => showDetail('orabank')}><h4>Contrôleur de Domaine Orabank</h4><p>Orabank · Réseau entreprise</p></div><div className="rel-card" onClick={() => showDetail('moov')}><h4>Portabilité MOOV → Togocom</h4><p>Neemba Togo · Télécom</p></div></div></div>
        </div>
      </div>

      {/* MOOV */}
      <div className={`page ${activePage === 'moov' ? 'active' : ''}`} id="page-moov">
        <nav className="nav"><div className="nav-logo" onClick={backToMain}>K · E</div><div className="nav-back" onClick={backToMain}>← Retour aux projets</div><div className="nav-tag">Télécom</div></nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2B3A4A' }}><div className="det-cat" style={{ background: 'rgba(123,191,208,.2)', color: '#7BBFD0' }}>Infrastructure Télécom</div><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="22" stroke="#7BBFD0" strokeWidth="1.5" fill="none" /><circle cx="30" cy="30" r="15" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="8" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="3" fill="#7BBFD0" /></svg></div>
            <div><p className="det-eye">02 — Neemba Togo · 2024</p><h1 className="det-title">Portabilité Réseau MOOV → Togocom</h1><p className="det-co">Neemba Togo</p><p className="det-desc">Pilotage de la migration complète du réseau mobile de Neemba Togo depuis l'opérateur MOOV vers Togocom. Coordination multi-acteurs, maintien de la continuité de service et supervision VSAT tout au long de la transition.</p>
              <div className="det-meta"><div className="dm"><small>Durée</small><p>6 mois</p></div><div className="dm"><small>Rôle</small><p>Chef de projet IT</p></div><div className="dm"><small>Type</small><p>Migration réseau</p></div><div className="dm"><small>Statut</small><p style={{ color: '#4CAF7D' }}>Livré</p></div></div></div>
          </div>
          <div className="det-body">
            <div>
              <div className="blk"><h3 className="blk-ttl">Contexte & enjeux</h3><p>Neemba Togo devait migrer l'intégralité de son parc de lignes mobiles professionnelles dans un délai contraint, sans interruption des communications critiques ni perte de continuité sur les liaisons VSAT.</p></div>
              <div className="blk"><h3 className="blk-ttl">Ce que j'ai réalisé</h3><ul className="steps"><li>Cartographie complète des lignes mobiles actives et dépendances réseau.</li><li>Coordination avec MOOV Togo et Togocom pour le calendrier de migration.</li><li>Supervision des liaisons VSAT pendant toute la durée de la migration.</li><li>Tests de continuité et validation de la qualité de service post-bascule.</li><li>Documentation de la nouvelle infrastructure réseau mobile.</li></ul></div>
              <div className="blk"><h3 className="blk-ttl">Résultat</h3><div className="res-dark"><small>Continuité de service</small><big>Zéro interruption</big><em>Migration transparente pour les utilisateurs finaux</em></div></div>
            </div>
            <div>
              <div className="sb-blk"><div className="sb-lbl">Technologies</div><div className="tags" style={{ gap: '0.375rem' }}><span className="tag tt">VSAT</span><span className="tag tt">ARCEP</span><span className="tag tt">Télécom</span><span className="tag">Gestion de projet</span></div></div>
              <div className="sb-blk"><div className="sb-lbl">Chronologie</div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Jan. 2024</span>Audit & cartographie lignes</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Mars 2024</span>Coordination opérateurs</div></div>
                <div className="tl-li"><div className="tl-d ok"></div><div><span>Juin 2024</span>Migration finalisée</div></div>
              </div>
            </div>
          </div>
          <div className="rel"><h3>Projets similaires</h3><div className="rel-grid" style={{ marginTop: '1rem' }}><div className="rel-card" onClick={() => showDetail('siem')}><h4>Déploiement SIEM/XDR Wazuh</h4><p>Neemba Togo · Cybersécurité</p></div><div className="rel-card" onClick={() => showDetail('biasa')}><h4>Services Réseau Linux · BIASA</h4><p>Clinique BIASA · Infrastructure</p></div></div></div>
        </div>
      </div>

      {/* ORABANK */}
      <div className={`page ${activePage === 'orabank' ? 'active' : ''}`} id="page-orabank">
        <nav className="nav"><div className="nav-logo" onClick={backToMain}>K · E</div><div className="nav-back" onClick={backToMain}>← Retour aux projets</div><div className="nav-tag">Réseau Entreprise</div></nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#3A2C1E' }}><div className="det-cat" style={{ background: 'rgba(200,168,90,.2)', color: '#C8A85A' }}>Réseau Entreprise</div><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="20" y="6" width="20" height="14" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" /><rect x="6" y="36" width="18" height="12" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><rect x="36" y="36" width="18" height="12" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><line x1="30" y1="20" x2="30" y2="36" stroke="#C8A85A" strokeWidth="1.2" /><line x1="15" y1="28" x2="45" y2="28" stroke="#C8A85A" /><line x1="15" y1="28" x2="15" y2="36" stroke="#C8A85A" /><line x1="45" y1="28" x2="45" y2="36" stroke="#C8A85A" /></svg></div>
            <div><p className="det-eye">03 — Orabank Togo · Stage 2022</p><h1 className="det-title">Contrôleur de Domaine Orabank</h1><p className="det-co">Orabank Togo</p><p className="det-desc">Installation et configuration d'un contrôleur de domaine Windows Server pour centraliser l'authentification, appliquer les GPO et assurer le support N2/N3 des agences bancaires.</p>
              <div className="det-meta"><div className="dm"><small>Durée</small><p>5 mois (stage)</p></div><div className="dm"><small>Rôle</small><p>Technicien Système</p></div><div className="dm"><small>Env.</small><p>Windows Server 2019</p></div><div className="dm"><small>Statut</small><p style={{ color: '#4CAF7D' }}>Livré</p></div></div></div>
          </div>
          <div className="det-body">
            <div>
              <div className="blk"><h3 className="blk-ttl">Contexte</h3><p>Les agences Orabank nécessitaient une infrastructure d'authentification centralisée pour sécuriser les accès, uniformiser les politiques de sécurité et simplifier la gestion des comptes utilisateurs multi-sites.</p></div>
              <div className="blk"><h3 className="blk-ttl">Ce que j'ai réalisé</h3><ul className="steps"><li>Installation d'un contrôleur de domaine Active Directory sur Windows Server 2019.</li><li>Configuration des GPO : mots de passe, verrouillage, restrictions logicielles.</li><li>Jonction au domaine de l'ensemble des postes des agences concernées.</li><li>Mise en place des solutions de transfert de fonds sécurisées.</li><li>Support N2/N3 : résolution d'incidents et documentation technique.</li></ul></div>
              <div className="blk"><h3 className="blk-ttl">Résultat</h3><div className="res-dark"><small>Gestion centralisée</small><big>Multi-agences</big><em>Authentification et politiques unifiées sur tout le réseau</em></div></div>
            </div>
            <div>
              <div className="sb-blk"><div className="sb-lbl">Technologies</div><div className="tags" style={{ gap: '0.375rem' }}><span className="tag tr">Windows Server</span><span className="tag tr">Active Directory</span><span className="tag tr">GPO</span><span className="tag">DNS</span><span className="tag">DHCP</span></div></div>
              <div className="sb-blk"><div className="sb-lbl">Chronologie</div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Juin 2022</span>Analyse & installation AD</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Août 2022</span>GPO & jonction postes</div></div>
                <div className="tl-li"><div className="tl-d ok"></div><div><span>Oct. 2022</span>Recette finale & remise</div></div>
              </div>
            </div>
          </div>
          <div className="rel"><h3>Projets similaires</h3><div className="rel-grid" style={{ marginTop: '1rem' }}><div className="rel-card" onClick={() => showDetail('siem')}><h4>Déploiement SIEM/XDR Wazuh</h4><p>Neemba Togo · Cybersécurité</p></div><div className="rel-card" onClick={() => showDetail('biasa')}><h4>Services Réseau Linux · BIASA</h4><p>Clinique BIASA · Infrastructure</p></div></div></div>
        </div>
      </div>

      {/* BIASA */}
      <div className={`page ${activePage === 'biasa' ? 'active' : ''}`} id="page-biasa">
        <nav className="nav"><div className="nav-logo" onClick={backToMain}>K · E</div><div className="nav-back" onClick={backToMain}>← Retour aux projets</div><div className="nav-tag">Linux · Infrastructure</div></nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2A3830' }}><div className="det-cat" style={{ background: 'rgba(125,196,160,.2)', color: '#7DC4A0' }}>Infrastructure Linux</div><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="8" y="14" width="44" height="10" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" /><rect x="8" y="28" width="44" height="10" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" /><circle cx="46" cy="19" r="2.5" fill="#7DC4A0" /><line x1="30" y1="42" x2="30" y2="50" stroke="#7DC4A0" strokeWidth="1.2" /><line x1="18" y1="50" x2="42" y2="50" stroke="#7DC4A0" strokeWidth="1.2" /></svg></div>
            <div><p className="det-eye">04 — Clinique BIASA · Stage 2021</p><h1 className="det-title">Services Réseau Linux · Clinique BIASA</h1><p className="det-co">Clinique BIASA</p><p className="det-desc">Déploiement de services réseau essentiels (DNS, DHCP, Apache, NAT) sur Ubuntu Server pour interconnecter les équipements de la clinique et héberger les ressources internes.</p>
              <div className="det-meta"><div className="dm"><small>Durée</small><p>2 mois (stage)</p></div><div className="dm"><small>Rôle</small><p>Technicien réseau</p></div><div className="dm"><small>OS</small><p>Ubuntu Server LTS</p></div><div className="dm"><small>Statut</small><p style={{ color: '#4CAF7D' }}>Livré</p></div></div></div>
          </div>
          <div className="det-body">
            <div>
              <div className="blk"><h3 className="blk-ttl">Contexte</h3><p>La clinique ne disposait pas d'infrastructure réseau structurée. Les postes fonctionnaient en workgroup sans gestion centralisée des IP ni DNS interne, rendant la maintenance complexe.</p></div>
              <div className="blk"><h3 className="blk-ttl">Ce que j'ai réalisé</h3><ul className="steps"><li>Installation et configuration d'Ubuntu Server LTS sur le serveur dédié.</li><li>Mise en place du service DNS interne pour la résolution locale des noms.</li><li>Configuration DHCP pour l'attribution automatique des adresses IP.</li><li>Déploiement d'Apache pour l'hébergement des ressources intranet.</li><li>Configuration NAT pour le partage de la connexion internet.</li><li>Formation des utilisateurs et rédaction de la documentation technique.</li></ul></div>
              <div className="blk"><h3 className="blk-ttl">Résultat</h3><div className="res-dark"><small>Infrastructure créée from scratch</small><big>Réseau opérationnel</big><em>DNS · DHCP · Apache · NAT — 100 % des postes connectés</em></div></div>
            </div>
            <div>
              <div className="sb-blk"><div className="sb-lbl">Technologies</div><div className="tags" style={{ gap: '0.375rem' }}><span className="tag tl2">Ubuntu Server</span><span className="tag tl2">DNS</span><span className="tag tl2">DHCP</span><span className="tag tl2">Apache</span><span className="tag">NAT</span><span className="tag">Bash</span></div></div>
              <div className="sb-blk"><div className="sb-lbl">Chronologie</div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Sept. 2021</span>Installation Ubuntu Server</div></div>
                <div className="tl-li"><div className="tl-d"></div><div><span>Oct. 2021</span>Services DNS/DHCP/Apache/NAT</div></div>
                <div className="tl-li"><div className="tl-d ok"></div><div><span>Oct. 2021</span>Formation & remise</div></div>
              </div>
            </div>
          </div>
          <div className="rel"><h3>Projets similaires</h3><div className="rel-grid" style={{ marginTop: '1rem' }}><div className="rel-card" onClick={() => showDetail('orabank')}><h4>Contrôleur de Domaine Orabank</h4><p>Orabank · Réseau entreprise</p></div><div className="rel-card" onClick={() => showDetail('siem')}><h4>Déploiement SIEM/XDR Wazuh</h4><p>Neemba Togo · Cybersécurité</p></div></div></div>
        </div>
      </div>

      {/* BIOGRAPHIE */}
      <div className={`page ${activePage === 'biography' ? 'active' : ''}`} id="page-biography">
        <nav className="nav"><div className="nav-logo" onClick={backToMain}>K · E</div><div className="nav-back" onClick={backToMain}>← Retour à l'accueil</div><div className="nav-tag">Biographie</div></nav>

        {/* Bio Hero — Photo + Identity */}
        <section className="bio-hero">
          <div className="bio-hero-photo">
            <img src={withBase('_KSP4314.jpg')} alt="Kafui Charbel Eklu" />
          </div>
          <div className="bio-hero-info">
            <p className="bio-hero-eyebrow">Biographie</p>
            <h1 className="bio-hero-name">EKLU Kafui<br />Charbel</h1>
            <p className="bio-hero-role">Administrateur Système & Réseau</p>
            <div className="bio-hero-location">
              <div className="dot-g"></div>
              <span>Lomé, Togo · Mobilité internationale</span>
            </div>
          </div>
        </section>

        {/* Bio Stats */}
        <section className="bio-stats">
          <div className="bio-stat">
            <span className="bio-stat-num">3+</span>
            <span className="bio-stat-label">Années d'expérience<br />Admin & Sécurité</span>
          </div>
          <div className="bio-stat">
            <span className="bio-stat-num">15+</span>
            <span className="bio-stat-label">Technologies<br />maîtrisées</span>
          </div>
          <div className="bio-stat">
            <span className="bio-stat-num">6</span>
            <span className="bio-stat-label">Projets techniques<br />livrés</span>
          </div>
          <div className="bio-stat">
            <span className="bio-stat-num bio-stat-text">Master II</span>
            <span className="bio-stat-label">Collège de Paris<br />Mention Bien</span>
          </div>
        </section>

        {/* Bio Story */}
        <section className="bio-story sec">
          <div className="sec-hdr">
            <span className="sec-num">01</span>
            <h2 className="sec-ttl">Mon histoire.</h2>
          </div>
          <div className="bio-story-grid">
            <div className="bio-story-main">
              <p className="bio-story-lead">L'architecture complexe est mon terrain de jeu.</p>
              <p>Je ne me contente pas de maintenir des systèmes ; je les sculpte. Mon métier est de transformer la complexité technique en infrastructures robustes, sécurisées et performantes.</p>
              <p>Mon parcours est une quête constante de maîtrise : face à des contraintes matérielles sévères dès mes débuts, j'ai transformé la limitation en levier, apprenant à sculpter les systèmes, à optimiser Ubuntu Server en ligne de commande et à maximiser chaque ressource.</p>
              <p>Mon immersion chez <strong>Orabank</strong> a été le catalyseur de mon expertise. Confronté à l'exigence d'un environnement bancaire critique, j'ai maîtrisé en un temps record l'architecture Windows Server (Active Directory, DFS, GPO, WDS). Ce qui était un défi est devenu une compétence socle, prouvant ma capacité à dompter la complexité sous pression.</p>
            </div>
            <div className="bio-story-side">
              <div className="bio-milestone">
                <span className="bio-milestone-year">2021</span>
                <p>Stage Clinique BIASA — Services réseau Linux from scratch</p>
              </div>
              <div className="bio-milestone">
                <span className="bio-milestone-year">2022</span>
                <p>Stage Orabank — Contrôleur de domaine Windows Server</p>
              </div>
              <div className="bio-milestone">
                <span className="bio-milestone-year">2023</span>
                <p>Neemba Togo — Déploiement SIEM/XDR Wazuh</p>
              </div>
              <div className="bio-milestone active">
                <span className="bio-milestone-year">2024</span>
                <p>Admin Digital Workplace & Infrastructure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Quote */}
        <section className="bio-quote-section">
          <blockquote className="bio-quote">
            "Un problème mathématique semble compliqué quand notre niveau est inférieur à celui du défi. Élever son niveau au-dessus le rend facile."
          </blockquote>
        </section>

        {/* Bio Philosophy */}
        <section className="bio-philosophy sec">
          <div className="sec-hdr">
            <span className="sec-num">02</span>
            <h2 className="sec-ttl">Ma philosophie.</h2>
          </div>
          <div className="bio-philosophy-grid">
            <div className="bio-philosophy-card">
              <div className="bio-philosophy-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
              </div>
              <h4>Anticiper, pas réagir</h4>
              <p>Chaque architecture que je conçois intègre la sécurité dès le départ. La détection proactive est plus efficace qu'une réponse post-incident.</p>
            </div>
            <div className="bio-philosophy-card">
              <div className="bio-philosophy-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="4,17 9,12 13,15 20,7" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="4" cy="17" r="1.5" fill="currentColor" /><circle cx="20" cy="7" r="1.5" fill="currentColor" /></svg>
              </div>
              <h4>Contrainte → Levier</h4>
              <p>Face aux imprévus — comme une panne critique — je reste maître du système. Chaque incident est une opportunité de perfectionnement.</p>
            </div>
            <div className="bio-philosophy-card">
              <div className="bio-philosophy-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" fill="none" /><circle cx="12" cy="12" r="2" fill="currentColor" opacity=".6" /></svg>
              </div>
              <h4>Amélioration continue</h4>
              <p>Je ne cesse d'apprendre et de me perfectionner. Élever son niveau au-dessus du défi, c'est ma signature professionnelle.</p>
            </div>
          </div>
        </section>

        {/* Bio Expertise */}
        <section className="bio-expertise sec">
          <div className="sec-hdr">
            <span className="sec-num">03</span>
            <h2 className="sec-ttl">Expertises clés.</h2>
          </div>
          <div className="bio-expertise-wrap">
            <a href="https://wazuh.com/ambassador/" target="_blank" rel="noopener noreferrer" className="bio-tag-link tag tc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              Wazuh Security Ambassador
            </a>
            <span className="tag tr">Windows Server</span>
            <span className="tag tr">Active Directory</span>
            <span className="tag tl2">Linux / Ubuntu</span>
            <span className="tag tt">Réseaux / VSAT</span>
            <span className="tag tt">TCP/IP · Routage</span>
            <span className="tag tc">SIEM / XDR</span>
            <span className="tag tb">Python</span>
            <span className="tag tb">Bash · PowerShell</span>
            <span className="tag">Power BI / DAX</span>
            <span className="tag">Azure / M365</span>
            <span className="tag">SCCM / MECM</span>
          </div>
        </section>

        {/* Bio CTA */}
        <section className="bio-cta">
          <a href={withBase('CV_EKLU_Kafui_Charbel_Admin_Systeme.pdf')} download className="kp-btn-dark bio-cta-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Télécharger mon CV
          </a>
          <button className="kp-btn-line" onClick={() => scrollToSection('contact')}>Me contacter →</button>
        </section>
      </div>

      {/* ====== ALL PROJECTS PAGE ====== */}
      {activePage === 'all-projects' && (
        <div className="page active" id="page-all-projects">
          <nav className="nav">
            <div className="nav-logo" onClick={() => setActivePage('main')}>K · E</div>
            <div className="nav-back" onClick={() => { setActivePage('main'); setTimeout(() => document.getElementById('projets')?.scrollIntoView(), 100); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Retour à l'accueil
            </div>
          </nav>
          <section className="sec" style={{ minHeight: '80vh', background: '#F5F1EC' }}>
            <div className="sec-hdr">
              <span className="sec-num">06</span>
              <h2 className="sec-ttl">Tous mes projets.</h2>
              <span className="sec-sub">L'ensemble de mes réalisations techniques et académiques.</span>
            </div>
            <div className="pj-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(18.75rem, 1fr))', gap: '2rem' }}>
              
              <div className="pj-card" onClick={() => showDetail('siem')}>
                <div className="pj-vis" style={{ background: '#2C3E2E' }}><div className="cat-b" style={{ background: 'rgba(212,149,106,.2)', color: '#D4956A' }}>Cybersécurité</div><svg width="45" height="45" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}><path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke="#D4956A" strokeWidth="2" fill="none" /><circle cx="45" cy="46" r="13" stroke="#D4956A" strokeWidth="1.5" fill="none" /><circle cx="45" cy="46" r="5" fill="#D4956A" opacity=".6" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Déploiement SIEM / XDR Wazuh</h3><p className="pj-co">Neemba Togo · 2023–2024</p><p className="pj-desc">Déploiement complet d'une solution SIEM/XDR Wazuh sur l'ensemble du parc.</p><div className="pj-foot"><div className="tags"><span className="tag tc">Wazuh</span><span className="tag tc">SIEM</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </div>

              <div className="pj-card" onClick={() => showDetail('moov')}>
                <div className="pj-vis" style={{ background: '#2B3A4A' }}><div className="cat-b" style={{ background: 'rgba(123,191,208,.2)', color: '#7BBFD0' }}>Télécom</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="20" stroke="#7BBFD0" strokeWidth="1.5" fill="none" /><circle cx="30" cy="30" r="12" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="5" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="2" fill="#7BBFD0" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Portabilité MOOV → Togocom</h3><p className="pj-co">Neemba Togo · 2024</p><p className="pj-desc">Migration complète réseau mobile avec supervision VSAT et zéro interruption.</p><div className="pj-foot"><div className="tags"><span className="tag tt">VSAT</span><span className="tag tt">Migration</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </div>

              <div className="pj-card" onClick={() => showDetail('orabank')}>
                <div className="pj-vis" style={{ background: '#3A2C1E' }}><div className="cat-b" style={{ background: 'rgba(200,168,90,.2)', color: '#C8A85A' }}>Réseau</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="20" y="8" width="20" height="12" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" /><rect x="8" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><rect x="36" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><line x1="30" y1="20" x2="30" y2="34" stroke="#C8A85A" /><line x1="16" y1="28" x2="44" y2="28" stroke="#C8A85A" /><line x1="16" y1="28" x2="16" y2="34" stroke="#C8A85A" /><line x1="44" y1="28" x2="44" y2="34" stroke="#C8A85A" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Contrôleur de Domaine Orabank</h3><p className="pj-co">Orabank Togo · Stage 2022</p><p className="pj-desc">Windows Server AD, GPO et politiques de sécurité multi-agences.</p><div className="pj-foot"><div className="tags"><span className="tag tr">Windows Server</span><span className="tag tr">AD</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </div>

              <div className="pj-card" onClick={() => showDetail('biasa')}>
                <div className="pj-vis" style={{ background: '#2A3830' }}><div className="cat-b" style={{ background: 'rgba(125,196,160,.2)', color: '#7DC4A0' }}>Linux</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="10" y="16" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" /><rect x="10" y="28" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" /><circle cx="44" cy="20" r="2" fill="#7DC4A0" /><line x1="18" y1="40" x2="42" y2="40" stroke="#7DC4A0" /><line x1="30" y1="36" x2="30" y2="44" stroke="#7DC4A0" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Services Réseau Linux · BIASA</h3><p className="pj-co">Clinique BIASA · Stage 2021</p><p className="pj-desc">DNS, DHCP, Apache, NAT sur Ubuntu Server — réseau créé from scratch.</p><div className="pj-foot"><div className="tags"><span className="tag tl2">Ubuntu</span><span className="tag tl2">DNS/DHCP</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </div>

              <div className="pj-card" style={{ cursor: 'default' }}>
                <div className="pj-vis" style={{ background: '#2D2A38' }}><div className="cat-b" style={{ background: 'rgba(155,130,195,.2)', color: '#9B82C3' }}>Cloud</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><path d="M15 35C15 25 30 20 30 30C30 20 45 25 45 35C50 35 50 45 45 45L15 45C10 45 10 35 15 35Z" stroke="#9B82C3" strokeWidth="1.5" fill="none" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Déploiement Infra Cloud Azure</h3><p className="pj-co">Neemba Togo · 2023</p><p className="pj-desc">Mise en place d'une architecture hybride avec Azure AD et synchronisation locale.</p><div className="pj-foot"><div className="tags"><span className="tag" style={{ color: '#9B82C3', background: 'rgba(155,130,195,.1)' }}>Azure</span><span className="tag" style={{ color: '#9B82C3', background: 'rgba(155,130,195,.1)' }}>M365</span></div></div></div>
              </div>

              <div className="pj-card" style={{ cursor: 'default' }}>
                <div className="pj-vis" style={{ background: '#382A2A' }}><div className="cat-b" style={{ background: 'rgba(195,130,130,.2)', color: '#C38282' }}>Infrastructure</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="15" stroke="#C38282" strokeWidth="1.5" fill="none" /><line x1="15" y1="30" x2="45" y2="30" stroke="#C38282" /><line x1="30" y1="15" x2="30" y2="45" stroke="#C38282" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Refonte Réseau LAN/WAN</h3><p className="pj-co">Projet Académique · 2022</p><p className="pj-desc">Conception et simulation d'une architecture réseau d'entreprise multi-sites sous GNS3.</p><div className="pj-foot"><div className="tags"><span className="tag" style={{ color: '#C38282', background: 'rgba(195,130,130,.1)' }}>Cisco</span><span className="tag" style={{ color: '#C38282', background: 'rgba(195,130,130,.1)' }}>GNS3</span></div></div></div>
              </div>

            </div>
          </section>
        </div>
      )}

      <ChatbotButton />
    </div>
  );
}

export default App;
