import React from 'react';
import type { LightboxItem } from '../types/portfolio';

interface ProjectDetailPageProps {
  pageId: string;
  isActive: boolean;
  navTag: React.ReactNode;
  onNavigateHome: () => void;
  onBack: () => void;
  backLabel: React.ReactNode;
  children: React.ReactNode;
}

interface ProjectDetailLightboxProps {
  lightbox: {
    items: LightboxItem[];
    index: number;
  } | null;
  onClose: () => void;
  onStep: (delta: number) => void;
  onGoTo: (index: number) => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  pageId,
  isActive,
  navTag,
  onNavigateHome,
  onBack,
  backLabel,
  children,
}) => {
  return (
    <div className={`page ${isActive ? 'active' : ''}`} id={`page-${pageId}`}>
      <nav className="nav">
        <button type="button" className="nav-logo nav-control-btn" onClick={onNavigateHome}>
          K · E
        </button>
        <button type="button" className="nav-back nav-control-btn" onClick={onBack}>
          {backLabel}
        </button>
        <div className="nav-tag">{navTag}</div>
      </nav>
      {children}
    </div>
  );
};

export const ProjectDetailLightbox: React.FC<ProjectDetailLightboxProps> = ({
  lightbox,
  onClose,
  onStep,
  onGoTo,
}) => {
  if (!lightbox) {
    return null;
  }

  const currentItem = lightbox.items[lightbox.index];
  const meta = currentItem.meta;
  const fallbackProjectName = meta?.title || currentItem.alt;
  const normalizedAlt = currentItem.alt.trim().toLowerCase();
  const genericAltCandidates = [
    `${fallbackProjectName} screenshot`.toLowerCase(),
    `${fallbackProjectName} capture`.toLowerCase(),
  ];
  const hasSpecificCaption =
    Boolean(currentItem.alt.trim()) && !genericAltCandidates.includes(normalizedAlt);
  const displayCaption = hasSpecificCaption ? currentItem.alt : fallbackProjectName;

  return (
    <div
      className="project-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Project image preview"
      onClick={onClose}
    >
      <button
        type="button"
        className="project-image-lightbox-close"
        aria-label="Close image preview"
        onClick={onClose}
      >
        ×
      </button>

      <div
        className="project-image-lightbox-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-image-lightbox-media">
          <img
            className="project-image-lightbox-image"
            src={currentItem.src}
            alt={currentItem.alt}
          />

          {lightbox.items.length > 1 ? (
            <>
              <button
                type="button"
                className="project-image-lightbox-nav project-image-lightbox-nav-prev"
                aria-label="Previous image"
                onClick={() => onStep(-1)}
                disabled={lightbox.index === 0}
              >
                ‹
              </button>
              <button
                type="button"
                className="project-image-lightbox-nav project-image-lightbox-nav-next"
                aria-label="Next image"
                onClick={() => onStep(1)}
                disabled={lightbox.index === lightbox.items.length - 1}
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        <aside className="project-image-lightbox-info">
          <div className="project-image-lightbox-copy">
            <p className="project-image-lightbox-counter">
              Image {lightbox.index + 1} / {lightbox.items.length}
            </p>
            {hasSpecificCaption ? (
              <p className="project-image-lightbox-caption">{displayCaption}</p>
            ) : (
              <p className="project-image-lightbox-project-name">{displayCaption}</p>
            )}
          </div>

          <div className="project-image-lightbox-info-footer">
            {lightbox.items.length > 1 ? (
              <div className="carousel-dots project-image-lightbox-dots">
                {lightbox.items.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    className={`carousel-dot ${lightbox.index === index ? 'active' : ''}`}
                    onClick={() => onGoTo(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={lightbox.index === index ? 'true' : undefined}
                  />
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className="project-image-lightbox-link"
              onClick={onClose}
            >
              Voir la page complète →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
