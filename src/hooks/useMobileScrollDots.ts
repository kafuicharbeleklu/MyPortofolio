import { useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

const useMobileScrollDots = (itemCount: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (!isMobileViewport() || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const root = containerRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];

    if (!root || !items.length) {
      return undefined;
    }

    const visibility = new Map<number, number>();

    const syncActiveIndex = () => {
      let bestIndex = 0;
      let bestRatio = -1;

      visibility.forEach((ratio, index) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIndex = index;
        }
      });

      if (bestRatio >= 0.5 || visibility.size === 1) {
        setActiveIndex(bestIndex);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.carouselIndex ?? '0');
          visibility.set(index, entry.intersectionRatio);
        });

        syncActiveIndex();
      },
      {
        root,
        threshold: [0.5, 0.66, 0.85, 1],
      }
    );

    items.forEach((item, index) => {
      visibility.set(index, 0);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [itemCount]);

  const registerItem = (index: number, node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  const scrollToIndex = (index: number) => {
    const target = itemRefs.current[index];
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });

    setActiveIndex(Math.max(0, Math.min(index, itemCount - 1)));
  };

  return {
    containerRef,
    registerItem,
    activeIndex: Math.max(0, Math.min(activeIndex, Math.max(0, itemCount - 1))),
    scrollToIndex,
  };
};

export default useMobileScrollDots;
