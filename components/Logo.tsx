import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-8',
  inverted = false,
  showText = true,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/images/logo.webp"
        alt={t.siteName}
        className={`w-auto shrink-0 object-contain ${className} ${
          inverted ? 'brightness-0 invert' : ''
        }`}
      />
      {showText && (
        <span
          className={`hidden font-bold leading-tight sm:inline sm:text-sm ${
            inverted ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t.siteName}
        </span>
      )}
    </div>
  );
};
