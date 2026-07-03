import React from 'react';
import { Header } from './Header';
import { DestinationPicker } from './DestinationPicker';
import { IMAGES } from '../data/assets';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface HubHeroProps {
  onBrowse: () => void;
}

export const HubHero: React.FC<HubHeroProps> = ({ onBrowse }) => {
  const { t } = useLanguage();

  return (
    <section className="p-4">
      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border-8 border-white">
        <div className="hero-fallback absolute inset-0 overflow-hidden rounded-4xl">
          <img
            src={IMAGES.hero}
            alt=""
            className="absolute inset-0 h-full w-full rounded-4xl object-cover object-center"
            loading="eager"
            fetchPriority="high"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="hero-overlay absolute inset-0 rounded-4xl" aria-hidden />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <Header onApply={onBrowse} hubMode />

          <div className="mx-auto w-full max-w-xl flex-1 space-y-8 px-4 py-6 sm:px-8 sm:py-10">
            <div className="space-y-4 text-center text-white">
              <div className="flex justify-center">
                <Logo className="h-10" inverted showText={false} />
              </div>
              <h1 className="text-pretty text-2xl font-bold sm:text-3xl lg:text-4xl">
                {t.hero.title}
              </h1>
            </div>

            <DestinationPicker />
          </div>

          <p className="relative z-10 px-8 pb-6 text-center text-sm text-gray-300">
            {t.siteName} {t.hero.disclaimer}{' '}
            <a
              href="https://www.immigration.go.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-white"
            >
              {t.hero.officialSite}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
