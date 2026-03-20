import type { Language } from '../translations';

export type ReferenceContact = {
  initials: string;
  name: string;
  organization: string;
  role: string;
  phones: {
    display: string;
    href: string;
  }[];
};

export type ProjectFilterKey =
  | 'all'
  | 'cybersecurity'
  | 'network'
  | 'cloud'
  | 'infrastructure'
  | 'bi';

export type ProjectTag = {
  label: string;
  className: string;
};

export type ProjectIcon =
  | 'shield'
  | 'signal'
  | 'domain'
  | 'server'
  | 'cloud'
  | 'grid';

export type ProjectCardData = {
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
  icon: ProjectIcon;
  coverImage?: string | null;
  detailPage: boolean;
};

export type StructuredProjectData = {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  status: string | null;
  duration: string | null;
  role: string | null;
  primary_language?: string;
  tech_stack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    devops?: string[];
    tools?: string[];
  };
  features: string[];
  challenges: string;
  learnings: string;
  links: {
    github: string | null;
    live: string | null;
    demo: string | null;
  };
  assets: {
    screenshots: string[];
    has_video: boolean;
  };
  keywords: string[];
};

export type StructuredProjectConfig = {
  dataPath: string;
  client: Record<Language, string>;
  role: Record<Language, string> | null;
  environment: Record<Language, string> | null;
  fallbackStatus: Record<Language, string> | null;
  relatedIds: string[];
  resourceLinks?: {
    href: string;
    label: Record<Language, string>;
  }[];
};

export type PaginationToken = number | 'ellipsis-left' | 'ellipsis-right';
export type StaticDetailPage = 'siem' | 'moov' | 'orabank' | 'biasa';
export type ActiveSection =
  | ''
  | 'hero'
  | 'about'
  | 'skills'
  | 'parcours'
  | 'formation'
  | 'projets'
  | 'refs'
  | 'contact';
export type NavigableSection = Exclude<ActiveSection, ''>;
export type ActivePage<ProjectId extends string = never> =
  | 'main'
  | 'biography'
  | 'all-projects'
  | StaticDetailPage
  | ProjectId;

export type SectionWithSubcopy = {
  sub?: string;
  subtitle?: string;
};

export type TranslationPageSections = {
  education?: {
    num: string;
    title: string;
    subtitle: string;
  };
  references?: {
    num: string;
    title: string;
    subtitle: string;
  };
  skills: SectionWithSubcopy;
  experience: SectionWithSubcopy;
};

export type LightboxItem = {
  src: string;
  alt: string;
  meta?: {
    badge: string;
    title: string;
    companyLine: string;
    description: string;
    tags: string[];
    detailLabel: string;
  };
};
