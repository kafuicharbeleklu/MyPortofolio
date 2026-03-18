import React from 'react';

export const skillsData = [
  {
    title: 'Cybersécurité',
    desc: 'Wazuh SIEM/XDR, détection d\'intrusion, audit sécurité, politiques de protection proactive.',
    bg: '#EDE0D4',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z" stroke="#A0603A" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="#A0603A" strokeWidth="1.2" fill="none"/></svg>
  },
  {
    title: 'Systèmes',
    desc: 'Windows Server, Active Directory, GPO, SCCM/MECM, Ubuntu Server, maintenance parc IT.',
    bg: '#D8E8F0',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="6" rx="1" stroke="#3A7A8E" strokeWidth="1.5" fill="none"/><rect x="2" y="14" width="20" height="6" rx="1" stroke="#3A7A8E" strokeWidth="1.2" fill="none"/><circle cx="19" cy="7" r="1.2" fill="#3A7A8E"/></svg>
  },
  {
    title: 'Réseaux',
    desc: 'TCP/IP, routage, switching, VSAT/ARCEP, protocoles réseau, GNS3/EVE-NG, supervision.',
    bg: '#D8EEE4',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2E7055" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="5" stroke="#2E7055" strokeWidth="1" fill="none"/><circle cx="12" cy="12" r="2" fill="#2E7055" opacity=".6"/></svg>
  },
  {
    title: 'Gestion & BI',
    desc: 'Power BI, DAX, CMDB, Matrix42, Veeam, pilotage budget IT, reporting de performance.',
    bg: '#E4E0F0',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="16" width="4" height="5" rx="1" fill="#5A4A90" opacity=".8"/><rect x="10" y="11" width="4" height="10" rx="1" fill="#5A4A90" opacity=".6"/><rect x="17" y="6" width="4" height="15" rx="1" fill="#5A4A90" opacity=".4"/></svg>
  },
  {
    title: 'Scripting & IA',
    desc: 'Bash, PowerShell, Python, Power Automate, Vibe Coding, automatisation et IA générative.',
    bg: '#EEE0D8',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="4,17 9,12 13,15 20,7" stroke="#A0603A" strokeWidth="1.5" fill="none"/><circle cx="4" cy="17" r="1.5" fill="#A0603A"/><circle cx="20" cy="7" r="1.5" fill="#A0603A"/></svg>
  },
  {
    title: 'Cloud & Virtualisation',
    desc: 'Microsoft Azure, Microsoft 365, solutions cloud hybrides, infrastructure virtualisée.',
    bg: '#D8E4EE',
    icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 8 Q12 4 20 8 Q12 12 4 8Z" stroke="#185FA5" strokeWidth="1.2" fill="none"/><path d="M4 12 Q12 8 20 12" stroke="#185FA5" strokeWidth="1" fill="none"/><path d="M4 16 Q12 12 20 16" stroke="#185FA5" strokeWidth=".8" fill="none"/></svg>
  }
];

export const timelineData = [
  {
    date: 'Août 2024 — Présent',
    title: 'Administrateur Digital Workplace & Infrastructure',
    company: 'Neemba Togo',
    desc: 'Élaboration du budget IT, pilotage de la portabilité réseau mobile, supervision VSAT, support N2/N3, et optimisation via IA (Vibe Coding). Gestion de projets télécoms d\'envergure.',
    isCurrent: true
  },
  {
    date: 'Mai 2023 — Août 2024',
    title: 'Technicien Informatique',
    company: 'Neemba Togo',
    desc: 'Déploiement complet SIEM/XDR Wazuh — ambassadeur officiel de la solution. Maintenance du parc informatique et surveillance des performances réseau.',
    isCurrent: false
  },
  {
    date: 'Juin 2022 — Oct. 2022',
    title: 'Technicien Support & Système (Stage)',
    company: 'Orabank Togo',
    desc: 'Installation contrôleur de domaine Windows Server, configuration des solutions de transfert de fonds, support N2/N3 sur l\'ensemble des agences.',
    isCurrent: false
  },
  {
    date: 'Septembre 2021',
    title: 'Technicien Informatique (Stage)',
    company: 'Clinique BIASA',
    desc: 'Assistance aux utilisateurs et installation de services réseau sous Linux Ubuntu Server (DNS, DHCP, Apache, NAT). Formation des équipes internes.',
    isCurrent: false
  }
];

export const formationData = [
  {
    year: '2024 — 2025',
    title: 'Master II Professionnel',
    school: 'Collège de Paris Supérieur · Lomé<br />Réseaux & Systèmes d\'Information',
    gradeNode: <div className="edu-grade"><big>15,07</big><span>/ 20 · Mention Bien</span></div>
  },
  {
    year: '2022 — 2023',
    title: 'Licence Professionnelle',
    school: 'IAI-TOGO · Institut Africain d\'Informatique<br />Administration Système & Réseau',
    gradeNode: <p className="edu-check">✓ Diplôme obtenu</p>
  }
];
