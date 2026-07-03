import React from 'react';
import { SectionHeader } from './ui';
import { useLanguage } from '../context/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const { testimonials: tm } = t;

  return (
    <section className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader title={tm.sectionTitle} subtitle={tm.sectionSubtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tm.items.map((item) => (
          <blockquote
            key={item.name}
            className="rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8"
          >
            <p className="text-pretty text-sm leading-relaxed text-gray-600">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-bold text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">{tm.footerNote}</p>
    </section>
  );
};
