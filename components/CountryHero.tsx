import React from 'react';
import { Header } from './Header';
import { HeroShell } from './HeroShell';
import { HeroBadge } from './HeroBadge';
import { DocumentPicker } from './DocumentPicker';
import { HeroDisclaimer } from './HeroDisclaimer';
import { useLanguage } from '../context/LanguageContext';

interface CountryHeroProps {
  onApply: () => void;
}

export const CountryHero: React.FC<CountryHeroProps> = ({ onApply }) => {
  const { t, destination } = useLanguage();

  if (!destination) return null;

  return (
    <HeroShell>
      <Header onApply={onApply} />

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <div className="space-y-4 text-center text-white">
          {t.hero.badgeLine1 && t.hero.badgeLine2 ? (
            <HeroBadge
              line1={t.hero.badgeLine1}
              line2={t.hero.badgeLine2}
              countryCode={destination.countryCode}
            />
          ) : (
            <h1 className="text-pretty text-2xl font-bold sm:text-3xl lg:text-4xl">{t.hero.title}</h1>
          )}
          {t.hero.subtitle && (
            <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
              {t.hero.subtitle}
            </p>
          )}
        </div>

        <DocumentPicker mode="services" destination={destination} />
      </div>

      <HeroDisclaimer />
    </HeroShell>
  );
};
