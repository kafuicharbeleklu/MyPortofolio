import React, { useState, useEffect, useRef } from 'react';
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
import { assetPaths, withBaseAsset } from './config/assets';
import { getSkillsData, getTimelineData, getFormationData } from './data';
import useLightbox from './hooks/useLightbox';
import useLocalRouting, {
  createIsDetailPage,
  isNavigableSection,
} from './hooks/useLocalRouting';
import useMobileScrollDots from './hooks/useMobileScrollDots';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import useProjectLoader from './hooks/useProjectLoader';
import { Language, t } from './translations';
import type {
  PaginationToken,
  ProjectCardData,
  ProjectFilterKey,
  ProjectTag,
  ReferenceContact,
  SectionWithSubcopy,
  StructuredProjectConfig,
  StructuredProjectData,
  TranslationPageSections,
} from './types/portfolio';

const getProjectsPerPage = () => {
  if (typeof window === 'undefined') {
    return 6;
  }

  if (window.innerWidth >= 1440) {
    return 9;
  }

  if (window.innerWidth >= 1024) {
    return 6;
  }

  if (window.innerWidth >= 768) {
    return 4;
  }

  return 3;
};

const buildPaginationTokens = (
  currentPage: number,
  totalPages: number
): PaginationToken[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis-right', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      'ellipsis-left',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-right',
    totalPages,
  ];
};

const structuredProjectConfigs: Record<string, StructuredProjectConfig> = {
  automate: {
    dataPath: 'projects/automate/projects_data.json',
    client: {
      FR: 'Power Platform / Microsoft 365',
      EN: 'Power Platform / Microsoft 365',
    },
    role: {
      FR: 'Conception de workflow et logique de reporting',
      EN: 'Workflow design and reporting logic',
    },
    environment: {
      FR: 'Power Automate · Outlook · Excel Online',
      EN: 'Power Automate · Outlook · Excel Online',
    },
    fallbackStatus: {
      FR: 'Operationnel',
      EN: 'Operational',
    },
    relatedIds: ['azure-infra', 'siem'],
  },
  'azure-infra': {
    dataPath: 'projects/azure-infra/projects_data.json',
    client: {
      FR: 'Microsoft 365 / Azure AD',
      EN: 'Microsoft 365 / Azure AD',
    },
    role: {
      FR: 'Conception BI, modele semantique et integration Graph',
      EN: 'BI design, semantic model, and Graph integration',
    },
    environment: {
      FR: 'Power BI · Graph API · DAX',
      EN: 'Power BI · Graph API · DAX',
    },
    fallbackStatus: {
      FR: 'Termine',
      EN: 'Completed',
    },
    relatedIds: ['automate', 'wisignal'],
  },
  wisignal: {
    dataPath: 'projects/wisignal/projects_data.json',
    client: {
      FR: 'Neemba CAT Togo',
      EN: 'Neemba CAT Togo',
    },
    role: {
      FR: 'Conception produit et logique de simulation radio',
      EN: 'Product design and radio simulation logic',
    },
    environment: {
      FR: 'HTML · CSS · JavaScript · Canvas',
      EN: 'HTML · CSS · JavaScript · Canvas',
    },
    fallbackStatus: {
      FR: 'Termine',
      EN: 'Completed',
    },
    relatedIds: ['moov', 'azure-infra'],
  },
  printtrack: {
    dataPath: 'projects/printtrack/projects_data.json',
    client: {
      FR: 'Application interne de gestion des consommables',
      EN: 'Internal consumables management app',
    },
    role: {
      FR: 'Conception front-end et logique metier stock/couts',
      EN: 'Front-end design and stock/cost business logic',
    },
    environment: {
      FR: 'React · TypeScript · Vite',
      EN: 'React · TypeScript · Vite',
    },
    fallbackStatus: {
      FR: 'MVP',
      EN: 'MVP',
    },
    relatedIds: ['tracker', 'smartprocure'],
  },
  smartprocure: {
    dataPath: 'projects/smartprocure/projects_data.json',
    client: {
      FR: 'Aide a la decision achats assistee par IA',
      EN: 'AI-assisted procurement decision support',
    },
    role: {
      FR: 'Solo developer',
      EN: 'Solo developer',
    },
    environment: {
      FR: 'React · Gemini API · local-first',
      EN: 'React · Gemini API · local-first',
    },
    fallbackStatus: {
      FR: 'MVP',
      EN: 'MVP',
    },
    relatedIds: ['printtrack', 'tracker'],
  },
  tracker: {
    dataPath: 'projects/tracker/projects_data.json',
    client: {
      FR: 'Pilotage parc IT et operations internes',
      EN: 'IT fleet and internal operations tracking',
    },
    role: {
      FR: 'Solo fullstack developer',
      EN: 'Solo fullstack developer',
    },
    environment: {
      FR: 'React · Node.js · Azure AD',
      EN: 'React · Node.js · Azure AD',
    },
    fallbackStatus: {
      FR: 'En cours',
      EN: 'In progress',
    },
    relatedIds: ['printtrack', 'smartprocure'],
  },
  mfa: {
    dataPath: 'projects/mfa/projects_data.json',
    client: {
      FR: 'Projet personnel de durcissement Ubuntu',
      EN: 'Personal Ubuntu hardening project',
    },
    role: {
      FR: 'Documentation et mise en oeuvre',
      EN: 'Implementation and technical documentation',
    },
    environment: {
      FR: 'Ubuntu · PAM · OpenSSH',
      EN: 'Ubuntu · PAM · OpenSSH',
    },
    fallbackStatus: {
      FR: 'Termine',
      EN: 'Completed',
    },
    relatedIds: ['siem', 'ubuntu_ldap'],
    resourceLinks: [
      {
        href: 'projects/mfa/exports/rapport_mfa.pdf',
        label: {
          FR: 'Rapport PDF',
          EN: 'PDF report',
        },
      },
    ],
  },
  ubuntu_ldap: {
    dataPath: 'projects/ubuntu_ldap/projects_data.json',
    client: {
      FR: 'Projet personnel Active Directory sous Ubuntu',
      EN: 'Personal Ubuntu Active Directory project',
    },
    role: {
      FR: 'Conception, configuration et documentation',
      EN: 'Design, configuration, and documentation',
    },
    environment: {
      FR: 'Ubuntu · Samba AD · Kerberos',
      EN: 'Ubuntu · Samba AD · Kerberos',
    },
    fallbackStatus: {
      FR: 'Termine',
      EN: 'Completed',
    },
    relatedIds: ['orabank', 'mfa'],
    resourceLinks: [
      {
        href: 'projects/ubuntu_ldap/exports/rapport_ldap.pdf',
        label: {
          FR: 'Rapport PDF',
          EN: 'PDF report',
        },
      },
    ],
  },
  postgresql_ssl: {
    dataPath: 'projects/postgresql_ssl/projects_data.json',
    client: {
      FR: 'Projet personnel PostgreSQL sous Windows Server',
      EN: 'Personal PostgreSQL project on Windows Server',
    },
    role: {
      FR: 'Configuration SSL/TLS et securisation des acces',
      EN: 'SSL/TLS setup and access hardening',
    },
    environment: {
      FR: 'PostgreSQL · Windows Server · OpenSSL',
      EN: 'PostgreSQL · Windows Server · OpenSSL',
    },
    fallbackStatus: {
      FR: 'Termine',
      EN: 'Completed',
    },
    relatedIds: ['mfa', 'ubuntu_ldap'],
  },
};

type StructuredProjectId = keyof typeof structuredProjectConfigs;
const structuredProjectIds = Object.keys(
  structuredProjectConfigs
) as StructuredProjectId[];
const isDetailPage = createIsDetailPage(structuredProjectIds);

