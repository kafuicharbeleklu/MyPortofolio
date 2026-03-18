import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackToTop from './components/BackToTop';
import ChatbotButton from './components/ChatbotButton';
import MobileNav from './components/MobileNav';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import LanguageToggle from './components/LanguageToggle';
import { getSkillsData, getTimelineData, getFormationData } from './data';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import { Language, t } from './translations';

type ReferenceContact = {
  initials: string;
  name: string;
  organization: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
};

type ProjectFilterKey =
  | 'all'
  | 'cybersecurity'
  | 'telecom'
  | 'network'
  | 'linux'
  | 'cloud'
  | 'infrastructure';

type ProjectTag = {
  label: string;
  className: string;
};

type ProjectCardData = {
  id: string;
  sortDate: number;
  title: Record<Language, string>;
  companyLine: Record<Language, string>;
  desc: Record<Language, string>;
  category: Record<Language, string>;
  categoryKey: Exclude<ProjectFilterKey, 'all'>;
  tags: ProjectTag[];
  background: string;
  accent: string;
  icon: 'shield' | 'signal' | 'domain' | 'server' | 'cloud' | 'grid';
  detailPage: boolean;
};

const renderProjectIcon = (icon: ProjectCardData['icon'], accent: string) => {
  switch (icon) {
    case 'shield':
      return (
        <svg width="45" height="45" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}>
          <path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke={accent} strokeWidth="2" fill="none" />
          <circle cx="45" cy="46" r="13" stroke={accent} strokeWidth="1.5" fill="none" />
          <circle cx="45" cy="46" r="5" fill={accent} opacity=".6" />
        </svg>
      );
    case 'signal':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <circle cx="30" cy="30" r="20" stroke={accent} strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="30" r="12" stroke={accent} strokeWidth="1" fill="none" />
          <circle cx="30" cy="30" r="5" stroke={accent} strokeWidth="1" fill="none" />
          <circle cx="30" cy="30" r="2" fill={accent} />
        </svg>
      );
    case 'domain':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <rect x="20" y="8" width="20" height="12" rx="2" stroke={accent} strokeWidth="1.5" fill="none" />
          <rect x="8" y="34" width="16" height="10" rx="2" stroke={accent} strokeWidth="1" fill="none" />
          <rect x="36" y="34" width="16" height="10" rx="2" stroke={accent} strokeWidth="1" fill="none" />
          <line x1="30" y1="20" x2="30" y2="34" stroke={accent} />
          <line x1="16" y1="28" x2="44" y2="28" stroke={accent} />
          <line x1="16" y1="28" x2="16" y2="34" stroke={accent} />
          <line x1="44" y1="28" x2="44" y2="34" stroke={accent} />
        </svg>
      );
    case 'server':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <rect x="10" y="16" width="40" height="8" rx="2" stroke={accent} strokeWidth="1.5" fill="none" />
          <rect x="10" y="28" width="40" height="8" rx="2" stroke={accent} strokeWidth="1" fill="none" />
          <circle cx="44" cy="20" r="2" fill={accent} />
          <line x1="18" y1="40" x2="42" y2="40" stroke={accent} />
          <line x1="30" y1="36" x2="30" y2="44" stroke={accent} />
        </svg>
      );
    case 'cloud':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <path d="M15 35C15 25 30 20 30 30C30 20 45 25 45 35C50 35 50 45 45 45L15 45C10 45 10 35 15 35Z" stroke={accent} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <circle cx="30" cy="30" r="15" stroke={accent} strokeWidth="1.5" fill="none" />
          <line x1="15" y1="30" x2="45" y2="30" stroke={accent} />
          <line x1="30" y1="15" x2="30" y2="45" stroke={accent} />
        </svg>
      );
  }
};

