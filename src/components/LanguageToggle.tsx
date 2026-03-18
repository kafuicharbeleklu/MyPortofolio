import React, { useEffect, useRef, useState } from 'react';
import { Language, t } from '../translations';

interface LanguageToggleProps {
  lang: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragTop, setDragTop] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dragStateRef = useRef<{
    pointerId: number | null;
    offsetY: number;
    startY: number;
    moved: boolean;
  }>({
    pointerId: null,
    offsetY: 0,
    startY: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
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

  useEffect(() => {
    const clampTop = (nextTop: number, height: number) => {
      const margin = 0;
      const maxTop = Math.max(margin, window.innerHeight - height - margin);

      return Math.min(Math.max(margin, nextTop), maxTop);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      const wrapper = wrapperRef.current;
      if (!wrapper || dragState.pointerId !== event.pointerId) {
        return;
      }

      const nextTop = clampTop(
        event.clientY - dragState.offsetY,
        wrapper.getBoundingClientRect().height
      );

      if (!dragState.moved && Math.abs(event.clientY - dragState.startY) > 6) {
        dragState.moved = true;
        suppressClickRef.current = true;
        setIsDragging(true);
        setIsOpen(false);
      }

      if (dragState.moved) {
        setDragTop(nextTop);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (dragState.pointerId !== event.pointerId) {
        return;
      }

      if (buttonRef.current?.hasPointerCapture(event.pointerId)) {
        buttonRef.current.releasePointerCapture(event.pointerId);
      }

      dragState.pointerId = null;
      dragState.offsetY = 0;
      dragState.startY = 0;
      dragState.moved = false;
      setIsDragging(false);
    };

    const handleResize = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || dragTop === null) {
        return;
      }

      setDragTop((currentTop) =>
        currentTop === null
          ? currentTop
          : clampTop(currentTop, wrapper.getBoundingClientRect().height)
      );
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [dragTop]);

  const handleSelect = (nextLang: Language) => {
    onToggle(nextLang);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    dragStateRef.current = {
      pointerId: event.pointerId,
      offsetY: event.clientY - rect.top,
      startY: event.clientY,
      moved: false,
    };

    if (buttonRef.current) {
      buttonRef.current.setPointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={`lang-toggle-wrapper ${isDragging ? 'is-dragging' : ''}`}
      ref={wrapperRef}
      style={dragTop === null ? undefined : { top: `${dragTop}px`, transform: 'none' }}
    >
      <button
        type="button"
        className="lang-toggle-btn"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        aria-label={v.language.label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-grabbed={isDragging}
        ref={buttonRef}
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
