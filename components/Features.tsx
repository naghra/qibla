import React from 'react';
import { ListChecks, Headphones, Shield, Users, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';
import { PrimaryButton, SectionHeader } from './ui';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  list: ListChecks,
  headphones: Headphones,
  shield: Shield,
  users: Users,
  check: CheckCircle,
};

interface FeaturesProps {
  onApply: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onApply }) => {
  const { t, pageScope } = useLanguage();
  const { features: f } = t;
  const sectionId =
    pageScope.type === 'hub' || pageScope.type === 'country' ? 'about-us' : undefined;

  return (
    <section id={sectionId} className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader title={f.sectionTitle} subtitle={f.sectionSubtitle} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="relative flex flex-col overflow-hidden rounded-4xl sm:col-span-2 sm:row-span-2">
          <div className="pointer-events-none absolute -inset-full spin-slow bg-gradient-to-r from-blue-500 via-blue-100 to-white opacity-80" />
          <div className="relative m-1 flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-4xl bg-blue-500 p-4 text-gray-50 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo inverted className="h-8" showText={false} />
                <p className="font-bold">{t.siteName}</p>
              </div>
              <h3 className="max-w-md text-pretty text-2xl font-bold">{f.cardTitle}</h3>
              <p className="max-w-md text-pretty text-sm text-blue-100">{f.cardSubtitle}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-4 fill-blue-100" viewBox="0 0 256 256">
                    <path d="M235.36,98.49A12.21,12.21,0,0,0,224.59,90l-61.47-5L139.44,27.67a12.37,12.37,0,0,0-22.88,0L92.88,85,31.41,90a12.45,12.45,0,0,0-7.07,21.84l46.85,40.41L56.87,212.64a12.35,12.35,0,0,0,18.51,13.49L128,193.77l52.62,32.36a12.12,12.12,0,0,0,13.69-.51,12.28,12.28,0,0,0,4.82-13l-14.32-60.42,46.85-40.41A12.29,12.29,0,0,0,235.36,98.49Z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-blue-100">{f.trusted}</p>
              <PrimaryButton onClick={onApply} className="w-full sm:w-auto">
                {f.cta}
              </PrimaryButton>
            </div>
          </div>
        </article>

        {f.items.map((feature) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap];
          return (
            <article
              key={feature.title}
              className="space-y-4 rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 transition-all sm:p-8"
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100">
                <Icon className="size-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </article>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500">{f.footerNote}</p>
    </section>
  );
};
