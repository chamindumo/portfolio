import { useState, useEffect } from 'react';

export interface ScrollData {
  scrollY: number;
  scrollProgress: number; // 0 to 100
  scrollVelocity: number;
  scrollDirection: 'up' | 'down';
}

export function useScrollProgress(): ScrollData {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    scrollDirection: 'down',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)) : 0;
          const velocity = Math.abs(currentScrollY - lastScrollY);
          const direction = currentScrollY >= lastScrollY ? 'down' : 'up';

          lastScrollY = currentScrollY;

          setScrollData({
            scrollY: currentScrollY,
            scrollProgress: Math.round(progress),
            scrollVelocity: velocity,
            scrollDirection: direction,
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}