const projectCatalog: ProjectCardData[] = [
  {
    id: 'siem',
    sortDate: 202411,
    title: {
      FR: 'Déploiement SIEM / XDR Wazuh',
      EN: 'Wazuh SIEM / XDR Deployment',
    },
    companyLine: {
      FR: 'Neemba Togo · 2023-2024',
      EN: 'Neemba Togo · 2023-2024',
    },
    desc: {
      FR: "Déploiement complet d'une solution Wazuh sur l'ensemble du parc avec supervision centralisée et détection proactive.",
      EN: 'Complete Wazuh deployment across the environment with centralized monitoring and proactive detection.',
    },
    category: {
      FR: 'Cybersécurité',
      EN: 'Cybersecurity',
    },
    categoryKey: 'cybersecurity',
    tags: [
      { label: 'Wazuh', className: 'tc' },
      { label: 'SIEM', className: 'tc' },
      { label: 'XDR', className: 'tc' },
    ],
    background: '#2C3E2E',
    accent: '#D4956A',
    icon: 'shield',
    detailPage: true,
  },
  {
    id: 'moov',
    sortDate: 202412,
    title: {
      FR: 'Portabilité MOOV → Togocom',
      EN: 'MOOV → Togocom Portability',
    },
    companyLine: {
      FR: 'Neemba Togo · 2024',
      EN: 'Neemba Togo · 2024',
    },
    desc: {
      FR: 'Migration complète du réseau mobile avec supervision VSAT et continuité de service.',
      EN: 'Complete mobile network migration with VSAT monitoring and service continuity.',
    },
    category: {
      FR: 'Télécom',
      EN: 'Telecom',
    },
    categoryKey: 'telecom',
    tags: [
      { label: 'VSAT', className: 'tt' },
      { label: 'Migration', className: 'tt' },
    ],
    background: '#2B3A4A',
    accent: '#7BBFD0',
    icon: 'signal',
    detailPage: true,
  },
  {
    id: 'orabank',
    sortDate: 202210,
    title: {
      FR: 'Contrôleur de domaine Orabank',
      EN: 'Orabank Domain Controller',
    },
    companyLine: {
      FR: 'Orabank Togo · Stage 2022',
      EN: 'Orabank Togo · Internship 2022',
    },
    desc: {
      FR: 'Déploiement Windows Server AD, GPO et politiques de sécurité multi-agences.',
      EN: 'Windows Server AD deployment, GPO, and multi-branch security policies.',
    },
    category: {
      FR: 'Réseau',
      EN: 'Network',
    },
    categoryKey: 'network',
    tags: [
      { label: 'Windows Server', className: 'tr' },
      { label: 'AD', className: 'tr' },
    ],
    background: '#3A2C1E',
    accent: '#C8A85A',
    icon: 'domain',
    detailPage: true,
  },
  {
    id: 'biasa',
    sortDate: 202109,
    title: {
      FR: 'Services réseau Linux · BIASA',
      EN: 'Linux Network Services · BIASA',
    },
    companyLine: {
      FR: 'Clinique BIASA · Stage 2021',
      EN: 'BIASA Clinic · Internship 2021',
    },
    desc: {
      FR: 'DNS, DHCP, Apache et NAT sur Ubuntu Server avec réseau construit from scratch.',
      EN: 'DNS, DHCP, Apache, and NAT on Ubuntu Server with the network built from scratch.',
    },
    category: {
      FR: 'Linux',
      EN: 'Linux',
    },
    categoryKey: 'linux',
    tags: [
      { label: 'Ubuntu', className: 'tl2' },
      { label: 'DNS/DHCP', className: 'tl2' },
    ],
    background: '#2A3830',
    accent: '#7DC4A0',
    icon: 'server',
    detailPage: true,
  },
  {
    id: 'azure-infra',
    sortDate: 202307,
    title: {
      FR: 'Déploiement infra cloud Azure',
      EN: 'Azure Cloud Infrastructure Deployment',
    },
    companyLine: {
      FR: 'Neemba Togo · 2023',
      EN: 'Neemba Togo · 2023',
    },
    desc: {
      FR: "Mise en place d'une architecture hybride avec Azure AD et synchronisation locale.",
      EN: 'Deployment of a hybrid architecture with Azure AD and local synchronization.',
    },
    category: {
      FR: 'Cloud',
      EN: 'Cloud',
    },
    categoryKey: 'cloud',
    tags: [
      { label: 'Azure', className: 'tb' },
      { label: 'M365', className: 'tb' },
    ],
    background: '#2D2A38',
    accent: '#9B82C3',
    icon: 'cloud',
    detailPage: false,
  },
  {
    id: 'lan-wan',
    sortDate: 202209,
    title: {
      FR: 'Refonte réseau LAN/WAN',
      EN: 'LAN/WAN Network Redesign',
    },
    companyLine: {
      FR: 'Projet académique · 2022',
      EN: 'Academic project · 2022',
    },
    desc: {
      FR: "Conception et simulation d'une architecture réseau d'entreprise multi-sites sous GNS3.",
      EN: 'Design and simulation of a multi-site enterprise network architecture in GNS3.',
    },
    category: {
      FR: 'Infrastructure',
      EN: 'Infrastructure',
    },
    categoryKey: 'infrastructure',
    tags: [
      { label: 'Cisco', className: 'ts' },
      { label: 'GNS3', className: 'ts' },
    ],
    background: '#382A2A',
    accent: '#C38282',
    icon: 'grid',
    detailPage: false,
  },
];

