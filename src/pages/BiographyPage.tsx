import React from 'react';
import { assetPaths, withBaseAsset } from '../config/assets';
import type { Language } from '../translations';

type BioExpertiseItem = {
  label: string;
  className: string;
  href?: string;
  icon?: React.ReactNode;
};

interface BiographyPageProps {
  lang: Language;
  bioExpertiseItems: BioExpertiseItem[];
  scrollToSection: (id: string) => void;
}

const BiographyPage: React.FC<BiographyPageProps> = ({
  lang,
  bioExpertiseItems,
  scrollToSection,
}) => {
  return (
    <div className="page active" id="page-biography">
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

      <section className="bio-hero">
        <div className="bio-hero-photo">
          <img
            src={withBaseAsset(assetPaths.profilePortrait)}
            alt="Kafui Charbel Eklu"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="bio-hero-info">
          <p className="bio-hero-eyebrow">Biographie</p>
          <h1 className="bio-hero-name">
            EKLU Kafui
            <br />
            Charbel
          </h1>
          <p className="bio-hero-role">Administrateur Digital Workplace & Infrastructure</p>
          <div className="bio-hero-badges">
            <span className="badge-location">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  fill="currentColor"
                />
              </svg>
              {lang === 'FR' ? 'Lomé, Togo' : 'Lome, Togo'}
            </span>
            <span className="badge-mobility">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M8 2c0 0-3 2.5-3 6s3 6 3 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M8 2c0 0 3 2.5 3 6s-3 6-3 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path d="M2 8h12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {lang === 'FR' ? 'Mobilité internationale' : 'International mobility'}
            </span>
          </div>
        </div>
      </section>

      <section className="bio-stats">
        <div className="bio-stat">
          <span className="bio-stat-num">3+</span>
          <span className="bio-stat-label">
            Années d'expérience
            <br />
            Admin & Sécurité
          </span>
        </div>
        <div className="bio-stat">
          <span className="bio-stat-num">15+</span>
          <span className="bio-stat-label">
            Technologies
            <br />
            maîtrisées
          </span>
        </div>
        <div className="bio-stat">
          <span className="bio-stat-num">6</span>
          <span className="bio-stat-label">
            Projets techniques
            <br />
            livrés
          </span>
        </div>
        <div className="bio-stat">
          <span className="bio-stat-num bio-stat-text">Master II</span>
          <span className="bio-stat-label">
            Collège de Paris
            <br />
            Mention Bien
          </span>
        </div>
      </section>

      <section className="bio-story sec">
        <div className="sec-hdr">
          <span className="sec-num">01</span>
          <h2 className="sec-ttl">Mon histoire.</h2>
        </div>
        <div className="bio-story-grid">
          <div className="bio-story-main">
            <p className="bio-story-lead">
              Professionnel togolais de l'IT, je conçois des environnements numériques
              fiables, utiles et lisibles, avec une approche orientée impact.
            </p>
            <p>
              Spécialisé en{' '}
              <strong>
                Digital Workplace, support IT et optimisation des environnements de travail
              </strong>
              , j'évolue dans des contextes où la performance quotidienne compte autant que la
              solidité technique. Mon fil conducteur reste le même : simplifier l'usage,
              structurer les process et faire gagner du temps aux équipes.
            </p>
            <p>
              Au-delà de l'administration courante, j'aime transformer un besoin métier en
              solution concrète. J'ai notamment conçu une{' '}
              <strong>application de gestion de matériel IT</strong> avec suivi des équipements,
              affectations, restitutions et workflow de validation à trois niveaux, afin
              d'apporter plus de traçabilité, de gouvernance et de lisibilité aux opérations
              internes.
            </p>
            <p>
              Mon passage chez <strong>Orabank</strong> a renforcé cette exigence. Dans un
              environnement critique, j'ai consolidé mes bases sur Windows Server, Active
              Directory, GPO et le support avancé, avec une logique de fiabilité, de sécurité et
              de continuité de service qui guide encore aujourd'hui ma manière de travailler.
            </p>
            <p>
              Je m'intéresse particulièrement à l'intersection entre{' '}
              <strong>cybersécurité, open source et intelligence artificielle</strong>, avec un
              attrait fort pour la détection, l'automatisation et les architectures évolutives.
              Mon ambition est de faire converger ces trois dimensions dans des projets IT à forte
              valeur, localement comme à l'international.
            </p>
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

      <section className="bio-quote-section">
        <blockquote className="bio-quote">
          "Chaque défi surmonté est une occasion d'acquérir des compétences qui rendent les futurs
          obstacles plus simples."
        </blockquote>
      </section>

      <section className="bio-philosophy sec">
        <div className="sec-hdr">
          <span className="sec-num">02</span>
          <h2 className="sec-ttl">Ma philosophie.</h2>
        </div>
        <div className="bio-philosophy-grid">
          <div className="bio-philosophy-card">
            <div className="bio-philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>
            <h3>Anticiper, pas réagir</h3>
            <p>
              Chaque architecture que je conçois intègre la sécurité dès le départ. La détection
              proactive est plus efficace qu'une réponse post-incident.
            </p>
          </div>
          <div className="bio-philosophy-card">
            <div className="bio-philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="4,17 9,12 13,15 20,7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="4" cy="17" r="1.5" fill="currentColor" />
                <circle cx="20" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h3>Contrainte → Levier</h3>
            <p>
              Face aux imprévus — comme une panne critique — je reste maître du système. Chaque
              incident est une opportunité de perfectionnement.
            </p>
          </div>
          <div className="bio-philosophy-card">
            <div className="bio-philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity=".6" />
              </svg>
            </div>
            <h3>Amélioration continue</h3>
            <p>
              Je ne cesse d'apprendre et de me perfectionner. Élever son niveau au-dessus du défi,
              c'est ma signature professionnelle.
            </p>
          </div>
          <div className="bio-philosophy-card">
            <div className="bio-philosophy-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18V13a3 3 0 0 1 6 0v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path d="M5 21h14" stroke="currentColor" strokeWidth="1.5" />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <h3>Tech + Créatif</h3>
            <p>
              Mon profil hybride — technique et artistique — me permet d'apporter une vision
              unique, où rigueur et créativité se renforcent mutuellement.
            </p>
          </div>
        </div>
      </section>

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

      <section className="bio-cta">
        <a href={withBaseAsset(assetPaths.resume)} download className="kp-btn-dark bio-cta-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger mon CV
        </a>
        <button type="button" className="kp-btn-line" onClick={() => scrollToSection('contact')}>
          Me contacter →
        </button>
      </section>
    </div>
  );
};

export default BiographyPage;
