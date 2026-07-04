import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroDisclaimerProps {
  officialHref?: string;
}

export const HeroDisclaimer: React.FC<HeroDisclaimerProps> = ({ officialHref }) => {
  const { t } = useLanguage();

  if (!officialHref) {
    return (
      <p className="relative z-10 px-8 pb-6 text-center text-sm text-gray-300">
        {t.siteName} {t.hero.disclaimer}
      </p>
    );
  }

  return (
    <p className="relative z-10 px-8 pb-6 text-center text-sm text-gray-300">
      {t.siteName} {t.hero.disclaimer}{' '}
      <a
        href={officialHref}
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition hover:text-white"
      >
        {t.hero.officialSite}
      </a>
      .
    </p>
  );
};
