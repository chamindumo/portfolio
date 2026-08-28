import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const squarePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices that support hover / fine pointers (desktops, laptops)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant 0ms response for center pointer dot (perfectly centered)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
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

    // Ultra-smooth physics loop for the architectural CAD square reticle
    let animId: number;
    const updateSquare = () => {
      // Responsive lerp smoothing
      squarePos.current.x += (mousePos.current.x - squarePos.current.x) * 0.22;
      squarePos.current.y += (mousePos.current.y - squarePos.current.y) * 0.22;

      if (squareRef.current) {
        squareRef.current.style.transform = `translate3d(${squarePos.current.x}px, ${squarePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(updateSquare);
    };

    animId = requestAnimationFrame(updateSquare);

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
      {/* 1. Precision Center Dot (Locked dead center at pointer coordinates) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] transition-transform duration-100 ${
            isClicking ? 'scale-150 bg-white shadow-[0_0_12px_#ffffff]' : isPointer ? 'scale-100' : 'scale-100'
          } shadow-[0_0_8px_var(--accent-primary)]`}
        />
      </div>

      {/* 2. Architectural CAD Square (Centered with mathematical precision around the pointer) */}
      <div
        ref={squareRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isPointer
              ? 'w-11 h-11 border border-[var(--accent-primary)]/70 bg-[var(--accent-primary)]/10 backdrop-blur-[1px]'
              : 'w-7 h-7 border border-[var(--accent-primary)]/40'
          } ${isClicking ? 'scale-75 border-[var(--accent-primary)]' : 'scale-100'}`}
        >
          {/* 4 Precision CAD Corner Brackets (┌ ┐ └ ┘) */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[var(--accent-primary)]" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[var(--accent-primary)]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[var(--accent-primary)]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[var(--accent-primary)]" />

          {/* Precision Crosshair Guidelines */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-[var(--accent-primary)]/20 pointer-events-none" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-[var(--accent-primary)]/20 pointer-events-none" />

          {/* Optional Action Badge */}
          {cursorText && (
            <span className="absolute -bottom-6 font-mono text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-bold whitespace-nowrap bg-[var(--background-card)]/95 px-1.5 py-0.5 border border-[var(--border-secondary)] shadow-sm">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
