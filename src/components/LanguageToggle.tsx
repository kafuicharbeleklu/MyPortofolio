import React, { useEffect, useRef, useState } from 'react';
import { Language, t } from '../translations';

interface LanguageToggleProps {
  lang: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const v = t[lang];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (nextLang: Language) => {
    onToggle(nextLang);
    setIsOpen(false);
  };

  return (
    <div className="lang-toggle-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="lang-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={v.language.label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <ellipse cx="12" cy="12" rx="4" ry="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
        <span className="lang-toggle-current">{lang}</span>
      </button>

      {isOpen && (
        <div className="lang-panel" role="menu" aria-label={v.language.label}>
          <button
            type="button"
            className={`lang-option ${lang === 'FR' ? 'active' : ''}`}
            onClick={() => handleSelect('FR')}
            role="menuitemradio"
            aria-checked={lang === 'FR'}
          >
            <span className="lang-option-code">FR</span>
            <span className="lang-option-name">{t.FR.language.french}</span>
          </button>
          <button
            type="button"
            className={`lang-option ${lang === 'EN' ? 'active' : ''}`}
            onClick={() => handleSelect('EN')}
            role="menuitemradio"
            aria-checked={lang === 'EN'}
          >
            <span className="lang-option-code">EN</span>
            <span className="lang-option-name">{t.EN.language.english}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