function App() {
  const [activePage, setActivePage] = useState('main');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<ProjectFilterKey>('all');
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'FR';
    }

    const savedLang = window.localStorage.getItem('portfolio_lang');
    if (savedLang === 'FR' || savedLang === 'EN') {
      return savedLang;
    }

    return window.navigator.language.toLowerCase().startsWith('fr') ? 'FR' : 'EN';
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const v = t[lang];
  const skillsData = getSkillsData(lang);
  const timelineData = getTimelineData(lang);
  const formationData = getFormationData(lang);
  const educationSection =
    (v as any).education ??
    (lang === 'FR'
      ? {
          num: '05',
          title: 'Ma formation',
          subtitle:
            'Diplômes obtenus avec distinction dans les meilleures institutions de Lomé.',
        }
      : {
          num: '05',
          title: 'My Education',
          subtitle:
            'Degrees earned with distinction from leading institutions in Lomé.',
        });
  const referencesSection =
    (v as any).references ??
    (lang === 'FR'
      ? {
          num: '07',
          title: 'Mes références',
          subtitle: 'Références professionnelles disponibles sur demande.',
        }
      : {
          num: '07',
          title: 'My References',
          subtitle: 'Professional references and recommendation contacts.',
        });

  const referencesData: ReferenceContact[] = [
    {
      initials: 'YN',
      name: 'Yan NYAKU',
      organization: 'CFAO Mobility Togo',
      role: 'DSI',
      phoneDisplay: '+228 93 23 24 65',
      phoneHref: 'tel:+22893232465',
    },
    {
      initials: 'JK',
      name: 'Jerome KPETO',
      organization: 'CORIS BANK INTERNATIONAL TOGO',
      role: 'RSI',
      phoneDisplay: '+228 96 11 03 56',
      phoneHref: 'tel:+22896110356',
    },
    {
      initials: 'AK',
      name: 'Ange KOBLAN',
      organization: 'FINANCE AFRIQUE / Hub Abidjan',
      role: 'Responsable Regional Support IT',
      phoneDisplay: '+225 07 07 79 90 81',
      phoneHref: 'tel:+2250707799081',
    },
    {
      initials: 'ED',
      name: 'El Djiba Kolon DIALLO',
      organization: 'DSI - Support & Operations',
      role: 'Chef de projet / Administrateur Systemes et Reseaux',
      phoneDisplay: '+224 621 08 86 97',
      phoneHref: 'tel:+224621088697',
    },
    {
      initials: 'AD',
      name: 'Alfred Noel DEGBE',
      organization: 'Groupe Orabank',
      role: 'Ingenieur support informatique',
      phoneDisplay: '+228 90 54 13 91',
      phoneHref: 'tel:+22890541391',
    },
  ];
  const alphaCollator = new Intl.Collator(lang === 'FR' ? 'fr' : 'en', {
    numeric: true,
    sensitivity: 'base',
  });
  const sortAlphabetically = <T,>(items: T[], getValue: (item: T) => string) =>
    [...items].sort((a, b) => alphaCollator.compare(getValue(a), getValue(b)));
  const getSortedTags = (tags: ProjectTag[]) =>
    sortAlphabetically(tags, (tag) => tag.label);
  const sortedSkillsData = sortAlphabetically(skillsData, (skill) => skill.title);
  const sortedFormationData = sortAlphabetically(formationData, (item) => item.title);
  const sortedReferencesData = sortAlphabetically(referencesData, (reference) => reference.name);
  const bioExpertiseItems = sortAlphabetically(
    [
      {
        label: 'Wazuh Security Ambassador',
        className: 'bio-tag-link tag tc',
        href: 'https://wazuh.com/ambassadors/kafui-charbel-eklu/',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        ),
      },
      { label: 'Windows Server', className: 'tag tr' },
      { label: 'Active Directory', className: 'tag tr' },
      { label: 'Linux / Ubuntu', className: 'tag tl2' },
      { label: 'Réseaux / VSAT', className: 'tag tt' },
      { label: 'TCP/IP · Routage', className: 'tag tt' },
      { label: 'SIEM / XDR', className: 'tag tc' },
      { label: 'Python', className: 'tag tb' },
      { label: 'Bash · PowerShell', className: 'tag tb' },
      { label: 'Power BI / DAX', className: 'tag' },
      { label: 'Azure / M365', className: 'tag' },
      { label: 'SCCM / MECM', className: 'tag' },
    ],
    (item) => item.label
  );
  const projectFilters = [
    { key: 'all' as const, label: lang === 'FR' ? 'Tous' : 'All' },
    {
      key: 'cybersecurity' as const,
      label: lang === 'FR' ? 'Cybersécurité' : 'Cybersecurity',
    },
    { key: 'telecom' as const, label: lang === 'FR' ? 'Télécom' : 'Telecom' },
    { key: 'network' as const, label: lang === 'FR' ? 'Réseau' : 'Network' },
    { key: 'linux' as const, label: 'Linux' },
    { key: 'cloud' as const, label: 'Cloud' },
    {
      key: 'infrastructure' as const,
      label: lang === 'FR' ? 'Infrastructure' : 'Infrastructure',
    },
  ];
  const sortedProjectFilters = [
    projectFilters[0],
    ...sortAlphabetically(projectFilters.slice(1), (filter) => filter.label),
  ];
  const normalizedProjectSearch = projectSearch.trim().toLowerCase();
  const filteredProjects = projectCatalog
    .filter((project) => {
      const matchesFilter =
        projectFilter === 'all' || project.categoryKey === projectFilter;
      const searchableContent = [
        project.title[lang],
        project.companyLine[lang],
        project.desc[lang],
        project.category[lang],
        ...project.tags.map((tag) => tag.label),
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch =
        !normalizedProjectSearch || searchableContent.includes(normalizedProjectSearch);

      return matchesFilter && matchesSearch;
    })
    .sort(
      (a, b) =>
        b.sortDate - a.sortDate || alphaCollator.compare(a.title[lang], b.title[lang])
    );

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const withBase = (assetPath: string) =>
    `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}`;
  const getScrollBehavior = () => (prefersReducedMotion ? 'auto' : 'smooth');
  const getNavOffset = () => {
    const nav = document.querySelector('.nav');

    return nav instanceof HTMLElement ? nav.getBoundingClientRect().height + 16 : 96;
  };
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const targetTop =
      window.scrollY + element.getBoundingClientRect().top - getNavOffset();

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: getScrollBehavior(),
    });
  };

  useEffect(() => {
    if (activePage !== 'main') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = document.querySelectorAll('main section');
    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, [activePage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio_lang', lang);
    }
  }, [lang]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (activePage !== 'main') {
      setActivePage('main');
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      scrollToElement(id);
    }
  };

  const handleDiscoverProfile = () => scrollToSection('about');
  const handleViewProjects = () => scrollToSection('projets');

  const showDetail = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  const backToMain = () => {
    setActivePage('main');
    setTimeout(() => {
      scrollToElement('projets');
    }, 100);
  };

  return (
    <div className="app" id="app">
      {/* ====== MAIN PAGE ====== */}
      <main className={`page ${activePage === 'main' ? 'active' : ''}`} id="page-main">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="hamburger nav-control-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={lang === 'FR' ? 'Ouvrir le menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-links">
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{v.nav.about}</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} aria-current={activeSection === 'skills' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>{v.nav.skills}</a></li>
            <li><a href="#parcours" className={activeSection === 'parcours' ? 'active' : ''} aria-current={activeSection === 'parcours' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('parcours'); }}>{v.nav.experience}</a></li>
            <li><a href="#formation" className={activeSection === 'formation' ? 'active' : ''} aria-current={activeSection === 'formation' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('formation'); }}>{v.nav.education}</a></li>
            <li><a href="#projets" className={activeSection === 'projets' ? 'active' : ''} aria-current={activeSection === 'projets' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('projets'); }}>{v.nav.projects}</a></li>
            <li><a href="#refs" className={activeSection === 'refs' ? 'active' : ''} aria-current={activeSection === 'refs' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('refs'); }}>{v.nav.references}</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{v.nav.contact}</a></li>
          </ul>
          <div className="nav-tag">{lang === 'FR' ? 'Lomé, Togo' : 'Lome, Togo'}</div>
        </nav>
        <MobileNav lang={lang} 
          isMobileMenuOpen={isMobileMenuOpen} 
          activeSection={activeSection} 
          toggleMobileMenu={toggleMobileMenu} 
          scrollToSection={scrollToSection} 
        />

        <Hero lang={lang} 
          onDiscoverProfile={handleDiscoverProfile} 
          onViewProjects={handleViewProjects} 
        />

        <About lang={lang} onReadMore={() => showDetail('biography')} />

        {/* CE QUE JE MAÎTRISE */}
        <section className="sec" id="skills" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">{v.skills.num}</span>
            <h2 className="sec-ttl">{v.skills.title}.</h2>
            <span className="sec-sub">{(v.skills as any).subtitle ?? v.skills.sub}</span>
          </div>
          <div className="skills-grid">
            {sortedSkillsData.map((skill, i) => (
              <div className="skill-card" key={i}>
                <div className="skill-icon" style={{ background: skill.bg }}>
                  {skill.icon}
                </div>
                <h4>{skill.title}</h4>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MON PARCOURS */}
        <section className="sec" id="parcours">
          <div className="sec-hdr">
            <span className="sec-num">{v.experience.num}</span>
            <h2 className="sec-ttl">{v.experience.title}.</h2>
            <span className="sec-sub">{(v.experience as any).subtitle ?? v.experience.sub}</span>
          </div>
          <div className="timeline">
            {getTimelineData(lang).map((item, i) => (
              <div className={`tl-item ${item.isCurrent ? 'current' : ''}`} key={i}>
                <p className="tl-date">{item.date}</p>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-co">{item.company}</p>
                <p className="tl-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MA FORMATION */}
        <section className="sec" id="formation" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">{educationSection.num}</span>
            <h2 className="sec-ttl">{educationSection.title}.</h2>
            <span className="sec-sub">{educationSection.subtitle}</span>
          </div>
          <div className="edu-grid">
            {sortedFormationData.map((item, i) => (
              <div className="edu-card" key={i}>
                <p className="edu-year">{item.year}</p>
                <h3 className="edu-title">{item.title}</h3>
                <p className="edu-school" dangerouslySetInnerHTML={{ __html: item.school }}></p>
                {item.gradeNode}
              </div>
            ))}
          </div>
        </section>

        {/* MES RÉALISATIONS */}
        <Projects lang={lang}
          onProjectClick={showDetail}
          onViewAll={() => {
            setActivePage('all-projects');
            window.scrollTo({ top: 0, behavior: getScrollBehavior() });
          }}
        />

        <section className="sec" id="refs" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">{referencesSection.num}</span>
            <h2 className="sec-ttl">{referencesSection.title}.</h2>
            <span className="sec-sub">{referencesSection.subtitle}</span>
          </div>
          <div className="ref-grid">
            {sortedReferencesData.map((reference) => (
              <div className="ref-card" key={reference.phoneHref}>
                <div className="ref-av">{reference.initials}</div>
                <p className="ref-name">{reference.name}</p>
                <p className="ref-org">{reference.organization}</p>
                <p className="ref-role">{reference.role}</p>
                <p className="ref-contact">
                  <a className="ref-contact-link" href={reference.phoneHref}>
                    {reference.phoneDisplay}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ME CONTACTER */}
        <Contact lang={lang} />

        {/* TOP OF PAGE BUTTON */}
        <BackToTop />

        {/* FOOTER */}
        <Footer lang={lang} onNavigate={scrollToSection} />
      </main>{/* end page-main */}

      {/* ====== DETAIL PAGES ====== */}

      {/* SIEM */}
      <div className={`page ${activePage === 'siem' ? 'active' : ''}`} id="page-siem">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="nav-back nav-control-btn"
            onClick={backToMain}
          >
            ← Retour aux projets
          </button>
          <div className="nav-tag">Cybersécurité</div>
        </nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2C3E2E' }}><svg width="100" height="100" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}><path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke="#D4956A" strokeWidth="2" fill="none" /><circle cx="45" cy="46" r="14" stroke="#D4956A" strokeWidth="1.5" fill="none" /><circle cx="45" cy="46" r="6" fill="#D4956A" opacity=".5" /><line x1="45" y1="22" x2="45" y2="32" stroke="#D4956A" /><line x1="45" y1="60" x2="45" y2="70" stroke="#D4956A" /><line x1="21" y1="46" x2="31" y2="46" stroke="#D4956A" /><line x1="59" y1="46" x2="69" y2="46" stroke="#D4956A" /></svg></div>
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
          <div className="rel">
            <h3 className="rel">Projets similaires</h3>
            <div className="rel-grid" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('orabank')}
                aria-label="Voir le projet Contrôleur de Domaine Orabank"
              >
                <h4>Contrôleur de Domaine Orabank</h4>
                <p>Orabank · Réseau entreprise</p>
              </button>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('moov')}
                aria-label="Voir le projet Portabilité MOOV vers Togocom"
              >
                <h4>Portabilité MOOV → Togocom</h4>
                <p>Neemba Togo · Télécom</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOOV */}
      <div className={`page ${activePage === 'moov' ? 'active' : ''}`} id="page-moov">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="nav-back nav-control-btn"
            onClick={backToMain}
          >
            ← Retour aux projets
          </button>
          <div className="nav-tag">Télécom</div>
        </nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2B3A4A' }}><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="22" stroke="#7BBFD0" strokeWidth="1.5" fill="none" /><circle cx="30" cy="30" r="15" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="8" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="3" fill="#7BBFD0" /></svg></div>
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
          <div className="rel">
            <h3>Projets similaires</h3>
            <div className="rel-grid" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('siem')}
                aria-label="Voir le projet Déploiement SIEM XDR Wazuh"
              >
                <h4>Déploiement SIEM/XDR Wazuh</h4>
                <p>Neemba Togo · Cybersécurité</p>
              </button>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('biasa')}
                aria-label="Voir le projet Services Réseau Linux BIASA"
              >
                <h4>Services Réseau Linux · BIASA</h4>
                <p>Clinique BIASA · Infrastructure</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ORABANK */}
      <div className={`page ${activePage === 'orabank' ? 'active' : ''}`} id="page-orabank">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="nav-back nav-control-btn"
            onClick={backToMain}
          >
            ← Retour aux projets
          </button>
          <div className="nav-tag">Réseau Entreprise</div>
        </nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#3A2C1E' }}><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="20" y="6" width="20" height="14" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" /><rect x="6" y="36" width="18" height="12" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><rect x="36" y="36" width="18" height="12" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><line x1="30" y1="20" x2="30" y2="36" stroke="#C8A85A" strokeWidth="1.2" /><line x1="15" y1="28" x2="45" y2="28" stroke="#C8A85A" /><line x1="15" y1="28" x2="15" y2="36" stroke="#C8A85A" /><line x1="45" y1="28" x2="45" y2="36" stroke="#C8A85A" /></svg></div>
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
          <div className="rel">
            <h3>Projets similaires</h3>
            <div className="rel-grid" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('siem')}
                aria-label="Voir le projet Déploiement SIEM XDR Wazuh"
              >
                <h4>Déploiement SIEM/XDR Wazuh</h4>
                <p>Neemba Togo · Cybersécurité</p>
              </button>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('biasa')}
                aria-label="Voir le projet Services Réseau Linux BIASA"
              >
                <h4>Services Réseau Linux · BIASA</h4>
                <p>Clinique BIASA · Infrastructure</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BIASA */}
      <div className={`page ${activePage === 'biasa' ? 'active' : ''}`} id="page-biasa">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="nav-back nav-control-btn"
            onClick={backToMain}
          >
            ← Retour aux projets
          </button>
          <div className="nav-tag">Linux · Infrastructure</div>
        </nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: '#2A3830' }}><svg width="100" height="100" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="8" y="14" width="44" height="10" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" /><rect x="8" y="28" width="44" height="10" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" /><circle cx="46" cy="19" r="2.5" fill="#7DC4A0" /><line x1="30" y1="42" x2="30" y2="50" stroke="#7DC4A0" strokeWidth="1.2" /><line x1="18" y1="50" x2="42" y2="50" stroke="#7DC4A0" strokeWidth="1.2" /></svg></div>
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
          <div className="rel">
            <h3>Projets similaires</h3>
            <div className="rel-grid" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('orabank')}
                aria-label="Voir le projet Contrôleur de Domaine Orabank"
              >
                <h4>Contrôleur de Domaine Orabank</h4>
                <p>Orabank · Réseau entreprise</p>
              </button>
              <button
                type="button"
                className="rel-card card-action"
                onClick={() => showDetail('siem')}
                aria-label="Voir le projet Déploiement SIEM XDR Wazuh"
              >
                <h4>Déploiement SIEM/XDR Wazuh</h4>
                <p>Neemba Togo · Cybersécurité</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BIOGRAPHIE */}
      <div className={`page ${activePage === 'biography' ? 'active' : ''}`} id="page-biography">
        <nav className="nav">
          <button
            type="button"
            className="nav-logo nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            K · E
          </button>
          <button
            type="button"
            className="nav-back nav-control-btn"
            onClick={() => scrollToSection('hero')}
          >
            ← Retour à l'accueil
          </button>
          <div className="nav-tag">Biographie</div>
        </nav>

        {/* Bio Hero — Photo + Identity */}
        <section className="bio-hero">
          <div className="bio-hero-photo">
            <img src={withBase('_KSP4314.jpg')} alt="Kafui Charbel Eklu" loading="lazy" />
          </div>
          <div className="bio-hero-info">
            <p className="bio-hero-eyebrow">Biographie</p>
            <h1 className="bio-hero-name">EKLU Kafui<br />Charbel</h1>
            <p className="bio-hero-role">Administrateur Digital Workplace & Infrastructure</p>
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
              <p className="bio-story-lead">Professionnel togolais de l'IT, j'allie rigueur technique, innovation et créativité.</p>
              <p>Spécialisé en <strong>Digital Workplace et optimisation des environnements numériques</strong>, j'ai développé une forte capacité à concevoir des solutions efficaces dans des environnements dynamiques, en combinant <strong>adaptabilité, rigueur technique et sens de l'innovation</strong>.</p>
              <p>Mon immersion chez <strong>Orabank</strong> a été le catalyseur de mon expertise. Confronté à l'exigence d'un environnement bancaire critique, j'ai maîtrisé en un temps record l'architecture Windows Server (Active Directory, DFS, GPO, WDS). Ce qui était un défi est devenu une compétence socle.</p>
              <p>Passionné par les technologies émergentes, je m'intéresse particulièrement à l'intersection entre <strong>cybersécurité et intelligence artificielle</strong>, avec l'ambition de développer des solutions intelligentes capables d'anticiper et de répondre aux menaces modernes.</p>
              <p>Au-delà de mon expertise technique, je développe également une dimension créative à travers la <strong>musique Afrobeats</strong>, où j'explore des thématiques humaines et culturelles en français et en éwé — un profil rare qui allie analyse, créativité et sensibilité.</p>
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
            <div className="bio-philosophy-card">
              <div className="bio-philosophy-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18V13a3 3 0 0 1 6 0v5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 21h14" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <h4>Tech + Créatif</h4>
              <p>Mon profil hybride — technique et artistique — me permet d'apporter une vision unique, où rigueur et créativité se renforcent mutuellement.</p>
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
            {bioExpertiseItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={item.className}
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span key={item.label} className={item.className}>
                  {item.label}
                </span>
              )
            )}
          </div>
        </section>

        {/* Bio CTA */}
        <section className="bio-cta">
          <a href={withBase('CV_EKLU_Kafui_Charbel_Admin_Systeme.pdf')} download className="kp-btn-dark bio-cta-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Télécharger mon CV
          </a>
          <button type="button" className="kp-btn-line" onClick={() => scrollToSection('contact')}>Me contacter →</button>
        </section>
      </div>

      {/* ====== ALL PROJECTS PAGE ====== */}
      {activePage === 'all-projects' && (
        <div className="page active" id="page-all-projects">
          <nav className="nav">
            <button
              type="button"
              className="nav-logo nav-control-btn"
              onClick={() => scrollToSection('hero')}
            >
              K · E
            </button>
            <button
              type="button"
              className="nav-back nav-control-btn"
              onClick={backToMain}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Retour à l'accueil
            </button>
          </nav>
          <section className="sec projects-page" style={{ minHeight: '80vh', background: '#F5F1EC' }}>
            <div className="sec-hdr">
              <span className="sec-num">{v.projects.num}</span>
              <h2 className="sec-ttl">
                {lang === 'FR' ? 'Tous mes projets.' : 'All my projects.'}
              </h2>
              <span className="sec-sub">
                {lang === 'FR'
                  ? 'Explore mes réalisations par mot-clé, domaine ou environnement technique.'
                  : 'Explore my work by keyword, domain, or technical environment.'}
              </span>
            </div>

            <div className="projects-tools">
              <label className="projects-search">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m20 20-3.5-3.5"></path>
                </svg>
                <input
                  type="search"
                  value={projectSearch}
                  onChange={(event) => setProjectSearch(event.target.value)}
                  placeholder={
                    lang === 'FR'
                      ? 'Rechercher un projet, une techno, un client...'
                      : 'Search by project, stack, client...'
                  }
                  aria-label={
                    lang === 'FR' ? 'Rechercher dans les projets' : 'Search projects'
                  }
                />
              </label>

              <div
                className="project-filter-bar"
                role="group"
                aria-label={lang === 'FR' ? 'Filtres de projet' : 'Project filters'}
              >
                {sortedProjectFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`project-filter-btn ${projectFilter === filter.key ? 'active' : ''}`}
                    onClick={() => setProjectFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <p className="projects-results">
                {lang === 'FR'
                  ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} affiché${filteredProjects.length > 1 ? 's' : ''}`
                  : `${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''} shown`}
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="pj-grid pj-grid-all">
                {filteredProjects.map((project) =>
                  project.detailPage ? (
                    <button
                      key={project.id}
                      type="button"
                      className="pj-card card-action"
                      onClick={() => showDetail(project.id)}
                      aria-label={
                        lang === 'FR'
                          ? `Voir le détail du projet ${project.title.FR}`
                          : `View details of the ${project.title.EN} project`
                      }
                    >
                      <div className="pj-vis" style={{ background: project.background }}>
                        <div
                          className="cat-b"
                          style={{
                            background: `${project.accent}33`,
                            color: project.accent,
                          }}
                        >
                          {project.category[lang]}
                        </div>
                        {renderProjectIcon(project.icon, project.accent)}
                      </div>
                      <div className="pj-body">
                        <h3 className="pj-title">{project.title[lang]}</h3>
                        <p className="pj-co">{project.companyLine[lang]}</p>
                        <p className="pj-desc">{project.desc[lang]}</p>
                        <div className="pj-foot">
                          <div className="tags">
                            {getSortedTags(project.tags).map((tag) => (
                              <span key={`${project.id}-${tag.label}`} className={`tag ${tag.className}`}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                          <span className="pj-arrow">→</span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <article key={project.id} className="pj-card project-card-static">
                      <div className="pj-vis" style={{ background: project.background }}>
                        <div
                          className="cat-b"
                          style={{
                            background: `${project.accent}33`,
                            color: project.accent,
                          }}
                        >
                          {project.category[lang]}
                        </div>
                        {renderProjectIcon(project.icon, project.accent)}
                      </div>
                      <div className="pj-body">
                        <h3 className="pj-title">{project.title[lang]}</h3>
                        <p className="pj-co">{project.companyLine[lang]}</p>
                        <p className="pj-desc">{project.desc[lang]}</p>
                        <div className="pj-foot">
                          <div className="tags">
                            {getSortedTags(project.tags).map((tag) => (
                              <span key={`${project.id}-${tag.label}`} className={`tag ${tag.className}`}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                          <span className="project-card-note">
                            {lang === 'FR' ? 'Aperçu' : 'Preview'}
                          </span>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            ) : (
              <div className="projects-empty">
                <h3>{lang === 'FR' ? 'Aucun projet trouvé.' : 'No matching project found.'}</h3>
                <p>
                  {lang === 'FR'
                    ? 'Essaie un autre mot-clé ou retire un filtre pour élargir la liste.'
                    : 'Try another keyword or remove a filter to broaden the list.'}
                </p>
              </div>
            )}
          </section>
          {false && (
          <section className="sec" style={{ minHeight: '80vh', background: '#F5F1EC' }}>
            <div className="sec-hdr">
              <span className="sec-num">06</span>
              <h2 className="sec-ttl">Tous mes projets.</h2>
              <span className="sec-sub">L'ensemble de mes réalisations techniques et académiques.</span>
            </div>
            <div className="pj-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(18.75rem, 1fr))', gap: '2rem' }}>
              
              <button
                type="button"
                className="pj-card card-action"
                onClick={() => showDetail('siem')}
                aria-label="Voir le détail du projet Déploiement SIEM XDR Wazuh"
              >
                <div className="pj-vis" style={{ background: '#2C3E2E' }}><div className="cat-b" style={{ background: 'rgba(212,149,106,.2)', color: '#D4956A' }}>Cybersécurité</div><svg width="45" height="45" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}><path d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z" stroke="#D4956A" strokeWidth="2" fill="none" /><circle cx="45" cy="46" r="13" stroke="#D4956A" strokeWidth="1.5" fill="none" /><circle cx="45" cy="46" r="5" fill="#D4956A" opacity=".6" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Déploiement SIEM / XDR Wazuh</h3><p className="pj-co">Neemba Togo · 2023–2024</p><p className="pj-desc">Déploiement complet d'une solution SIEM/XDR Wazuh sur l'ensemble du parc.</p><div className="pj-foot"><div className="tags"><span className="tag tc">Wazuh</span><span className="tag tc">SIEM</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </button>

              <button
                type="button"
                className="pj-card card-action"
                onClick={() => showDetail('moov')}
                aria-label="Voir le détail du projet Portabilité MOOV vers Togocom"
              >
                <div className="pj-vis" style={{ background: '#2B3A4A' }}><div className="cat-b" style={{ background: 'rgba(123,191,208,.2)', color: '#7BBFD0' }}>Télécom</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><circle cx="30" cy="30" r="20" stroke="#7BBFD0" strokeWidth="1.5" fill="none" /><circle cx="30" cy="30" r="12" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="5" stroke="#7BBFD0" strokeWidth="1" fill="none" /><circle cx="30" cy="30" r="2" fill="#7BBFD0" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Portabilité MOOV → Togocom</h3><p className="pj-co">Neemba Togo · 2024</p><p className="pj-desc">Migration complète réseau mobile avec supervision VSAT et zéro interruption.</p><div className="pj-foot"><div className="tags"><span className="tag tt">VSAT</span><span className="tag tt">Migration</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </button>

              <button
                type="button"
                className="pj-card card-action"
                onClick={() => showDetail('orabank')}
                aria-label="Voir le détail du projet Contrôleur de Domaine Orabank"
              >
                <div className="pj-vis" style={{ background: '#3A2C1E' }}><div className="cat-b" style={{ background: 'rgba(200,168,90,.2)', color: '#C8A85A' }}>Réseau</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="20" y="8" width="20" height="12" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" /><rect x="8" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><rect x="36" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" /><line x1="30" y1="20" x2="30" y2="34" stroke="#C8A85A" /><line x1="16" y1="28" x2="44" y2="28" stroke="#C8A85A" /><line x1="16" y1="28" x2="16" y2="34" stroke="#C8A85A" /><line x1="44" y1="28" x2="44" y2="34" stroke="#C8A85A" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Contrôleur de Domaine Orabank</h3><p className="pj-co">Orabank Togo · Stage 2022</p><p className="pj-desc">Windows Server AD, GPO et politiques de sécurité multi-agences.</p><div className="pj-foot"><div className="tags"><span className="tag tr">Windows Server</span><span className="tag tr">AD</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </button>

              <button
                type="button"
                className="pj-card card-action"
                onClick={() => showDetail('biasa')}
                aria-label="Voir le détail du projet Services Réseau Linux BIASA"
              >
                <div className="pj-vis" style={{ background: '#2A3830' }}><div className="cat-b" style={{ background: 'rgba(125,196,160,.2)', color: '#7DC4A0' }}>Linux</div><svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}><rect x="10" y="16" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" /><rect x="10" y="28" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" /><circle cx="44" cy="20" r="2" fill="#7DC4A0" /><line x1="18" y1="40" x2="42" y2="40" stroke="#7DC4A0" /><line x1="30" y1="36" x2="30" y2="44" stroke="#7DC4A0" /></svg></div>
                <div className="pj-body"><h3 className="pj-title">Services Réseau Linux · BIASA</h3><p className="pj-co">Clinique BIASA · Stage 2021</p><p className="pj-desc">DNS, DHCP, Apache, NAT sur Ubuntu Server — réseau créé from scratch.</p><div className="pj-foot"><div className="tags"><span className="tag tl2">Ubuntu</span><span className="tag tl2">DNS/DHCP</span></div><span style={{ color: '#B0A496', fontSize: '0.9375rem' }}>→</span></div></div>
              </button>

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
          )}
        </div>
      )}

      <LanguageToggle lang={lang} onToggle={setLang} />
      <ChatbotButton />
    </div>
  );
}

export default App;
