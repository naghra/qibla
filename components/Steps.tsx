import React from 'react';
import { IMAGES } from '../data/assets';
import { PrimaryButton, SectionHeader } from './ui';
import { useLanguage } from '../context/LanguageContext';

interface StepsProps {
  onApply: () => void;
}

export const Steps: React.FC<StepsProps> = ({ onApply }) => {
  const { t, lang } = useLanguage();
  const { steps: s } = t;

  return (
    <section id="how-it-works" className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader title={s.sectionTitle} subtitle={s.sectionSubtitle} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid gap-4">
          {s.items.map((step) => (
            <article
              key={step.number}
              className="flex flex-col gap-4 rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8"
            >
              <p className="text-sm font-medium uppercase text-blue-500">
                {lang === 'ar' ? `الخطوة ${step.number}` : `Step ${step.number}`}
              </p>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>

        <img
          src={IMAGES.tourist}
          alt="Traveler"
          className="aspect-[4/5] min-h-[320px] w-full max-w-xs justify-self-center rounded-4xl object-cover lg:max-w-none"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-3xl rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-8 text-center sm:p-12">
        <h3 className="text-2xl font-bold text-gray-900">{s.ctaTitle}</h3>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-gray-600">{s.ctaSubtitle}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {s.ctaBullets.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg className="size-4 fill-blue-500" viewBox="0 0 256 256">
                <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <PrimaryButton onClick={onApply}>{s.ctaButton}</PrimaryButton>
        </div>
        <p className="mt-4 text-xs text-gray-500">{s.ctaNote}</p>
      </div>
    </section>
  );
};
