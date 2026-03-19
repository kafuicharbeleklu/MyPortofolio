import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ActivePage,
  ActiveSection,
  NavigableSection,
  StaticDetailPage,
} from '../types/portfolio';

export const navigableSections = [
  'hero',
  'about',
  'skills',
  'parcours',
  'formation',
  'projets',
  'refs',
  'contact',
] as const;

export const staticDetailPages = ['siem', 'moov', 'orabank', 'biasa'] as const;

export const isNavigableSection = (value: string): value is NavigableSection =>
  navigableSections.includes(value as NavigableSection);

export const isStaticDetailPage = (value: string): value is StaticDetailPage =>
  staticDetailPages.includes(value as StaticDetailPage);

export const createIsDetailPage =
  <ProjectId extends string>(projectIds: readonly ProjectId[]) =>
  (value: string): value is Exclude<ActivePage<ProjectId>, 'main' | 'all-projects'> =>
    value === 'biography' ||
    isStaticDetailPage(value) ||
    projectIds.includes(value as ProjectId);

type UseLocalRoutingOptions<ProjectId extends string> = {
  initialPage?: ActivePage<ProjectId>;
  onSectionNavigation?: (section: NavigableSection) => void;
};

const useLocalRouting = <ProjectId extends string>({
  initialPage = 'main' as ActivePage<ProjectId>,
  onSectionNavigation,
}: UseLocalRoutingOptions<ProjectId> = {}) => {
  const [activePage, setActivePage] = useState<ActivePage<ProjectId>>(initialPage);
  const [activeSection, setActiveSection] = useState<ActiveSection>('');
  const pendingSectionRef = useRef<NavigableSection | null>(null);

  useEffect(() => {
    if (activePage !== 'main' || !pendingSectionRef.current) {
      return;
    }

    const nextSection = pendingSectionRef.current;
    const timeoutId = window.setTimeout(() => {
      onSectionNavigation?.(nextSection);
    }, 100);

    pendingSectionRef.current = null;

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activePage, onSectionNavigation]);

  const navigateTo = useCallback((page: ActivePage<ProjectId>) => {
    setActivePage(page);
  }, []);

  const navigateToSection = useCallback(
    (section: NavigableSection) => {
      setActiveSection(section);

      if (activePage !== 'main') {
        pendingSectionRef.current = section;
        setActivePage('main');
        return;
      }

      onSectionNavigation?.(section);
    },
    [activePage, onSectionNavigation]
  );

  const setObservedSection = useCallback((section: ActiveSection) => {
    setActiveSection(section);
  }, []);

  return {
    activePage,
    activeSection,
    navigateTo,
    navigateToSection,
    setObservedSection,
  };
};

export default useLocalRouting;
