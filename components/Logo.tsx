import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-8', inverted = false }) => (
  <svg
    className={className}
    viewBox="0 0 180 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="40" height="40" rx="10" className={inverted ? 'fill-white' : 'fill-blue-500'} />
    <path
      d="M12 28L20 12L24 20L32 12L28 28H12Z"
      className={inverted ? 'fill-blue-500' : 'fill-white'}
    />
    <text
      x="48"
      y="27"
      className={inverted ? 'fill-white' : 'fill-gray-900'}
      style={{ fontFamily: 'Rubik, sans-serif', fontSize: '15px', fontWeight: 700 }}
    >
      سفر ذكي
    </text>
  </svg>
);
