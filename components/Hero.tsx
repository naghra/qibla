import React from 'react';
import { Header } from './Header';
import { PrimaryButton } from './ui';
import { HeroShell } from './HeroShell';
import { HeroBadge } from './HeroBadge';
import { HeroDisclaimer } from './HeroDisclaimer';
import { useLanguage } from '../context/LanguageContext';
import { getOfficialSiteUrl } from '../utils/officialSites';

interface HeroProps {
  onApply: () => void;
}

const trustIcons = ['star', 'check', 'star', 'lock'];

const TrustIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'star') {
    return (
      <svg className="size-4 fill-blue-400" viewBox="0 0 256 256" aria-hidden>
        <path d="M235.36,98.49A12.21,12.21,0,0,0,224.59,90l-61.47-5L139.44,27.67a12.37,12.37,0,0,0-22.88,0L92.88,85,31.41,90a12.45,12.45,0,0,0-7.07,21.84l46.85,40.41L56.87,212.64a12.35,12.35,0,0,0,18.51,13.49L128,193.77l52.62,32.36a12.12,12.12,0,0,0,13.69-.51,12.28,12.28,0,0,0,4.82-13l-14.32-60.42,46.85-40.41A12.29,12.29,0,0,0,235.36,98.49Z" />
      </svg>
    );
  }
  if (type === 'lock') {
    return (
      <svg className="size-4 fill-blue-400" viewBox="0 0 256 256" aria-hidden>
        <path d="M208,84H172V56a44,44,0,0,0-88,0V84H48A12,12,0,0,0,36,96V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V96A12,12,0,0,0,208,84ZM92,56a36,36,0,0,1,72,0V84H92Z" />
      </svg>
    );
  }
  return (
    <svg className="size-4 fill-blue-400" viewBox="0 0 256 256" aria-hidden>
      <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
    </svg>
  );
};

export const Hero: React.FC<HeroProps> = ({ onApply }) => {
  const { t, destination, service } = useLanguage();
  const officialHref = getOfficialSiteUrl(destination?.slug, service?.slug);

  return (
    <HeroShell>
      <Header onApply={onApply} />

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-4 py-6 text-center text-white sm:px-8 sm:py-10">
        <div className="space-y-4">
          {t.hero.badgeLine1 && t.hero.badgeLine2 ? (
            <HeroBadge
              line1={t.hero.badgeLine1}
              line2={t.hero.badgeLine2}
              countryCode={destination?.countryCode}
            />
          ) : (
            <h1 className="text-pretty text-2xl font-bold sm:text-3xl lg:text-4xl">{t.hero.title}</h1>
          )}
          {t.hero.subtitle && (
            <p className="text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
              {t.hero.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm">
          {t.hero.trustItems.map((label, i) => (
            <div key={label} className="flex items-center justify-center gap-2">
              <TrustIcon type={trustIcons[i] ?? 'check'} />
              <span className="font-medium text-gray-200">{label}</span>
            </div>
          ))}
        </div>

        <div>
          <PrimaryButton onClick={onApply} className="px-8 py-3.5 text-base">
            {t.hero.cta}
          </PrimaryButton>
        </div>
      </div>

      <HeroDisclaimer officialHref={officialHref} />
    </HeroShell>
  );
};

export { GlanceSection as HeroAbout } from './GlanceSection';

export const StatsBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="stats" className="container mx-auto flex flex-wrap justify-between gap-12 px-4 py-24">
      {t.stats.map((stat) => (
        <div key={stat.label} className="min-w-[140px] flex-1 space-y-4 text-center sm:text-start">
          <p className="text-3xl font-bold text-gray-900 sm:text-5xl">{stat.value}</p>
          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
        </div>
      ))}
      <p className="w-full text-center text-xs text-gray-400">{t.statsNote}</p>
    </section>
  );
};

