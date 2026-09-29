import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number; // interval in ms
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 45,
  maxIterations = 12,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ').join('')
    : characters;

  const getRandomChar = () => {
    return availableChars[Math.floor(Math.random() * availableChars.length)] || '*';
  };

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const length = text.length;

    const interval = setInterval(() => {
      iteration++;

      if (sequential) {
        // Sequentially reveal characters based on direction
        const progress = Math.min(length, Math.floor((iteration / maxIterations) * length));

        setDisplayText(() => {
          return text
            .split('')
            .map((char, idx) => {
              if (char === ' ') return ' ';

              let isRevealed = false;
              if (revealDirection === 'start') {
                isRevealed = idx < progress;
              } else if (revealDirection === 'end') {
                isRevealed = idx >= length - progress;
              } else {
                // center
                const center = length / 2;
                isRevealed = Math.abs(idx - center) <= progress / 2;
              }

              return isRevealed ? char : getRandomChar();
            })
            .join('');
        });
      } else {
        // Random global glitch until iteration reaches max
        if (iteration >= maxIterations) {
          setDisplayText(text);
          clearInterval(interval);
          setIsAnimating(false);
          return;
        }

        setDisplayText(() => {
          return text
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return Math.random() < iteration / maxIterations ? char : getRandomChar();
            })
            .join('');
        });
      }

      if (iteration >= maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              startAnimation();
            }
          });
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [text, animateOn]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => animateOn === 'hover' && startAnimation()}
      className={`inline-block ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
};
