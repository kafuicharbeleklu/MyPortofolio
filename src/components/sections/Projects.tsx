import React from 'react';
import { t, Language } from '../../translations';
import useMobileScrollDots from '../../hooks/useMobileScrollDots';

type ProjectTag = {
  label: string;
  className: string;
};

type ProjectIcon = 'shield' | 'signal' | 'domain' | 'server' | 'cloud' | 'grid';

type ProjectPreview = {
  id: string;
  title: Record<Language, string>;
  companyLine: Record<Language, string>;
  desc: Record<Language, string>;
  category: Record<Language, string>;
  tags: ProjectTag[];
  background: string;
  accent: string;
  icon: ProjectIcon;
  coverImage?: string | null;
};

interface ProjectsProps {
  lang: Language;
  featuredProject: ProjectPreview;
  recentProjects: ProjectPreview[];
  onProjectClick: (id: string) => void;
  onViewAll: () => void;
}

const renderProjectIcon = (icon: ProjectIcon, accent: string) => {
  switch (icon) {
    case 'shield':
      return (
        <svg width="45" height="45" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}>
          <path
            d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z"
            stroke={accent}
            strokeWidth="2"
            fill="none"
          />
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
          <rect
            x="20"
            y="8"
            width="20"
            height="12"
            rx="2"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="8"
            y="34"
            width="16"
            height="10"
            rx="2"
            stroke={accent}
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="36"
            y="34"
            width="16"
            height="10"
            rx="2"
            stroke={accent}
            strokeWidth="1"
            fill="none"
          />
          <line x1="30" y1="20" x2="30" y2="34" stroke={accent} />
          <line x1="16" y1="28" x2="44" y2="28" stroke={accent} />
          <line x1="16" y1="28" x2="16" y2="34" stroke={accent} />
          <line x1="44" y1="28" x2="44" y2="34" stroke={accent} />
        </svg>
      );
    case 'server':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <rect
            x="10"
            y="16"
            width="40"
            height="8"
            rx="2"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="10"
            y="28"
            width="40"
            height="8"
            rx="2"
            stroke={accent}
            strokeWidth="1"
            fill="none"
          />
          <circle cx="44" cy="20" r="2" fill={accent} />
          <line x1="18" y1="40" x2="42" y2="40" stroke={accent} />
          <line x1="30" y1="36" x2="30" y2="44" stroke={accent} />
        </svg>
      );
    case 'cloud':
      return (
        <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
          <path
            d="M15 35C15 25 30 20 30 30C30 20 45 25 45 35C50 35 50 45 45 45L15 45C10 45 10 35 15 35Z"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
          />
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

const Projects: React.FC<ProjectsProps> = ({
  lang,
  featuredProject,
  recentProjects,
  onProjectClick,
  onViewAll,
}) => {
  const v = t[lang];
  const masonryProjects = recentProjects.slice(0, 4);
  const projectsCarousel = useMobileScrollDots(masonryProjects.length + 1);

  return (
    <section className="sec" id="projets">
      <div className="sec-hdr">
        <span className="sec-num">{v.projects.num}</span>
        <h2 className="sec-ttl">{lang === 'FR' ? 'Mes réalisations.' : 'Selected work.'}</h2>
        <span className="sec-sub">
          {lang === 'FR'
            ? 'Une sélection de projets techniques livrés, chacun répondant à un besoin concret.'
            : 'A selection of technical projects delivered to solve concrete operational needs.'}
        </span>
      </div>

      <div className="projects-main-grid" ref={projectsCarousel.containerRef}>
        <button
          type="button"
          className="proj-feat projects-featured card-action"
          onClick={() => onProjectClick(featuredProject.id)}
          ref={(node) => projectsCarousel.registerItem(0, node)}
          data-carousel-index={0}
          aria-label={
            lang === 'FR'
              ? `Voir le détail du projet ${featuredProject.title.FR}`
              : `View details of the ${featuredProject.title.EN} project`
          }
        >
          <div className="pf-vis" style={{ background: featuredProject.background }}>
            {featuredProject.coverImage ? (
              <img
                className="project-card-cover"
                src={featuredProject.coverImage}
                alt={featuredProject.title[lang]}
                loading="lazy"
              />
            ) : (
              renderProjectIcon(featuredProject.icon, featuredProject.accent)
            )}
          </div>
          <div className="pf-body">
            <div>
              <p className="pf-eye">{lang === 'FR' ? 'Projet phare' : 'Featured project'}</p>
              <h3 className="pf-title">{featuredProject.title[lang]}</h3>
              <p className="pf-co">{featuredProject.companyLine[lang]}</p>
              <p className="pf-desc">{featuredProject.desc[lang]}</p>
            </div>
            <div className="pf-foot-row">
              <div className="tags">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={`${featuredProject.id}-${tag.label}`}
                    className={`tag ${tag.className}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <span className="detail-link">
                {lang === 'FR' ? 'Voir le détail' : 'View details'} →
              </span>
            </div>
          </div>
        </button>

        {masonryProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="pj-card card-action"
            onClick={() => onProjectClick(project.id)}
            ref={(node) => projectsCarousel.registerItem(index + 1, node)}
            data-carousel-index={index + 1}
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
                  {project.tags.map((tag) => (
                    <span key={`${project.id}-${tag.label}`} className={`tag ${tag.className}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {masonryProjects.length > 0 ? (
        <div
          className="carousel-dots mobile-scroll-dots project-mobile-dots"
          aria-label={lang === 'FR' ? 'Position dans les réalisations' : 'Project position'}
        >
          {[featuredProject, ...masonryProjects].map((project, index) => (
            <button
              key={`project-dot-${project.id}`}
              type="button"
              className={`carousel-dot ${projectsCarousel.activeIndex === index ? 'active' : ''}`}
              onClick={() => projectsCarousel.scrollToIndex(index)}
              aria-label={
                lang === 'FR' ? `Voir le projet ${index + 1}` : `View project ${index + 1}`
              }
              aria-current={projectsCarousel.activeIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
      ) : null}

      <div className="btn-center">
        <button type="button" className="kp-btn-dark" onClick={onViewAll}>
          {v.projects.allProjectsTitle}
        </button>
      </div>
    </section>
  );
};

export default Projects;
