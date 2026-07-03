import React from 'react';
import { Header } from './Header';
import { HeroShell } from './HeroShell';
import { DocumentPicker } from './DocumentPicker';
import { HeroDisclaimer } from './HeroDisclaimer';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface HubHeroProps {
  onBrowse: () => void;
}

export const HubHero: React.FC<HubHeroProps> = ({ onBrowse }) => {
  const { t } = useLanguage();

  return (
    <HeroShell>
      <Header onApply={onBrowse} hubMode />

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <div className="space-y-4 text-center text-white">
          <div className="flex justify-center">
            <Logo className="h-12" inverted showText={false} />
          </div>
          <h1 className="text-pretty text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t.hero.titleLine1 && t.hero.titleLine2 ? (
              <>
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
              </>
            ) : (
              t.hero.title
            )}
          </h1>
          {t.hero.subtitle && (
            <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
              {t.hero.subtitle}
            </p>
          )}
        </div>

        <DocumentPicker mode="destinations" />
      </div>

      <HeroDisclaimer officialHref="https://www.immigration.go.th/" />
    </HeroShell>
  );
};
