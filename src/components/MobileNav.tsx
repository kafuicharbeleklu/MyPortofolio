import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  activeSection: string;
  toggleMobileMenu: () => void;
  scrollToSection: (id: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isMobileMenuOpen,
  activeSection,
  toggleMobileMenu,
  scrollToSection,
}) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-nav"
          aria-label="Navigation mobile"
        >
          <button
            type="button"
            className="close-btn"
            onClick={toggleMobileMenu}
            aria-label="Fermer le menu"
          >
            ✕
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
                À propos
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
                Compétences
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
                Expérience
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
                Formation
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
                Projets
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
                Références
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
                Contact
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
