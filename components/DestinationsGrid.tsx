import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations, buildPath } from '../data/destinations';
import { countryFlag } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

export const DestinationsGrid: React.FC = () => {
  const { lang, dir, t } = useLanguage();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <section id="destinations" className="container mx-auto space-y-10 px-4 py-16">
      <div className="space-y-3 text-center">
        <h2 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {t.about.title}
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
          {t.about.subtitle}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <li key={dest.slug}>
            <Link
              to={buildPath(lang, dest.slug)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-2xl leading-none">
                  {countryFlag(dest.countryCode)}
                </span>
                <div className="min-w-0 text-start">
                  <p className="truncate font-bold text-gray-900">{dest.name[lang]}</p>
                  <p className="text-xs text-gray-500">
                    {lang === 'en'
                      ? `from $${dest.priceFrom.toFixed(2)} · ${dest.services.length} document${dest.services.length > 1 ? 's' : ''}`
                      : `من ${dest.priceFrom}$ · ${dest.services.length} مستند`}
                  </p>
                </div>
              </div>
              <Chevron className="size-5 shrink-0 text-blue-500 transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
