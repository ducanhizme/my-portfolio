import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  reducedMotion: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ reducedMotion }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestInteractive = target.closest('button, a, input, [data-cursor]');
      if (closestInteractive) {
        setIsHovering(true);
        const customLabel = closestInteractive.getAttribute('data-cursor');
        if (customLabel) {
          setCursorText(customLabel);
        } else if (closestInteractive.tagName === 'BUTTON') {
          const text = closestInteractive.textContent?.trim() || '';
          if (text.includes('RUN') || text.includes('EXECUTE')) {
            setCursorText('EXECUTE');
          } else if (text.includes('VIEW')) {
            setCursorText('VIEW →');
          } else if (text.includes('SIMULAT')) {
            setCursorText('TRACE');
          } else {
            setCursorText('');
          }
        } else if (closestInteractive.tagName === 'A') {
          setCursorText('OPEN');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [reducedMotion, isVisible]);

  if (reducedMotion || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-200 border ${
          isHovering
            ? 'w-16 h-16 bg-cyan-500/20 border-cyan-400/80 backdrop-blur-[1px] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : 'w-4 h-4 bg-cyan-400/40 border-cyan-400/90 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
        }`}
      >
        {isHovering && cursorText && (
          <span className="text-[9px] font-mono font-bold text-cyan-200 tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
