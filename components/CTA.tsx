import React from 'react';
import { PrimaryButton } from './ui';
import { useLanguage } from '../context/LanguageContext';

interface CTAProps {
  onApply: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onApply }) => {
  const { t } = useLanguage();
  const { cta: c } = t;

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <h2 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {c.title}
        </h2>
        <p className="text-pretty text-base leading-relaxed text-gray-600 sm:text-xl">
          {c.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          {c.bullets.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="size-4 fill-blue-500" viewBox="0 0 256 256">
                <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
              </svg>
              {item}
            </div>
          ))}
        </div>

        <PrimaryButton onClick={onApply}>{c.button}</PrimaryButton>
      </div>
    </section>
  );
};
