import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices that support hover / fine pointers (desktops, laptops)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the center precision dot (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over clickable or interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactive) {
        setIsPointer(true);
        const customText = interactive.getAttribute('data-cursor');
        setCursorText(customText || null);
      } else {
        setIsPointer(false);
        setCursorText(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth animation loop for the lagging CAD reticle ring
    let animId: number;
    const updateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precision Center Dot (Zero latency, instant response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] transition-transform duration-150 ${
            isClicking ? 'scale-150 bg-white' : isPointer ? 'scale-75' : 'scale-100'
          } shadow-[0_0_10px_var(--accent-primary)]`}
        />
      </div>

      {/* 2. Outer Smooth Lagging CAD Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isPointer
              ? 'w-10 h-10 border border-[var(--accent-primary)]/80 bg-[var(--accent-primary)]/10 backdrop-blur-[1px] rotate-45'
              : 'w-7 h-7 border border-[var(--accent-primary)]/40'
          } ${isClicking ? 'scale-75 border-[var(--accent-primary)]' : 'scale-100'}`}
          style={{ borderRadius: isPointer ? '4px' : '9999px' }}
        >
          {/* Corner tick brackets when hovering interactive targets */}
          {isPointer ? (
            <>
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[var(--accent-primary)]" />
            </>
          ) : (
            // Subtle CAD crosshair ticks on default ring
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-[1px] bg-[var(--accent-primary)]/60" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-[1px] bg-[var(--accent-primary)]/60" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-[1px] bg-[var(--accent-primary)]/60" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-[1px] bg-[var(--accent-primary)]/60" />
            </>
          )}

          {cursorText && (
            <span className="absolute -bottom-5 font-mono text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-bold whitespace-nowrap bg-[var(--background-card)]/90 px-1 py-0.5 border border-[var(--border-secondary)]">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
