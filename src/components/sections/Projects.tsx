import React from 'react';

interface ProjectsProps {
  onProjectClick: (id: string) => void;
  onViewAll: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick, onViewAll }) => {
  return (
    <section className="sec" id="projets">
      <div className="sec-hdr">
        <span className="sec-num">06</span>
        <h2 className="sec-ttl">Mes réalisations.</h2>
        <span className="sec-sub">
          6 projets techniques livrés, chacun résolvant un problème réel.
        </span>
      </div>

      <button
        type="button"
        className="proj-feat card-action"
        onClick={() => onProjectClick('siem')}
        aria-label="Voir le détail du projet Déploiement SIEM XDR Wazuh"
      >
        <div className="pf-vis" style={{ background: '#2C3E2E' }}>
          <div
            className="cat-b"
            style={{ background: 'rgba(212,149,106,.2)', color: '#D4956A' }}
          >
            Cybersécurité · Projet phare
          </div>
          <svg width="80" height="80" viewBox="0 0 90 90" fill="none" style={{ opacity: '.3' }}>
            <path
              d="M45 10L75 24L75 48C75 64 60 76 45 80C30 76 15 64 15 48L15 24Z"
              stroke="#D4956A"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="45" cy="46" r="13" stroke="#D4956A" strokeWidth="1.5" fill="none" />
            <circle cx="45" cy="46" r="5" fill="#D4956A" opacity=".6" />
            <line x1="45" y1="24" x2="45" y2="33" stroke="#D4956A" />
            <line x1="45" y1="59" x2="45" y2="68" stroke="#D4956A" />
            <line x1="23" y1="46" x2="32" y2="46" stroke="#D4956A" />
            <line x1="58" y1="46" x2="67" y2="46" stroke="#D4956A" />
          </svg>
        </div>
        <div className="pf-body">
          <div>
            <p className="pf-eye">- Projet 01 · Phare</p>
            <h3 className="pf-title">Déploiement SIEM / XDR Wazuh</h3>
            <p className="pf-co">Neemba Togo · 2023-2024</p>
            <p className="pf-desc">
              Déploiement complet d&apos;une solution SIEM/XDR Wazuh sur l&apos;ensemble du parc.
              Détection d&apos;intrusion, corrélation d&apos;événements et dashboards temps réel.
            </p>
            <div className="res-box">
              <div className="res-lbl">Résultat clé</div>
              <div className="res-val">
                100 % des endpoints couverts · Détection proactive activée
              </div>
            </div>
          </div>
          <div className="pf-foot-row">
            <div className="tags">
              <span className="tag tc">Wazuh</span>
              <span className="tag tc">SIEM</span>
              <span className="tag tc">XDR</span>
            </div>
            <span className="detail-link">Voir le détail →</span>
          </div>
        </div>
      </button>

      <div className="pj-grid">
        <button
          type="button"
          className="pj-card card-action"
          onClick={() => onProjectClick('moov')}
          aria-label="Voir le détail du projet Portabilité MOOV vers Togocom"
        >
          <div className="pj-vis" style={{ background: '#2B3A4A' }}>
            <div
              className="cat-b"
              style={{ background: 'rgba(123,191,208,.2)', color: '#7BBFD0' }}
            >
              Télécom
            </div>
            <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
              <circle cx="30" cy="30" r="20" stroke="#7BBFD0" strokeWidth="1.5" fill="none" />
              <circle cx="30" cy="30" r="12" stroke="#7BBFD0" strokeWidth="1" fill="none" />
              <circle cx="30" cy="30" r="5" stroke="#7BBFD0" strokeWidth="1" fill="none" />
              <circle cx="30" cy="30" r="2" fill="#7BBFD0" />
            </svg>
          </div>
          <div className="pj-body">
            <h3 className="pj-title">Portabilité MOOV → Togocom</h3>
            <p className="pj-co">Neemba Togo · 2024</p>
            <p className="pj-desc">
              Migration complète réseau mobile avec supervision VSAT et zéro interruption.
            </p>
            <div className="pj-foot">
              <div className="tags">
                <span className="tag tt">VSAT</span>
                <span className="tag tt">Migration</span>
              </div>
              <span className="pj-arrow">→</span>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="pj-card card-action"
          onClick={() => onProjectClick('orabank')}
          aria-label="Voir le détail du projet Contrôleur de domaine Orabank"
        >
          <div className="pj-vis" style={{ background: '#3A2C1E' }}>
            <div
              className="cat-b"
              style={{ background: 'rgba(200,168,90,.2)', color: '#C8A85A' }}
            >
              Réseau
            </div>
            <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
              <rect x="20" y="8" width="20" height="12" rx="2" stroke="#C8A85A" strokeWidth="1.5" fill="none" />
              <rect x="8" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" />
              <rect x="36" y="34" width="16" height="10" rx="2" stroke="#C8A85A" strokeWidth="1" fill="none" />
              <line x1="30" y1="20" x2="30" y2="34" stroke="#C8A85A" />
              <line x1="16" y1="28" x2="44" y2="28" stroke="#C8A85A" />
              <line x1="16" y1="28" x2="16" y2="34" stroke="#C8A85A" />
              <line x1="44" y1="28" x2="44" y2="34" stroke="#C8A85A" />
            </svg>
          </div>
          <div className="pj-body">
            <h3 className="pj-title">Contrôleur de Domaine Orabank</h3>
            <p className="pj-co">Orabank Togo · Stage 2022</p>
            <p className="pj-desc">
              Windows Server AD, GPO et politiques de sécurité multi-agences.
            </p>
            <div className="pj-foot">
              <div className="tags">
                <span className="tag tr">Windows Server</span>
                <span className="tag tr">AD</span>
              </div>
              <span className="pj-arrow">→</span>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="pj-card card-action"
          onClick={() => onProjectClick('biasa')}
          aria-label="Voir le détail du projet Services réseau Linux BIASA"
        >
          <div className="pj-vis" style={{ background: '#2A3830' }}>
            <div
              className="cat-b"
              style={{ background: 'rgba(125,196,160,.2)', color: '#7DC4A0' }}
            >
              Linux
            </div>
            <svg width="45" height="45" viewBox="0 0 60 60" fill="none" style={{ opacity: '.35' }}>
              <rect x="10" y="16" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1.5" fill="none" />
              <rect x="10" y="28" width="40" height="8" rx="2" stroke="#7DC4A0" strokeWidth="1" fill="none" />
              <circle cx="44" cy="20" r="2" fill="#7DC4A0" />
              <line x1="18" y1="40" x2="42" y2="40" stroke="#7DC4A0" />
              <line x1="30" y1="36" x2="30" y2="44" stroke="#7DC4A0" />
            </svg>
          </div>
          <div className="pj-body">
            <h3 className="pj-title">Services Réseau Linux · BIASA</h3>
            <p className="pj-co">Clinique BIASA · Stage 2021</p>
            <p className="pj-desc">
              DNS, DHCP, Apache, NAT sur Ubuntu Server - réseau créé from scratch.
            </p>
            <div className="pj-foot">
              <div className="tags">
                <span className="tag tl2">Ubuntu</span>
                <span className="tag tl2">DNS/DHCP</span>
              </div>
              <span className="pj-arrow">→</span>
            </div>
          </div>
        </button>
      </div>

      <div className="btn-center">
        <button type="button" className="kp-btn-dark" onClick={onViewAll}>
          Voir tous les projets
        </button>
      </div>
    </section>
  );
};

export default Projects;