const getSectionSubcopy = (section: SectionWithSubcopy) =>
  section.subtitle ?? section.sub ?? '';

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
    categoryKey: 'network',
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
    categoryKey: 'infrastructure',
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
    categoryKey: 'network',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<ProjectFilterKey>('all');
  const [projectPage, setProjectPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(() => getProjectsPerPage());
  const [isProjectFilterMenuOpen, setIsProjectFilterMenuOpen] = useState(false);
  const [referenceCarouselIndex, setReferenceCarouselIndex] = useState(0);
  const [desktopReferencePage, setDesktopReferencePage] = useState(0);
  const [referenceCarouselOffset, setReferenceCarouselOffset] = useState(0);
  const [detailCarouselIndex, setDetailCarouselIndex] = useState<Record<string, number>>({});
  const [detailCarouselOffset, setDetailCarouselOffset] = useState<Record<string, number>>({});
  const referenceCarouselRef = useRef<HTMLDivElement | null>(null);
  const detailCarouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const projectFilterMenuRef = useRef<HTMLDivElement | null>(null);
  const allProjectsSectionRef = useRef<HTMLElement | null>(null);
  const carouselTouchStartX = useRef<Record<string, number | null>>({});
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
  const { projects: structuredProjectData, loadProjectDetail } = useProjectLoader(
    structuredProjectConfigs,
    withBaseAsset
  );
  const {
    lightbox: projectImageLightbox,
    openLightbox: openProjectImageLightbox,
    closeLightbox: closeProjectImageLightbox,
    stepLightbox: stepProjectImageLightbox,
    goToLightbox: goToProjectImageLightbox,
  } = useLightbox();
  const v = t[lang];
  const typedSections = v as TranslationPageSections;
  const skillsData = getSkillsData(lang);
  const timelineData = getTimelineData(lang);
  const formationData = getFormationData(lang);
  const educationSection =
    typedSections.education ??
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
    typedSections.references ??
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
      phones: [{ display: '+228 93 23 24 65', href: 'tel:+22893232465' }],
    },
    {
      initials: 'JK',
      name: 'Jerome KPETO',
      organization: 'CORIS BANK INTERNATIONAL TOGO',
      role: 'RSI',
      phones: [{ display: '+228 96 11 03 56', href: 'tel:+22896110356' }],
    },
    {
      initials: 'AK',
      name: 'Ange KOBLAN',
      organization: 'FINANCE AFRIQUE / Hub Abidjan',
      role: 'Responsable Regional Support IT',
      phones: [{ display: '+225 07 07 79 90 81', href: 'tel:+2250707799081' }],
    },
    {
      initials: 'ED',
      name: 'El Djiba Kolon DIALLO',
      organization: 'DSI - Support & Operations',
      role: 'Chef de projet / Administrateur Systemes et Reseaux',
      phones: [{ display: '+224 621 08 86 97', href: 'tel:+224621088697' }],
    },
    {
      initials: 'AD',
      name: 'Alfred Noel DEGBE',
      organization: 'Groupe Orabank',
      role: 'Ingenieur support informatique',
      phones: [{ display: '+228 90 54 13 91', href: 'tel:+22890541391' }],
    },
    {
      initials: 'AK',
      name: 'Afi KOSSI',
      organization: 'Direction SSE Benin | Togo',
      role: 'Coordinatrice SSE Benin | Togo',
      phones: [{ display: '+228 92 10 48 16', href: 'tel:+22892104816' }],
    },
    {
      initials: 'BM',
      name: 'Baboyime MAEBENA',
      organization: 'Ressources Humaines',
      role: 'Responsable RH Benin',
      phones: [{ display: '+228 91 57 49 04', href: 'tel:+22891574904' }],
    },
    {
      initials: 'AK',
      name: 'Ankou KOUNTA',
      organization: 'Logistique',
      role: 'Responsable Logistique',
      phones: [{ display: '+228 99 67 01 84', href: 'tel:+22899670184' }],
    },
    {
      initials: 'DS',
      name: 'Desire Francois SAVADOGO',
      organization: 'DSI - Support & Operations',
      role: 'Expert Systemes et Reseaux',
      phones: [{ display: '+226 01 14 62 66', href: 'tel:+22601146266' }],
    },
    {
      initials: 'ON',
      name: 'Ousseni NAITE',
      organization: 'DSI - Cybersecurite / GRC',
      role: 'Responsable GRC',
      phones: [{ display: '+226 70 94 12 14', href: 'tel:+22670941214' }],
    },
  ];
  const alphaCollator = new Intl.Collator(lang === 'FR' ? 'fr' : 'en', {
    numeric: true,
    sensitivity: 'base',
  });
  const sortAlphabetically = <T,>(items: T[], getValue: (item: T) => string) =>
    [...items].sort((a, b) => alphaCollator.compare(getValue(a), getValue(b)));
  const sortByDateDesc = <T extends { sortDate: string }>(items: T[]) =>
    [...items].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());
  const chunkItems = <T,>(items: T[], size: number) => {
    const chunks: T[][] = [];

    for (let index = 0; index < items.length; index += size) {
      chunks.push(items.slice(index, index + size));
    }

    return chunks;
  };
  const getSortedTags = (tags: ProjectTag[]) =>
    sortAlphabetically(tags, (tag) => tag.label);
  const sortedSkillsData = sortAlphabetically(skillsData, (skill) => skill.title);
  const sortedTimelineData = sortByDateDesc(timelineData);
  const sortedFormationData = sortByDateDesc(formationData);
  const sortedReferencesData = sortAlphabetically(referencesData, (reference) => reference.name);
  const desktopReferencePages = chunkItems(sortedReferencesData, 6);
  const skillsCarousel = useMobileScrollDots(sortedSkillsData.length);
  const educationCarousel = useMobileScrollDots(sortedFormationData.length);
  const catalogProjects: ProjectCardData[] = [
    ...projectCatalog.map((project) =>
      project.id === 'azure-infra'
        ? {
            ...project,
            sortDate: 202502,
            title: {
              FR: 'Dashboard M365 Power BI',
              EN: 'M365 Power BI Dashboard',
            },
            companyLine: {
              FR: 'Microsoft 365 · Power BI',
              EN: 'Microsoft 365 · Power BI',
            },
            desc: {
              FR: 'Dashboard Power BI pour suivre activite, licences et risques de capacite sur un tenant M365 / Azure AD.',
              EN: 'Power BI dashboard to monitor activity, licenses, and capacity risks across a Microsoft 365 / Azure AD tenant.',
            },
            category: {
              FR: 'Cloud & BI',
              EN: 'Cloud & BI',
            },
            tags: [
              { label: 'Power BI', className: 'tb' },
              { label: 'Graph API', className: 'tb' },
              { label: 'DAX', className: 'tb' },
            ],
            background: '#24324A',
            accent: '#83B8FF',
            detailPage: true,
          }
        : project
    ),
    {
      id: 'automate',
      sortDate: 202503,
      title: {
        FR: 'Automatisation reporting Veeam',
        EN: 'Veeam reporting automation',
      },
      companyLine: {
        FR: 'Power Platform · Outlook / Excel Online',
        EN: 'Power Platform · Outlook / Excel Online',
      },
      desc: {
        FR: 'Workflow Power Automate qui transforme les emails Veeam en reporting Excel exploitable sans saisie manuelle.',
        EN: 'Power Automate workflow that turns Veeam emails into actionable Excel reporting without manual entry.',
      },
      category: {
        FR: 'Automatisation',
        EN: 'Automation',
      },
      categoryKey: 'bi',
      tags: [
        { label: 'Power Automate', className: 'tb' },
        { label: 'Veeam', className: 'tb' },
        { label: 'Excel Online', className: 'tb' },
      ],
      background: '#273744',
      accent: '#86C6E2',
      icon: 'grid',
      detailPage: true,
    },
    {
      id: 'wisignal',
      sortDate: 202504,
      title: {
        FR: 'Simulateur couverture Wi-Fi',
        EN: 'Wi-Fi coverage simulator',
      },
      companyLine: {
        FR: 'Neemba CAT Togo · Simulation reseau',
        EN: 'Neemba CAT Togo · Network simulation',
      },
      desc: {
        FR: 'Application web autonome pour placer des bornes, modeliser les murs et visualiser une heatmap RSSI sur plan.',
        EN: 'Standalone web app to place access points, model walls, and visualize an RSSI heatmap on floor plans.',
      },
      category: {
        FR: 'Infrastructure Wi-Fi',
        EN: 'Wi-Fi Infrastructure',
      },
      categoryKey: 'infrastructure',
      tags: [
        { label: 'Wi-Fi', className: 'tt' },
        { label: 'Canvas API', className: 'tt' },
        { label: 'RSSI', className: 'tt' },
      ],
      background: '#2C3444',
      accent: '#8CC2FF',
      icon: 'signal',
      detailPage: true,
    },
    {
      id: 'printtrack',
      sortDate: 202603190811,
      title: {
        FR: 'PrintTrack',
        EN: 'PrintTrack',
      },
      companyLine: {
        FR: 'Gestion de stock impression',
        EN: 'Print supply inventory',
      },
      desc: {
        FR: "Dashboard de gestion des consommables d'impression, des couts et des alertes par departement.",
        EN: 'Dashboard for print consumables, cost tracking, and department-level alerts.',
      },
      category: {
        FR: 'Operations IT',
        EN: 'IT Operations',
      },
      categoryKey: 'bi',
      tags: [
        { label: 'React 19', className: 'tb' },
        { label: 'Recharts', className: 'tb' },
        { label: 'Inventory', className: 'tb' },
      ],
      background: '#314146',
      accent: '#8ED1C2',
      icon: 'grid',
      detailPage: true,
    },
    {
      id: 'smartprocure',
      sortDate: 202603190759,
      title: {
        FR: 'SmartProcure AI',
        EN: 'SmartProcure AI',
      },
      companyLine: {
        FR: 'Analyse fournisseurs assistee par IA',
        EN: 'AI-assisted supplier analysis',
      },
      desc: {
        FR: "Plateforme d'analyse comparative de devis fournisseurs avec extraction Gemini et moteur de recommandation.",
        EN: 'Procurement comparison platform with Gemini extraction and recommendation engine.',
      },
      category: {
        FR: 'Cloud & IA',
        EN: 'Cloud & AI',
      },
      categoryKey: 'bi',
      tags: [
        { label: 'Gemini', className: 'tb' },
        { label: 'Procurement', className: 'tb' },
        { label: 'React', className: 'tb' },
      ],
      background: '#2F3046',
      accent: '#B5A0FF',
      icon: 'cloud',
      detailPage: true,
    },
    {
      id: 'tracker',
      sortDate: 202603190814,
      title: {
        FR: 'Neemba Tracker',
        EN: 'Neemba Tracker',
      },
      companyLine: {
        FR: 'Parc IT · audits · depenses',
        EN: 'IT fleet · audits · finance',
      },
      desc: {
        FR: "SPA metier de suivi du parc IT, des demandes, des audits et des depenses avec RBAC et Azure AD.",
        EN: 'Business SPA for IT fleet, approvals, audits, and expense tracking with RBAC and Azure AD.',
      },
      category: {
        FR: 'Infrastructure & Ops',
        EN: 'Infrastructure & Ops',
      },
      categoryKey: 'bi',
      tags: [
        { label: 'Azure AD', className: 'tt' },
        { label: 'RBAC', className: 'tt' },
        { label: 'React 19', className: 'tt' },
      ],
      background: '#273742',
      accent: '#83C1E6',
      icon: 'domain',
      detailPage: true,
    },
    {
      id: 'mfa',
      sortDate: 202603190818,
      title: {
        FR: 'MFA Ubuntu avec Google Authenticator',
        EN: 'Ubuntu MFA with Google Authenticator',
      },
      companyLine: {
        FR: 'Ubuntu 22.04+ · securite systeme',
        EN: 'Ubuntu 22.04+ · system security',
      },
      desc: {
        FR: "Guide technique de configuration MFA sur Ubuntu avec PAM, Google Authenticator et extension aux connexions SSH.",
        EN: 'Technical guide to configure MFA on Ubuntu with PAM, Google Authenticator, and SSH integration.',
      },
      category: {
        FR: 'Cybersecurite',
        EN: 'Cybersecurity',
      },
      categoryKey: 'cybersecurity',
      tags: [
        { label: 'MFA', className: 'tc' },
        { label: 'Ubuntu', className: 'tc' },
        { label: 'PAM', className: 'tc' },
      ],
      background: '#29353B',
      accent: '#84D7B5',
      icon: 'shield',
      detailPage: true,
    },
    {
      id: 'ubuntu_ldap',
      sortDate: 202603190822,
      title: {
        FR: 'Active Directory sur Ubuntu',
        EN: 'Active Directory on Ubuntu',
      },
      companyLine: {
        FR: 'Ubuntu · Samba AD · Kerberos',
        EN: 'Ubuntu · Samba AD · Kerberos',
      },
      desc: {
        FR: "Mise en place pas a pas d'un controleur de domaine Samba/LDAP sur Ubuntu avec Kerberos et DNS integres.",
        EN: 'Step-by-step deployment of a Samba/LDAP domain controller on Ubuntu with integrated Kerberos and DNS.',
      },
      category: {
        FR: 'Linux & Identite',
        EN: 'Linux & Identity',
      },
      categoryKey: 'infrastructure',
      tags: [
        { label: 'Samba AD', className: 'tl2' },
        { label: 'Kerberos', className: 'tl2' },
        { label: 'LDAP', className: 'tl2' },
      ],
      background: '#2E3431',
      accent: '#97D7A4',
      icon: 'server',
      detailPage: true,
    },
    {
      id: 'postgresql_ssl',
      sortDate: 202503150900,
      title: {
        FR: 'PostgreSQL SSL/TLS',
        EN: 'PostgreSQL SSL/TLS',
      },
      companyLine: {
        FR: 'PostgreSQL · Windows Server · OpenSSL',
        EN: 'PostgreSQL · Windows Server · OpenSSL',
      },
      desc: {
        FR: "Configuration d'un chiffrement SSL/TLS auto-signe pour securiser les connexions PostgreSQL sous Windows Server.",
        EN: 'Auto-signed SSL/TLS setup to secure PostgreSQL connections on Windows Server.',
      },
      category: {
        FR: 'Infrastructure & Securite',
        EN: 'Infrastructure & Security',
      },
      categoryKey: 'infrastructure',
      tags: [
        { label: 'PostgreSQL', className: 'tr' },
        { label: 'SSL/TLS', className: 'tr' },
        { label: 'OpenSSL', className: 'tr' },
      ],
      background: '#263142',
      accent: '#8CB7E8',
      icon: 'shield',
      detailPage: true,
    },
  ];
  const getStructuredScreenshotItems = (
    project: ProjectCardData,
    detail: StructuredProjectData | null | undefined
  ) =>
    detail
      ? (detail.assets.screenshots ?? [])
          .filter((path) => Boolean(path))
          .filter((path) => !/^[A-Za-z]:[\\/]/.test(path))
          .map((path) => ({
            src: /^https?:\/\//.test(path) ? path : withBaseAsset(path),
            alt: `${project.title[lang]} screenshot`,
          }))
      : [];

  const catalogProjectsWithCovers = catalogProjects.map((project) => ({
    ...project,
    coverImage: getStructuredScreenshotItems(project, structuredProjectData[project.id])[0]?.src ?? null,
  }));

  const projectById = catalogProjectsWithCovers.reduce<Record<string, ProjectCardData>>((acc, project) => {
    acc[project.id] = project;
    return acc;
  }, {});
  const recentMainProjects = [...catalogProjectsWithCovers]
    .filter((project) => project.detailPage)
    .sort((a, b) => b.sortDate - a.sortDate || alphaCollator.compare(a.title[lang], b.title[lang]))
    .slice(0, 3);
  const featuredMainProject = projectById.siem ?? recentMainProjects[0];
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
    { key: 'cloud' as const, label: 'Cloud' },
    {
      key: 'cybersecurity' as const,
      label: lang === 'FR' ? 'Cybersécurité' : 'Cybersecurity',
    },
    {
      key: 'infrastructure' as const,
      label: lang === 'FR' ? 'Infrastructure' : 'Infrastructure',
    },
    { key: 'network' as const, label: lang === 'FR' ? 'Réseaux' : 'Networks' },
    { key: 'bi' as const, label: lang === 'FR' ? 'Pilotage & BI' : 'Management & BI' },
  ];
  const sortedProjectFilters = projectFilters;
  const activeProjectFilterLabel =
    sortedProjectFilters.find((filter) => filter.key === projectFilter)?.label ??
    sortedProjectFilters[0].label;
  const normalizedProjectSearch = projectSearch.trim().toLowerCase();
  const filteredProjects = catalogProjectsWithCovers
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
  const totalProjectPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const paginatedProjects = filteredProjects.slice(
    (projectPage - 1) * projectsPerPage,
    projectPage * projectsPerPage
  );
  const paginatedProjectRange =
    filteredProjects.length === 0
      ? { start: 0, end: 0 }
      : {
          start: (projectPage - 1) * projectsPerPage + 1,
          end: Math.min(projectPage * projectsPerPage, filteredProjects.length),
        };
  const projectPaginationTokens = buildPaginationTokens(projectPage, totalProjectPages);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
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
  const {
    activePage,
    activeSection,
    navigateTo,
    navigateToSection,
    setObservedSection,
  } = useLocalRouting<StructuredProjectId>({
    onSectionNavigation: scrollToElement,
  });
  const isStructuredProjectId = (value: string): value is StructuredProjectId =>
    structuredProjectIds.includes(value as StructuredProjectId);

  useEffect(() => {
    if (activePage !== 'main') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && isNavigableSection(entry.target.id)) {
          setObservedSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = document.querySelectorAll('main section');
    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, [activePage, setObservedSection]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio_lang', lang);
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setProjectsPerPage(getProjectsPerPage());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setProjectPage(1);
  }, [projectSearch, projectFilter]);

  useEffect(() => {
    setProjectPage((currentPage) => Math.min(currentPage, totalProjectPages));
  }, [totalProjectPages]);

  useEffect(() => {
    if (!isProjectFilterMenuOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (
        projectFilterMenuRef.current &&
        target instanceof Node &&
        !projectFilterMenuRef.current.contains(target)
      ) {
        setIsProjectFilterMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isProjectFilterMenuOpen]);

  useEffect(() => {
    structuredProjectIds.forEach((projectId) => {
      void loadProjectDetail(projectId);
    });
  }, [loadProjectDetail]);

  useEffect(() => {
    const syncReferenceCarousel = () => {
      if (!isMobilePeekCarousel()) {
        setReferenceCarouselOffset(0);
        return;
      }

      setReferenceCarouselOffset(
        measurePeekCarouselOffset(referenceCarouselRef.current, referenceCarouselIndex)
      );
    };

    syncReferenceCarousel();
    window.addEventListener('resize', syncReferenceCarousel);

    return () => {
      window.removeEventListener('resize', syncReferenceCarousel);
    };
  }, [referenceCarouselIndex]);

  useEffect(() => {
    const syncDetailCarousels = () => {
      if (!isMobilePeekCarousel()) {
        setDetailCarouselOffset({});
        return;
      }

      setDetailCarouselOffset((current) => {
        const next = { ...current };

        Object.keys(structuredProjectConfigs).forEach((projectId) => {
          next[projectId] = measurePeekCarouselOffset(
            detailCarouselRefs.current[projectId] ?? null,
            detailCarouselIndex[projectId] ?? 0
          );
        });

        return next;
      });
    };

    syncDetailCarousels();
    window.addEventListener('resize', syncDetailCarousels);

    return () => {
      window.removeEventListener('resize', syncDetailCarousels);
    };
  }, [detailCarouselIndex, structuredProjectData, activePage]);

  useEffect(() => {
    setDesktopReferencePage((current) =>
      Math.min(current, Math.max(desktopReferencePages.length - 1, 0))
    );
  }, [desktopReferencePages.length]);

  const scrollToSection = (id: string) => {
    if (!isNavigableSection(id)) {
      return;
    }

    setIsMobileMenuOpen(false);
    navigateToSection(id);
  };

  const handleDiscoverProfile = () => scrollToSection('about');
  const handleViewProjects = () => scrollToSection('projets');
  const selectProjectFilter = (filterKey: ProjectFilterKey) => {
    setProjectFilter(filterKey);
    setIsProjectFilterMenuOpen(false);
  };

  const changeProjectPage = (nextPage: number) => {
    const clampedPage = Math.max(1, Math.min(nextPage, totalProjectPages));
    setProjectPage(clampedPage);

    if (!allProjectsSectionRef.current) {
      return;
    }

    const targetTop =
      window.scrollY + allProjectsSectionRef.current.getBoundingClientRect().top - getNavOffset();

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: getScrollBehavior(),
    });
  };

  const showDetail = (id: string) => {
    if (!isDetailPage(id)) {
      return;
    }

    if (isStructuredProjectId(id)) {
      void loadProjectDetail(id);
    }

    setDetailCarouselIndex((current) => ({
      ...current,
      [id]: 0,
    }));
    navigateTo(id);
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  const backToMain = () => {
    navigateTo('main');
    setTimeout(() => {
      scrollToElement('projets');
    }, 100);
  };

  const isMobilePeekCarousel = () =>
    typeof window !== 'undefined' && window.innerWidth <= 768;

  const measurePeekCarouselOffset = (
    shell: HTMLDivElement | null,
    activeIndex: number
  ) => {
    if (!shell || !isMobilePeekCarousel()) {
      return 0;
    }

    const track = shell.querySelector<HTMLElement>('.mobile-peek-track');
    const items = Array.from(
      shell.querySelectorAll('.mobile-peek-item')
    ) as HTMLElement[];

    if (!track || !items.length) {
      return 0;
    }

    const safeIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
    const activeItem = items[safeIndex];
    const activeCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
    const rawOffset = activeCenter - shell.clientWidth / 2;
    const maxOffset = Math.max(0, track.scrollWidth - shell.clientWidth);

    return Math.max(0, Math.min(rawOffset, maxOffset));
  };

  const stepReferenceCarousel = (direction: 1 | -1) => {
    setReferenceCarouselIndex((current) =>
      Math.max(0, Math.min(current + direction, sortedReferencesData.length - 1))
    );
  };

  const stepDetailCarousel = (projectId: string, totalItems: number, direction: 1 | -1) => {
    setDetailCarouselIndex((current) => {
      const currentIndex = current[projectId] ?? 0;
      return {
        ...current,
        [projectId]: Math.max(0, Math.min(currentIndex + direction, totalItems - 1)),
      };
    });
  };

  const handleCarouselTouchStart = (key: string) => (event: React.TouchEvent<HTMLDivElement>) => {
    carouselTouchStartX.current[key] = event.changedTouches[0]?.clientX ?? null;
  };

  const handleReferenceCarouselTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = carouselTouchStartX.current.references;
    const endX = event.changedTouches[0]?.clientX ?? null;
    carouselTouchStartX.current.references = null;

    if (startX === null || endX === null) {
      return;
    }

    const delta = endX - startX;
    if (Math.abs(delta) < 36) {
      return;
    }

    stepReferenceCarousel(delta < 0 ? 1 : -1);
  };

  const handleDetailCarouselTouchEnd =
    (projectId: string, totalItems: number) => (event: React.TouchEvent<HTMLDivElement>) => {
      const startX = carouselTouchStartX.current[projectId];
      const endX = event.changedTouches[0]?.clientX ?? null;
      carouselTouchStartX.current[projectId] = null;

      if (startX === null || endX === null) {
        return;
      }

      const delta = endX - startX;
      if (Math.abs(delta) < 36) {
        return;
      }

      stepDetailCarousel(projectId, totalItems, delta < 0 ? 1 : -1);
    };

  const goToReferenceCard = (index: number) => {
    setReferenceCarouselIndex(index);
  };

  const renderReferenceCard = (reference: ReferenceContact) => (
    <div className="ref-card mobile-peek-item" key={reference.name}>
      <div className="ref-card-head">
        <div className="ref-av">{reference.initials}</div>
        <div className="ref-card-meta">
          <p className="ref-name">{reference.name}</p>
          <p className="ref-org">{reference.organization}</p>
        </div>
      </div>
      <div className="ref-card-body">
        <p className="ref-role">{reference.role}</p>
        <div className="ref-contact ref-contact-links">
          {reference.phones.map((phone) => (
            <a key={phone.href} className="ref-contact-link" href={phone.href}>
              {phone.display}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const goToDetailCarouselItem = (projectId: string, index: number) => {
    setDetailCarouselIndex((current) => ({
      ...current,
      [projectId]: index,
    }));
  };

  const renderStructuredProjectPage = (projectId: string) => {
    const project = projectById[projectId];
    const config = structuredProjectConfigs[projectId];

    if (!project || !config) {
      return null;
    }

    const detail = structuredProjectData[projectId];
    const isLoading = !(projectId in structuredProjectData);
    const techStackItems = detail
      ? sortAlphabetically(
          Array.from(
            new Set<string>(
              [
                ...(detail.tech_stack.frontend ?? []),
                ...(detail.tech_stack.backend ?? []),
                ...(detail.tech_stack.database ?? []),
                ...(detail.tech_stack.devops ?? []),
                ...(detail.tech_stack.tools ?? []),
              ].filter((item): item is string => Boolean(item))
            )
          ),
          (item) => item
        )
      : [];
    const keywordItems = detail
      ? sortAlphabetically(Array.from(new Set<string>(detail.keywords ?? [])), (item) => item)
      : [];
    const relatedProjects = config.relatedIds
      .map((relatedId) => projectById[relatedId])
      .filter(Boolean);
    const linkItems = detail
      ? [
          detail.links.github
            ? {
                href: detail.links.github,
                label: 'GitHub',
              }
            : null,
          detail.links.live
            ? {
                href: detail.links.live,
                label: lang === 'FR' ? 'Lien live' : 'Live link',
              }
            : null,
        ].filter(Boolean) as { href: string; label: string }[]
      : [];
    const resourceLinks =
      config.resourceLinks?.map((link) => ({
        href: withBaseAsset(link.href),
        label: link.label[lang],
      })) ?? [];
    const allLinkItems = [...linkItems, ...resourceLinks];
    const screenshotItems = getStructuredScreenshotItems(project, detail);
    const activeScreenshotIndex = detailCarouselIndex[projectId] ?? 0;
    const screenshotPages = chunkItems(screenshotItems, 2);
    const activeScreenshotPage = Math.min(
      Math.floor(activeScreenshotIndex / 2),
      Math.max(screenshotPages.length - 1, 0)
    );
    const metaItems = [
      {
        label: lang === 'FR' ? 'Categorie' : 'Category',
        value: detail?.category || project.category[lang],
      },
      {
        label: lang === 'FR' ? 'Role' : 'Role',
        value:
          detail?.role ||
          config.role?.[lang] ||
          (lang === 'FR' ? 'Non precise' : 'Not specified'),
      },
      {
        label: lang === 'FR' ? 'Environnement' : 'Environment',
        value:
          config.environment?.[lang] ||
          detail?.primary_language ||
          (lang === 'FR' ? 'Non precise' : 'Not specified'),
      },
      {
        label: lang === 'FR' ? 'Statut' : 'Status',
        value:
          detail?.status ||
          config.fallbackStatus?.[lang] ||
          (lang === 'FR' ? 'Documente' : 'Documented'),
        success: Boolean(detail?.status || config.fallbackStatus),
      },
    ];

    return (
      <div className={`page ${activePage === projectId ? 'active' : ''}`} id={`page-${projectId}`} key={projectId}>
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
            {lang === 'FR' ? '← Retour aux projets' : '← Back to projects'}
          </button>
          <div className="nav-tag">{project.category[lang]}</div>
        </nav>
        <div className="sec">
          <div className="det-hero">
            <div className="det-vis" style={{ background: project.background }}>
              {screenshotItems.length ? (
                <button
                  type="button"
                  className="det-vis-media-btn"
                  onClick={() => openProjectImageLightbox(screenshotItems, 0)}
                  aria-label={
                    lang === 'FR'
                      ? `Afficher l'image de couverture du projet ${project.title.FR}`
                      : `View the cover image of the ${project.title.EN} project`
                  }
                >
                  <img
                    className="det-vis-media"
                    src={screenshotItems[0].src}
                    alt={screenshotItems[0].alt}
                    loading="lazy"
                  />
                </button>
              ) : (
                renderProjectIcon(project.icon, project.accent)
              )}
            </div>
            <div>
              <p className="det-eye">{project.companyLine[lang]}</p>
              <h1 className="det-title">{project.title[lang]}</h1>
              <p className="det-co">{config.client[lang]}</p>
              <p className="det-desc">{detail?.tagline ?? project.desc[lang]}</p>
              <div className="det-meta">
                {metaItems.map((item) => (
                  <div className="dm" key={`${projectId}-${item.label}`}>
                    <small>{item.label}</small>
                    <p style={item.success ? { color: '#4CAF7D' } : undefined}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="det-body">
            <div>
              <div className="blk">
                <h3 className="blk-ttl">{lang === 'FR' ? "Vue d'ensemble" : 'Overview'}</h3>
                <p>{detail?.description ?? project.desc[lang]}</p>
              </div>
              <div className="blk">
                <h3 className="blk-ttl">{lang === 'FR' ? 'Fonctionnalites cles' : 'Key features'}</h3>
                {detail?.features?.length ? (
                  <ul className="steps">
                    {detail.features.map((feature) => (
                      <li key={`${projectId}-${feature}`}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    {isLoading
                      ? lang === 'FR'
                        ? 'Synchronisation des details en cours...'
                        : 'Syncing project details...'
                      : lang === 'FR'
                        ? 'Aucune fonctionnalite detaillee pour le moment.'
                        : 'No detailed features available yet.'}
                  </p>
                )}
              </div>
              {detail?.challenges ? (
                <div className="blk">
                  <h3 className="blk-ttl">{lang === 'FR' ? 'Defis traites' : 'Challenges addressed'}</h3>
                  <p>{detail.challenges}</p>
                </div>
              ) : null}
              {screenshotItems.length ? (
                <div className="blk">
                  <h3 className="blk-ttl">{lang === 'FR' ? 'Captures projet' : 'Project screenshots'}</h3>
                  <div className="detail-shot-desktop-carousel">
                    <div
                      className="detail-shot-desktop-track"
                      style={{ transform: `translateX(-${activeScreenshotPage * 100}%)` }}
                    >
                      {screenshotPages.map((page, pageIndex) => (
                        <div className="detail-shot-desktop-page" key={`${projectId}-shot-page-${pageIndex + 1}`}>
                          <div className="detail-shot-grid detail-shot-grid-desktop">
                            {page.map((shot, index) => {
                              const absoluteIndex = pageIndex * 2 + index;

                              return (
                                <button
                                  key={`${projectId}-shot-desktop-${absoluteIndex + 1}`}
                                  type="button"
                                  className="detail-shot-card"
                                  onClick={() => openProjectImageLightbox(screenshotItems, absoluteIndex)}
                                  aria-label={
                                    lang === 'FR'
                                      ? `Afficher la capture ${absoluteIndex + 1} du projet ${project.title.FR}`
                                      : `View screenshot ${absoluteIndex + 1} of the ${project.title.EN} project`
                                  }
                                >
                                  <img
                                    className="detail-shot-image"
                                    src={shot.src}
                                    alt={`${shot.alt} ${absoluteIndex + 1}`}
                                    loading="lazy"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="detail-shot-carousel-shell detail-shot-mobile-carousel"
                    ref={(node) => {
                      detailCarouselRefs.current[projectId] = node;
                    }}
                    onTouchStart={handleCarouselTouchStart(projectId)}
                    onTouchEnd={handleDetailCarouselTouchEnd(projectId, screenshotItems.length)}
                  >
                    <div
                      className="detail-shot-grid mobile-peek-track"
                      style={{
                        transform: `translateX(-${detailCarouselOffset[projectId] ?? 0}px)`,
                      }}
                    >
                      {screenshotItems.map((shot, index) => (
                        <button
                          key={`${projectId}-shot-${index + 1}`}
                          type="button"
                          className="detail-shot-card mobile-peek-item"
                          onClick={() => openProjectImageLightbox(screenshotItems, index)}
                          aria-label={
                            lang === 'FR'
                              ? `Afficher la capture ${index + 1} du projet ${project.title.FR}`
                              : `View screenshot ${index + 1} of the ${project.title.EN} project`
                          }
                        >
                          <img
                            className="detail-shot-image"
                            src={shot.src}
                            alt={`${shot.alt} ${index + 1}`}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  {screenshotItems.length > 1 ? (
                    <div
                      className="carousel-dots detail-shot-dots"
                      aria-label={lang === 'FR' ? 'Position dans les captures projet' : 'Project screenshots position'}
                    >
                      {(isMobilePeekCarousel() ? screenshotItems : screenshotPages).map((shot, index) => (
                        <button
                          key={`${projectId}-shot-dot-${index + 1}`}
                          type="button"
                          className={`carousel-dot ${
                            isMobilePeekCarousel()
                              ? activeScreenshotIndex === index
                              : activeScreenshotPage === index
                              ? 'active'
                              : ''
                          }`}
                          onClick={() =>
                            goToDetailCarouselItem(
                              projectId,
                              isMobilePeekCarousel() ? index : index * 2
                            )
                          }
                          aria-label={
                            lang === 'FR'
                              ? `Voir la capture ${index + 1}`
                              : `View screenshot ${index + 1}`
                          }
                          aria-current={
                            isMobilePeekCarousel()
                              ? activeScreenshotIndex === index
                                ? 'true'
                                : undefined
                              : activeScreenshotPage === index
                              ? 'true'
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {detail?.learnings ? (
                <div className="blk">
                  <h3 className="blk-ttl">{lang === 'FR' ? 'Apprentissages' : 'Key learnings'}</h3>
                  <p>{detail.learnings}</p>
                </div>
              ) : null}
            </div>
            <div>
              <div className="sb-blk">
                <div className="sb-lbl">{lang === 'FR' ? 'Technologies' : 'Technologies'}</div>
                {techStackItems.length ? (
                  <div className="tags" style={{ gap: '0.375rem' }}>
                    {techStackItems.map((item) => (
                      <span className="tag" key={`${projectId}-tech-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="detail-empty-copy">
                    {lang === 'FR'
                      ? 'Le dossier projet est branche, mais la stack detaillee n est pas encore renseignee.'
                      : 'The project folder is connected, but the detailed stack is not filled in yet.'}
                  </p>
                )}
              </div>
              <div className="sb-blk">
                <div className="sb-lbl">{lang === 'FR' ? 'Mots-cles' : 'Keywords'}</div>
                {keywordItems.length ? (
                  <div className="tags" style={{ gap: '0.375rem' }}>
                    {keywordItems.map((item) => (
                      <span className="tag" key={`${projectId}-keyword-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="detail-empty-copy">
                    {lang === 'FR' ? 'Aucun mot-cle supplementaire.' : 'No additional keywords.'}
                  </p>
                )}
              </div>
              <div className="sb-blk">
                <div className="sb-lbl">{lang === 'FR' ? 'Liens utiles' : 'Useful links'}</div>
                {allLinkItems.length ? (
                  <div className="detail-link-group">
                    {allLinkItems.map((link) => (
                      <a
                        key={`${projectId}-${link.label}`}
                        href={link.href}
                        className="kp-btn-line detail-link-btn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="detail-empty-copy">
                    {lang === 'FR'
                      ? 'Le detail provient du dossier projet local, sans lien externe publie pour l instant.'
                      : 'Details are sourced from the local project folder, with no published external link yet.'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="rel">
            <h3>{lang === 'FR' ? 'Projets similaires' : 'Related projects'}</h3>
            <div className="rel-grid" style={{ marginTop: '1rem' }}>
              {relatedProjects.map((relatedProject) => (
                <button
                  key={`${projectId}-related-${relatedProject.id}`}
                  type="button"
                  className="rel-card card-action"
                  onClick={() => showDetail(relatedProject.id)}
                  aria-label={
                    lang === 'FR'
                      ? `Voir le projet ${relatedProject.title.FR}`
                      : `View the ${relatedProject.title.EN} project`
                  }
                >
                  <h4>{relatedProject.title[lang]}</h4>
                  <p>{relatedProject.companyLine[lang]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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
          onViewBiography={() => showDetail('biography')}
        />

        <About lang={lang} onReadMore={() => showDetail('biography')} />

        {/* CE QUE JE MAÎTRISE */}
        <section className="sec" id="skills" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">{v.skills.num}</span>
            <h2 className="sec-ttl">{v.skills.title}.</h2>
            <span className="sec-sub">{getSectionSubcopy(typedSections.skills)}</span>
          </div>
          <div className="skills-grid" ref={skillsCarousel.containerRef}>
            {sortedSkillsData.map((skill, i) => (
              <div
                className="skill-card"
                key={i}
                ref={skillsCarousel.setItemRef(i)}
                data-carousel-index={i}
              >
                <div className="skill-icon" style={{ background: skill.bg }}>
                  {skill.icon}
                </div>
                <h4>{skill.title}</h4>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
          {sortedSkillsData.length > 1 ? (
            <div
              className="carousel-dots mobile-scroll-dots"
              aria-label={lang === 'FR' ? 'Position dans les compétences' : 'Skills position'}
            >
              {sortedSkillsData.map((skill, index) => (
                <button
                  key={`skill-dot-${skill.title}`}
                  type="button"
                  className={`carousel-dot ${skillsCarousel.activeIndex === index ? 'active' : ''}`}
                  onClick={() => skillsCarousel.scrollToIndex(index)}
                  aria-label={
                    lang === 'FR'
                      ? `Voir la compétence ${index + 1}`
                      : `View skill ${index + 1}`
                  }
                  aria-current={skillsCarousel.activeIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
          ) : null}
        </section>

        {/* MON PARCOURS */}
        <section className="sec" id="parcours">
          <div className="sec-hdr">
            <span className="sec-num">{v.experience.num}</span>
            <h2 className="sec-ttl">{v.experience.title}.</h2>
            <span className="sec-sub">{getSectionSubcopy(typedSections.experience)}</span>
          </div>
          <div className="timeline">
            {sortedTimelineData.map((item, i) => (
              <div className={`tl-item ${item.isCurrent ? 'current' : ''}`} key={i}>
                <div className="tl-date-row">
                  <p className="tl-date">{item.date}</p>
                  <span className="tl-duration">{item.duration}</span>
                </div>
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
          <div className="edu-grid" ref={educationCarousel.containerRef}>
            {sortedFormationData.map((item, i) => (
              <div
                className="edu-card"
                key={i}
                ref={educationCarousel.setItemRef(i)}
                data-carousel-index={i}
              >
                <p className="edu-year">{item.year}</p>
                <h3 className="edu-title">{item.title}</h3>
                <p className="edu-school" dangerouslySetInnerHTML={{ __html: item.school }}></p>
                {item.gradeNode}
              </div>
            ))}
          </div>
          {sortedFormationData.length > 1 ? (
            <div
              className="carousel-dots mobile-scroll-dots"
              aria-label={lang === 'FR' ? 'Position dans la formation' : 'Education position'}
            >
              {sortedFormationData.map((item, index) => (
                <button
                  key={`education-dot-${item.title}`}
                  type="button"
                  className={`carousel-dot ${educationCarousel.activeIndex === index ? 'active' : ''}`}
                  onClick={() => educationCarousel.scrollToIndex(index)}
                  aria-label={
                    lang === 'FR'
                      ? `Voir la formation ${index + 1}`
                      : `View education entry ${index + 1}`
                  }
                  aria-current={educationCarousel.activeIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
          ) : null}
        </section>

        {/* MES RÉALISATIONS */}
        <Projects
          lang={lang}
          featuredProject={featuredMainProject}
          recentProjects={recentMainProjects}
          onProjectClick={showDetail}
          onViewAll={() => {
            setProjectPage(1);
            navigateTo('all-projects');
            window.scrollTo({ top: 0, behavior: getScrollBehavior() });
          }}
        />

        <section className="sec" id="refs" style={{ background: '#EEEAE3' }}>
          <div className="sec-hdr">
            <span className="sec-num">{referencesSection.num}</span>
            <h2 className="sec-ttl">{referencesSection.title}.</h2>
            <span className="sec-sub">{referencesSection.subtitle}</span>
          </div>
          <div className="ref-desktop-carousel">
            <div
              className="ref-desktop-track"
              style={{ transform: `translateX(-${desktopReferencePage * 100}%)` }}
            >
              {desktopReferencePages.map((page, pageIndex) => (
                <div className="ref-desktop-page" key={`ref-page-${pageIndex}`}>
                  <div className="ref-grid ref-desktop-grid">
                    {page.map((reference) => renderReferenceCard(reference))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {desktopReferencePages.length > 1 ? (
            <div
              className="carousel-dots ref-desktop-dots"
              aria-label={lang === 'FR' ? 'Pages des references' : 'Reference pages'}
            >
              {desktopReferencePages.map((_, index) => (
                <button
                  key={`ref-page-dot-${index}`}
                  type="button"
                  className={`carousel-dot ${desktopReferencePage === index ? 'active' : ''}`}
                  onClick={() => setDesktopReferencePage(index)}
                  aria-label={
                    lang === 'FR'
                      ? `Voir la page ${index + 1} des references`
                      : `View reference page ${index + 1}`
                  }
                  aria-current={desktopReferencePage === index ? 'true' : undefined}
                />
              ))}
            </div>
          ) : null}
          <div
            className="ref-carousel-shell ref-mobile-carousel"
            ref={referenceCarouselRef}
            onTouchStart={handleCarouselTouchStart('references')}
            onTouchEnd={handleReferenceCarouselTouchEnd}
          >
            <div
              className="ref-grid mobile-peek-track"
              style={{ transform: `translateX(-${referenceCarouselOffset}px)` }}
            >
              {sortedReferencesData.map((reference) => renderReferenceCard(reference))}
            </div>
          </div>
          <div
            className="carousel-dots ref-carousel-dots"
            aria-label={lang === 'FR' ? 'Position dans les references' : 'Reference position'}
          >
            {sortedReferencesData.map((reference, index) => (
              <button
                key={`ref-dot-${reference.name}`}
                type="button"
                className={`carousel-dot ${referenceCarouselIndex === index ? 'active' : ''}`}
                onClick={() => goToReferenceCard(index)}
                aria-label={
                  lang === 'FR'
                    ? `Voir la reference ${index + 1}`
                    : `View reference ${index + 1}`
                }
                aria-current={referenceCarouselIndex === index ? 'true' : undefined}
              />
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

      {Object.keys(structuredProjectConfigs).map((projectId) =>
        renderStructuredProjectPage(projectId)
      )}

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
            <img src={withBaseAsset(assetPaths.profilePortrait)} alt="Kafui Charbel Eklu" loading="lazy" />
          </div>
          <div className="bio-hero-info">
            <p className="bio-hero-eyebrow">Biographie</p>
            <h1 className="bio-hero-name">EKLU Kafui<br />Charbel</h1>
            <p className="bio-hero-role">Administrateur Digital Workplace & Infrastructure</p>
            <div className="bio-hero-badges">
              <span className="badge-location">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                </svg>
                {lang === 'FR' ? 'Lomé, Togo' : 'Lome, Togo'}
              </span>
              <span className="badge-mobility">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M8 2c0 0-3 2.5-3 6s3 6 3 6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M8 2c0 0 3 2.5 3 6s-3 6-3 6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M2 8h12" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                {lang === 'FR' ? 'Mobilité internationale' : 'International mobility'}
              </span>
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
              <p className="bio-story-lead">Professionnel togolais de l'IT, je conçois des environnements numériques fiables, utiles et lisibles, avec une approche orientée impact.</p>
              <p>Spécialisé en <strong>Digital Workplace, support IT et optimisation des environnements de travail</strong>, j'évolue dans des contextes où la performance quotidienne compte autant que la solidité technique. Mon fil conducteur reste le même : simplifier l'usage, structurer les process et faire gagner du temps aux équipes.</p>
              <p>Au-delà de l'administration courante, j'aime transformer un besoin métier en solution concrète. J'ai notamment conçu une <strong>application de gestion de matériel IT</strong> avec suivi des équipements, affectations, restitutions et workflow de validation à trois niveaux, afin d'apporter plus de traçabilité, de gouvernance et de lisibilité aux opérations internes.</p>
              <p>Mon passage chez <strong>Orabank</strong> a renforcé cette exigence. Dans un environnement critique, j'ai consolidé mes bases sur Windows Server, Active Directory, GPO et le support avancé, avec une logique de fiabilité, de sécurité et de continuité de service qui guide encore aujourd'hui ma manière de travailler.</p>
              <p>Je m'intéresse particulièrement à l'intersection entre <strong>cybersécurité, open source et intelligence artificielle</strong>, avec un attrait fort pour la détection, l'automatisation et les architectures évolutives. Mon ambition est de faire converger ces trois dimensions dans des projets IT à forte valeur, localement comme à l'international.</p>
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
            "Chaque défi surmonté est une occasion d'acquérir des compétences qui rendent les futurs obstacles plus simples."
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
          <a href={withBaseAsset(assetPaths.resume)} download className="kp-btn-dark bio-cta-btn">
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
          <section
            ref={allProjectsSectionRef}
            className="sec projects-page"
            style={{ minHeight: '80vh', background: '#F5F1EC' }}
          >
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

              <div className="project-filter-mobile-row">
                <div
                  className={`project-filter-dropdown ${isProjectFilterMenuOpen ? 'open' : ''}`}
                  ref={projectFilterMenuRef}
                >
                  <button
                    type="button"
                    className="project-filter-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={isProjectFilterMenuOpen}
                    aria-label={lang === 'FR' ? 'Filtrer les projets' : 'Filter projects'}
                    onClick={() => setIsProjectFilterMenuOpen((current) => !current)}
                  >
                    <span>{activeProjectFilterLabel}</span>
                    <svg
                      className="project-filter-trigger-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6.5L8 10L12 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {isProjectFilterMenuOpen && (
                    <div
                      className="project-filter-menu"
                      role="listbox"
                      aria-label={lang === 'FR' ? 'Options de filtre projet' : 'Project filter options'}
                    >
                      {sortedProjectFilters.map((filter) => (
                        <button
                          key={`mobile-filter-${filter.key}`}
                          type="button"
                          role="option"
                          aria-selected={projectFilter === filter.key}
                          className={`project-filter-option ${projectFilter === filter.key ? 'active' : ''}`}
                          onClick={() => selectProjectFilter(filter.key)}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

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
                    onClick={() => selectProjectFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {false && <p className="projects-results">
                {lang === 'FR'
                  ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} affiché${filteredProjects.length > 1 ? 's' : ''}`
                  : `${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''} shown`}
              </p>}
              <p className="projects-results">
                {lang === 'FR'
                  ? `${paginatedProjectRange.start}\u2013${paginatedProjectRange.end} sur ${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''}`
                  : `${paginatedProjectRange.start}\u2013${paginatedProjectRange.end} of ${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''}`}
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <>
                <div className="pj-grid pj-grid-all">
                {paginatedProjects.map((project) =>
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
                        {project.coverImage ? (
                          <img
                            className="project-card-cover"
                            src={project.coverImage}
                            alt={project.title[lang]}
                            loading="lazy"
                          />
                        ) : (
                          renderProjectIcon(project.icon, project.accent)
                        )}
                      </div>
                      <div className="pj-body">
                        <h3 className="pj-title">{project.title[lang]}</h3>
                        <div className="pj-foot">
                          <div className="tags">
                            {getSortedTags(project.tags).map((tag) => (
                              <span key={`${project.id}-${tag.label}`} className={`tag ${tag.className}`}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <article key={project.id} className="pj-card project-card-static">
                      <div className="pj-vis" style={{ background: project.background }}>
                        {project.coverImage ? (
                          <img
                            className="project-card-cover"
                            src={project.coverImage}
                            alt={project.title[lang]}
                            loading="lazy"
                          />
                        ) : (
                          renderProjectIcon(project.icon, project.accent)
                        )}
                      </div>
                      <div className="pj-body">
                        <h3 className="pj-title">{project.title[lang]}</h3>
                        <div className="pj-foot">
                          <div className="tags">
                            {getSortedTags(project.tags).map((tag) => (
                              <span key={`${project.id}-${tag.label}`} className={`tag ${tag.className}`}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                )}
                </div>
                {totalProjectPages > 1 ? (
                  <nav
                    className="projects-pagination"
                    aria-label={lang === 'FR' ? 'Pagination des projets' : 'Projects pagination'}
                  >
                    <button
                      type="button"
                      className="projects-pagination-btn projects-pagination-nav"
                      onClick={() => changeProjectPage(projectPage - 1)}
                      disabled={projectPage === 1}
                    >
                      {lang === 'FR' ? 'Précédent' : 'Previous'}
                    </button>

                    <div className="projects-pagination-pages">
                      {projectPaginationTokens.map((token) =>
                        typeof token === 'number' ? (
                          <button
                            key={`project-page-${token}`}
                            type="button"
                            className={`projects-pagination-btn projects-pagination-page ${projectPage === token ? 'active' : ''}`}
                            aria-current={projectPage === token ? 'page' : undefined}
                            onClick={() => changeProjectPage(token)}
                          >
                            {token}
                          </button>
                        ) : (
                          <span
                            key={`project-page-${token}`}
                            className="projects-pagination-ellipsis"
                            aria-hidden="true"
                          >
                            …
                          </span>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      className="projects-pagination-btn projects-pagination-nav"
                      onClick={() => changeProjectPage(projectPage + 1)}
                      disabled={projectPage === totalProjectPages}
                    >
                      {lang === 'FR' ? 'Suivant' : 'Next'}
                    </button>
                  </nav>
                ) : null}
              </>
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

      <AnimatePresence>
        {projectImageLightbox && (
          <motion.div
            className="project-image-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
            onClick={closeProjectImageLightbox}
          >
            <button
              type="button"
              className="project-image-lightbox-close"
              onClick={closeProjectImageLightbox}
              aria-label={lang === 'FR' ? "Fermer l'image du projet" : 'Close project image'}
            >
              ✕
            </button>
            <motion.div
              className="project-image-lightbox-dialog"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 12 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={projectImageLightbox.items[projectImageLightbox.index].src}
                alt={projectImageLightbox.items[projectImageLightbox.index].alt}
                className="project-image-lightbox-image"
              />
              {projectImageLightbox.items.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="project-image-lightbox-nav project-image-lightbox-nav-prev"
                    onClick={(event) => {
                      event.stopPropagation();
                      stepProjectImageLightbox(-1);
                    }}
                    disabled={projectImageLightbox.index === 0}
                    aria-label={lang === 'FR' ? 'Image précédente' : 'Previous image'}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="project-image-lightbox-nav project-image-lightbox-nav-next"
                    onClick={(event) => {
                      event.stopPropagation();
                      stepProjectImageLightbox(1);
                    }}
                    disabled={
                      projectImageLightbox.index === projectImageLightbox.items.length - 1
                    }
                    aria-label={lang === 'FR' ? 'Image suivante' : 'Next image'}
                  >
                    ›
                  </button>
                  <div
                    className="carousel-dots project-image-lightbox-dots"
                    aria-label={
                      lang === 'FR'
                        ? 'Navigation dans les images du projet'
                        : 'Project image navigation'
                    }
                  >
                    {projectImageLightbox.items.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        className={`carousel-dot ${
                          projectImageLightbox.index === index ? 'active' : ''
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          goToProjectImageLightbox(index);
                        }}
                        aria-label={
                          lang === 'FR'
                            ? `Afficher l'image ${index + 1}`
                            : `Show image ${index + 1}`
                        }
                        aria-current={
                          projectImageLightbox.index === index ? 'true' : undefined
                        }
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LanguageToggle lang={lang} onToggle={setLang} />
      <ChatbotButton />
    </div>
  );
}

export default App;
