import React from 'react';

const FLAG_CDN = 'https://hatscripts.github.io/circle-flags/flags';

export interface CountryFlagProps {
  code: string;
  size?: number;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code, size = 24, className }) => {
  const normalized = code?.trim().toUpperCase();
  if (!normalized || normalized.length !== 2) return null;

  return (
    <img
      src={`${FLAG_CDN}/${normalized.toLowerCase()}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};
