import { useCallback, useEffect, useRef, useState } from 'react';
import type { LightboxItem } from '../types/portfolio';

type LightboxState = {
  items: LightboxItem[];
  index: number;
} | null;

const useLightbox = () => {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const lightboxScrollYRef = useRef(0);
  const bodyStylesRef = useRef<{
    overflow: string;
    position: string;
    width: string;
    top: string;
    left: string;
    right: string;
  } | null>(null);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const openLightbox = useCallback((items: LightboxItem[], index: number) => {
    if (!items.length) {
      return;
    }

    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    setLightbox({
      items,
      index: clampedIndex,
    });
  }, []);

  const stepLightbox = useCallback((delta: number) => {
    setLightbox((current) => {
      if (!current) {
        return current;
      }

      const nextIndex = Math.max(
        0,
        Math.min(current.index + delta, current.items.length - 1)
      );

      return {
        ...current,
        index: nextIndex,
      };
    });
  }, []);

  const goToLightbox = useCallback((index: number) => {
    setLightbox((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        index: Math.max(0, Math.min(index, current.items.length - 1)),
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox || typeof window === 'undefined') {
      return;
    }

    const { body } = document;
    lightboxScrollYRef.current = window.scrollY;
    bodyStylesRef.current = {
      overflow: body.style.overflow,
      position: body.style.position,
      width: body.style.width,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${lightboxScrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
        return;
      }

      if (event.key === 'ArrowLeft') {
        stepLightbox(-1);
        return;
      }

      if (event.key === 'ArrowRight') {
        stepLightbox(1);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);

      if (bodyStylesRef.current) {
        body.style.overflow = bodyStylesRef.current.overflow;
        body.style.position = bodyStylesRef.current.position;
        body.style.width = bodyStylesRef.current.width;
        body.style.top = bodyStylesRef.current.top;
        body.style.left = bodyStylesRef.current.left;
        body.style.right = bodyStylesRef.current.right;
      } else {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
      }

      window.scrollTo(0, lightboxScrollYRef.current);
    };
  }, [closeLightbox, lightbox, stepLightbox]);

  return {
    lightbox,
    openLightbox,
    closeLightbox,
    stepLightbox,
    goToLightbox,
  };
};

export default useLightbox;
