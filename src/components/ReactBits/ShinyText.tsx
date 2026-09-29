import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  color?: string; // highlight color
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3.5,
  className = '',
  color = 'rgba(6, 182, 212, 0.9)',
}) => {
  return (
    <span
      className={`inline-block relative bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(115deg, #94a3b8 20%, ${color} 50%, #94a3b8 80%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        animation: !disabled ? `shinyText ${speed}s linear infinite` : 'none',
      }}
    >
      <style>{`
        @keyframes shinyText {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {text}
    </span>
  );
};
