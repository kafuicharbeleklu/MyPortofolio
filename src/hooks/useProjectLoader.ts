import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { StructuredProjectData } from '../types/portfolio';

type LoaderConfig = {
  dataPath: string;
};

type ProjectsMap<ProjectId extends string> = Partial<
  Record<ProjectId, StructuredProjectData | null>
>;

const useProjectLoader = <ProjectId extends string>(
  configs: Record<ProjectId, LoaderConfig>,
  resolvePath: (path: string) => string
) => {
  const [projects, setProjects] = useState<ProjectsMap<ProjectId>>({});
  const [loadingMap, setLoadingMap] = useState<Partial<Record<ProjectId, boolean>>>({});
  const projectsRef = useRef(projects);
  const inFlightRef = useRef<Partial<Record<ProjectId, Promise<StructuredProjectData | null>>>>(
    {}
  );

  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  const loadProjectDetail = useCallback(
    async (projectId: ProjectId) => {
      const existingProject = projectsRef.current[projectId];
      if (existingProject !== undefined) {
        return existingProject;
      }

      const inFlightRequest = inFlightRef.current[projectId];
      if (inFlightRequest) {
        return inFlightRequest;
      }

      const config = configs[projectId];
      if (!config) {
        return null;
      }

      setLoadingMap((current) => ({
        ...current,
        [projectId]: true,
      }));

      const request = (async () => {
        try {
          const response = await fetch(resolvePath(config.dataPath));
          if (!response.ok) {
            throw new Error(`Unable to load ${config.dataPath}`);
          }

          const payload = (await response.json()) as StructuredProjectData[];
          const nextProject = payload[0] ?? null;

          setProjects((current) => ({
            ...current,
            [projectId]: nextProject,
          }));

          return nextProject;
        } catch (error) {
          console.error(`Failed to load structured project data for ${projectId}`, error);
          setProjects((current) => ({
            ...current,
            [projectId]: null,
          }));
          return null;
        } finally {
          setLoadingMap((current) => {
            const next = { ...current };
            delete next[projectId];
            return next;
          });
          delete inFlightRef.current[projectId];
        }
      })();

      inFlightRef.current[projectId] = request;
      return request;
    },
    [configs, resolvePath]
  );

  const isLoading = useMemo(
    () => Object.values(loadingMap).some(Boolean),
    [loadingMap]
  );

  return {
    projects,
    isLoading,
    loadProjectDetail,
  };
};

export default useProjectLoader;
