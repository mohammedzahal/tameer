import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  currentLang?: 'en' | 'ar';
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = -100;
    let posY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      posX = e.clientX;
      posY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Direct, 0ms native transform update (immune to RTL flipping)
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, [tabindex="0"]');
      setIsPointer(Boolean(isInteractive));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div 
      dir="ltr"
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
    >
      {/* 🌟 Direct Hardware-Accelerated Circle Cursor (Instant 0ms sync with mouse & dispersion center) */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,box-shadow,opacity] duration-200 ease-out ${
          isPointer
            ? 'w-12 h-12 bg-white border-0 mix-blend-difference shadow-[0_0_20px_rgba(255,255,255,0.8)]'
            : isClicking
            ? 'w-6 h-6 bg-white/20 border border-white/90 shadow-[0_0_10px_rgba(255,255,255,0.4)]'
            : 'w-8 h-8 bg-white/5 border border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default CustomCursor;

