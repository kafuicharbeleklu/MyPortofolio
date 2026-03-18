import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { t, Language } from '../translations';

interface MobileNavProps {
  lang: Language;
  isMobileMenuOpen: boolean;
  activeSection: string;
  toggleMobileMenu: () => void;
  scrollToSection: (id: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  lang,
  isMobileMenuOpen,
  activeSection,
  toggleMobileMenu,
  scrollToSection,
}) => {
  const v = t[lang];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-nav"
          aria-label={lang === 'FR' ? 'Navigation mobile' : 'Mobile navigation'}
        >
          <button
            type="button"
            className="close-btn"
            onClick={toggleMobileMenu}
            aria-label={lang === 'FR' ? 'Fermer le menu' : 'Close menu'}
          >
            ×
          </button>
          <ul className="mobile-nav-links">
            <li>
              <a
                href="#about"
                className={activeSection === 'about' ? 'active' : ''}
                aria-current={activeSection === 'about' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                {v.nav.about}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeSection === 'skills' ? 'active' : ''}
                aria-current={activeSection === 'skills' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
              >
                {v.nav.skills}
              </a>
            </li>
            <li>
              <a
                href="#parcours"
                className={activeSection === 'parcours' ? 'active' : ''}
                aria-current={activeSection === 'parcours' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('parcours');
                }}
              >
                {v.nav.experience}
              </a>
            </li>
            <li>
              <a
                href="#formation"
                className={activeSection === 'formation' ? 'active' : ''}
                aria-current={activeSection === 'formation' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('formation');
                }}
              >
                {v.nav.education}
              </a>
            </li>
            <li>
              <a
                href="#projets"
                className={activeSection === 'projets' ? 'active' : ''}
                aria-current={activeSection === 'projets' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projets');
                }}
              >
                {v.nav.projects}
              </a>
            </li>
            <li>
              <a
                href="#refs"
                className={activeSection === 'refs' ? 'active' : ''}
                aria-current={activeSection === 'refs' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('refs');
                }}
              >
                {v.nav.references}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                {v.nav.contact}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
