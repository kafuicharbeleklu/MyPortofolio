import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.expertise': 'Expertise',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.role': 'Security & AI Engineer',
    
    // Hero
    'hero.available': 'Available for new opportunities',
    'hero.badge1': 'Systems Engineer',
    'hero.badge2': 'AI Builder',
    'hero.title1': 'Cybersecurity &',
    'hero.title2': 'AI-Driven Systems',
    'hero.desc': 'Building Secure, Intelligent and Scalable IT Solutions. I design secure infrastructures, automate governance processes, and integrate AI into real-world enterprise systems.',
    'hero.cta.projects': 'View my Projects',
    'hero.cta.resume': 'Download my CV (PDF)',
    
    // About
    'about.title': 'Who I Am',
    'about.p1': 'I am Charbel Kafui Eklu, a Master II graduate in Networks & Information Systems. My journey started in the demanding environment of banking IT at Orabank, where rigor and compliance are non-negotiable.',
    'about.p2': 'Currently, as a Digital Workplace Administrator at Neemba Togo (official dealer of Caterpillar), I manage complex infrastructures while driving digital transformation.',
    'about.p3': "I don't just manage servers; I build intelligent systems on top of them. My evolution from Banking to Industrial IT has shaped my vision: integrating Intelligent Automation and Security Engineering to solve real business problems.",
    'about.card1.title': 'Infrastructure',
    'about.card1.desc': 'Robust & Scalable',
    'about.card2.title': 'Security Mindset',
    'about.card2.desc': 'Governance & Compliance',
    'about.card3.title': 'AI Integration',
    'about.card3.desc': 'Business Processes',
    'about.card4.title': 'Architecture',
    'about.card4.desc': 'Microservices Thinking',
    
    // Expertise
    'expertise.title': 'Core Expertise',
    'expertise.desc': 'I bridge the gap between traditional infrastructure, modern security practices, and next-generation AI tools.',
    'expertise.card1.title': 'Cybersecurity & Governance',
    'expertise.card1.s1': 'Microsoft 365 & Azure security hardening',
    'expertise.card1.s2': 'IAM & access governance',
    'expertise.card1.s3': 'IT asset lifecycle control',
    'expertise.card1.s4': 'Security-aware architecture design',
    'expertise.card1.s5': 'SIEM (Wazuh) & Log Analysis',
    'expertise.card2.title': 'Cloud & Infrastructure',
    'expertise.card2.s1': 'Azure environments',
    'expertise.card2.s2': 'Linux & Windows Server administration',
    'expertise.card2.s3': 'Virtualization (VMware, Hyper-V)',
    'expertise.card2.s4': 'Monitoring & reliability',
    'expertise.card2.s5': 'High-availability clusters',
    'expertise.card3.title': 'AI & Automation',
    'expertise.card3.s1': 'AI-assisted document analysis',
    'expertise.card3.s2': 'Intelligent workflow automation (Power Platform)',
    'expertise.card3.s3': 'Data-driven reporting (Power BI)',
    'expertise.card3.s4': 'Internal productivity tools',
    'expertise.card3.s5': 'LLM API Integration (Gemini)',
    
    // Tech Stack
    'tech.title': 'Technologies & Tools',
    
    // Experience
    'exp.title': 'Experience & Education',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.desc': 'Real-world solutions built to solve complex business and security challenges.',
    'projects.problem': 'Problem',
    'projects.solution': 'Solution',
    'projects.impact': 'Impact',
    'projects.seeAll': 'See all projects',
    'projects.p1.title': 'Intelligent IT Asset Management System',
    'projects.p1.problem': 'Manual asset tracking, lack of approval workflow, and poor visibility into asset lifecycle.',
    'projects.p1.solution': 'Built a Power Apps-based system with a 3-level validation workflow and strict governance model.',
    'projects.p1.i1': 'Improved traceability',
    'projects.p1.i2': 'Reduced asset loss risk',
    'projects.p1.i3': 'Strengthened IT governance',
    'projects.p2.title': 'AI-Powered Security Analysis',
    'projects.p2.problem': 'Complex security event logs requiring manual interpretation and slow triage times.',
    'projects.p2.solution': 'Designed an AI-assisted analysis system integrating Gemini API with Wazuh SIEM for automated event evaluation.',
    'projects.p2.i1': 'Faster incident triage',
    'projects.p2.i2': 'Better decision support',
    'projects.p2.i3': 'Reduced human error',
    'projects.p3.title': 'Budget & IT Reporting Automation',
    'projects.p3.problem': 'Lack of centralized visibility on IT expenses and asset performance across the organization.',
    'projects.p3.solution': 'Built comprehensive Power BI dashboards integrated with internal data sources and Matrix42.',
    'projects.p3.i1': 'Strategic decision-making',
    'projects.p3.i2': 'Budget optimization',
    'projects.p3.i3': 'Executive visibility',
    'projects.p4.title': 'Secure Enterprise Infrastructure & IAM',
    'projects.p4.problem': 'Need for robust, highly available, and secure network services for remote and on-premise users.',
    'projects.p4.solution': 'Deployed high-availability DHCP clusters, migrated Windows Servers, and configured FreeRadius with 2FA for OpenVPN.',
    'projects.p4.i1': 'Zero-downtime migrations',
    'projects.p4.i2': 'Enhanced remote access security',
    'projects.p4.i3': 'Scalable infrastructure',
    
    // Philosophy
    'philosophy.title': 'My Philosophy',
    'philosophy.quote': '"Security is not just protection. It is detection, automation, and intelligence."',
    'philosophy.desc': 'I believe the future of cybersecurity lies in AI-assisted defense systems where monitoring, analysis, and response become semi-autonomous. We must build systems that not only resist attacks but learn from them in real-time.',
    'philosophy.vision.title': 'Vision',
    'philosophy.vision.desc1': 'My goal is to evolve toward a ',
    'philosophy.vision.desc2': 'Security & AI Architect',
    'philosophy.vision.desc3': ' capable of designing next-generation defensive systems where infrastructure, data, and artificial intelligence work together.',
    'philosophy.vision.i1': 'Cloud Security Engineering',
    'philosophy.vision.i2': 'SOC Architecture',
    'philosophy.vision.i3': 'AI-Driven Threat Analysis',
    'philosophy.vision.i4': 'Secure Microservices Design',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.desc': "I'm currently looking for new opportunities in Security Engineering, Cloud Security, or AI-driven IT Solutions. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    'contact.hello': 'Say Hello',
    
    // Footer
    'footer.text': 'Designed & Built by Charbel Kafui Eklu',
    
    // Project Details
    'project.back': 'Back to Portfolio',
    'project.dashboard': 'Dashboard Overview',
    'project.confidential': 'Confidential Data Blurred',
    'project.script': 'Automation Script',
    'project.notFound': 'Project Not Found',
    'project.backHome': 'Back to Home'
  },
  fr: {
    // Navbar
    'nav.about': 'À propos',
    'nav.expertise': 'Expertise',
    'nav.experience': 'Parcours',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.resume': 'CV',
    'nav.role': 'Ingénieur Sécurité & IA',
    
    // Hero
    'hero.available': 'À l\'écoute de nouvelles opportunités',
    'hero.badge1': 'Ingénieur Systèmes',
    'hero.badge2': 'Créateur IA',
    'hero.title1': 'Cybersécurité &',
    'hero.title2': 'Systèmes pilotés par l\'IA',
    'hero.desc': 'Conception de solutions informatiques sécurisées, intelligentes et évolutives. Je conçois des infrastructures sécurisées, automatise les processus de gouvernance et intègre l\'IA dans des systèmes d\'entreprise réels.',
    'hero.cta.projects': 'Voir mes Projets',
    'hero.cta.resume': 'Télécharger mon CV (PDF)',
    
    // About
    'about.title': 'Qui suis-je',
    'about.p1': 'Je suis Charbel Kafui Eklu, diplômé d\'un Master II en Réseaux & Systèmes d\'Information. Mon parcours a commencé dans l\'environnement exigeant de l\'informatique bancaire chez Orabank, où la rigueur et la conformité sont non négociables.',
    'about.p2': 'Actuellement Administrateur Digital Workplace chez Neemba Togo (concessionnaire officiel Caterpillar), je gère des infrastructures complexes tout en pilotant la transformation numérique.',
    'about.p3': "Je ne me contente pas de gérer des serveurs ; je construis des systèmes intelligents par-dessus. Mon évolution de l'informatique bancaire à l'informatique industrielle a façonné ma vision : intégrer l'automatisation intelligente et l'ingénierie de sécurité pour résoudre de vrais problèmes métiers.",
    'about.card1.title': 'Infrastructure',
    'about.card1.desc': 'Robuste & Évolutive',
    'about.card2.title': 'Esprit Sécurité',
    'about.card2.desc': 'Gouvernance & Conformité',
    'about.card3.title': 'Intégration IA',
    'about.card3.desc': 'Processus Métiers',
    'about.card4.title': 'Architecture',
    'about.card4.desc': 'Approche Microservices',
    
    // Expertise
    'expertise.title': 'Expertise Principale',
    'expertise.desc': 'Je fais le pont entre l\'infrastructure traditionnelle, les pratiques de sécurité modernes et les outils d\'IA de nouvelle génération.',
    'expertise.card1.title': 'Cybersécurité & Gouvernance',
    'expertise.card1.s1': 'Durcissement de la sécurité Microsoft 365 & Azure',
    'expertise.card1.s2': 'IAM & gouvernance des accès',
    'expertise.card1.s3': 'Contrôle du cycle de vie des actifs informatiques',
    'expertise.card1.s4': 'Conception d\'architecture orientée sécurité',
    'expertise.card1.s5': 'SIEM (Wazuh) & Analyse de logs',
    'expertise.card2.title': 'Cloud & Infrastructure',
    'expertise.card2.s1': 'Environnements Azure',
    'expertise.card2.s2': 'Administration Linux & Windows Server',
    'expertise.card2.s3': 'Virtualisation (VMware, Hyper-V)',
    'expertise.card2.s4': 'Supervision & fiabilité',
    'expertise.card2.s5': 'Clusters haute disponibilité',
    'expertise.card3.title': 'IA & Automatisation',
    'expertise.card3.s1': 'Analyse de documents assistée par l\'IA',
    'expertise.card3.s2': 'Automatisation intelligente des flux (Power Platform)',
    'expertise.card3.s3': 'Reporting orienté données (Power BI)',
    'expertise.card3.s4': 'Outils de productivité internes',
    'expertise.card3.s5': 'Intégration API LLM (Gemini)',
    
    // Tech Stack
    'tech.title': 'Technologies & Outils',
    
    // Experience
    'exp.title': 'Parcours & Formation',
    
    // Projects
    'projects.title': 'Projets Phares',
    'projects.desc': 'Des solutions concrètes conçues pour résoudre des défis métiers et de sécurité complexes.',
    'projects.problem': 'Problème',
    'projects.solution': 'Solution',
    'projects.impact': 'Impact',
    'projects.seeAll': 'Voir tous les projets',
    'projects.p1.title': 'Système Intelligent de Gestion des Actifs IT',
    'projects.p1.problem': 'Suivi manuel des actifs, manque de flux d\'approbation et mauvaise visibilité sur le cycle de vie des actifs.',
    'projects.p1.solution': 'Création d\'un système basé sur Power Apps avec un flux de validation à 3 niveaux et un modèle de gouvernance strict.',
    'projects.p1.i1': 'Traçabilité améliorée',
    'projects.p1.i2': 'Réduction du risque de perte d\'actifs',
    'projects.p1.i3': 'Gouvernance IT renforcée',
    'projects.p2.title': 'Analyse de Sécurité Propulsée par l\'IA',
    'projects.p2.problem': 'Journaux d\'événements de sécurité complexes nécessitant une interprétation manuelle et des temps de tri lents.',
    'projects.p2.solution': 'Conception d\'un système d\'analyse assisté par l\'IA intégrant l\'API Gemini avec Wazuh SIEM pour l\'évaluation automatisée des événements.',
    'projects.p2.i1': 'Tri des incidents plus rapide',
    'projects.p2.i2': 'Meilleure aide à la décision',
    'projects.p2.i3': 'Réduction des erreurs humaines',
    'projects.p3.title': 'Automatisation du Budget & Reporting IT',
    'projects.p3.problem': 'Manque de visibilité centralisée sur les dépenses informatiques et la performance des actifs à travers l\'organisation.',
    'projects.p3.solution': 'Création de tableaux de bord Power BI complets intégrés aux sources de données internes et à Matrix42.',
    'projects.p3.i1': 'Prise de décision stratégique',
    'projects.p3.i2': 'Optimisation du budget',
    'projects.p3.i3': 'Visibilité exécutive',
    'projects.p4.title': 'Infrastructure d\'Entreprise Sécurisée & IAM',
    'projects.p4.problem': 'Besoin de services réseau robustes, hautement disponibles et sécurisés pour les utilisateurs distants et sur site.',
    'projects.p4.solution': 'Déploiement de clusters DHCP haute disponibilité, migration de serveurs Windows et configuration de FreeRadius avec 2FA pour OpenVPN.',
    'projects.p4.i1': 'Migrations sans interruption',
    'projects.p4.i2': 'Sécurité de l\'accès à distance améliorée',
    'projects.p4.i3': 'Infrastructure évolutive',
    
    // Philosophy
    'philosophy.title': 'Ma Philosophie',
    'philosophy.quote': '"La sécurité n\'est pas seulement de la protection. C\'est de la détection, de l\'automatisation et de l\'intelligence."',
    'philosophy.desc': 'Je crois que l\'avenir de la cybersécurité réside dans les systèmes de défense assistés par l\'IA où la surveillance, l\'analyse et la réponse deviennent semi-autonomes. Nous devons construire des systèmes qui non seulement résistent aux attaques mais en tirent des leçons en temps réel.',
    'philosophy.vision.title': 'Vision',
    'philosophy.vision.desc1': 'Mon objectif est d\'évoluer vers un poste d\'',
    'philosophy.vision.desc2': 'Architecte Sécurité & IA',
    'philosophy.vision.desc3': ' capable de concevoir des systèmes défensifs de nouvelle génération où l\'infrastructure, les données et l\'intelligence artificielle travaillent ensemble.',
    'philosophy.vision.i1': 'Ingénierie Sécurité Cloud',
    'philosophy.vision.i2': 'Architecture SOC',
    'philosophy.vision.i3': 'Analyse des Menaces par l\'IA',
    'philosophy.vision.i4': 'Conception Sécurisée de Microservices',
    
    // Contact
    'contact.title': 'Me Contacter',
    'contact.desc': "Je suis actuellement à la recherche de nouvelles opportunités en Ingénierie de Sécurité, Sécurité Cloud ou Solutions IT pilotées par l'IA. Que vous ayez une question ou que vous vouliez simplement dire bonjour, je ferai de mon mieux pour vous répondre !",
    'contact.hello': 'Dire Bonjour',
    
    // Footer
    'footer.text': 'Conçu & Développé par Charbel Kafui Eklu',
    
    // Project Details
    'project.back': 'Retour au Portfolio',
    'project.dashboard': 'Aperçu du Tableau de Bord',
    'project.confidential': 'Données Confidentielles Floutées',
    'project.script': 'Script d\'Automatisation',
    'project.notFound': 'Projet Introuvable',
    'project.backHome': 'Retour à l\'Accueil'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
