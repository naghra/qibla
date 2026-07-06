import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Lock, Headphones, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';
import { CountryFlag } from './CountryFlag';
import { PrimaryButton } from './ui';

export const ServiceCards: React.FC = () => {
  const { lang, dir, destination, t } = useLanguage();
  if (!destination) return null;

  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <section id="documents" className="container mx-auto space-y-12 px-4 py-24 scroll-mt-24">
      <div className="space-y-4">
        <h2 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl">
          {t.about.title}
        </h2>
        <p className="max-w-prose text-pretty text-gray-600">{t.about.subtitle}</p>
      </div>

      <ul className="mx-auto grid w-full max-w-2xl gap-4">
        {destination.services.map((service) => (
          <li
            key={service.slug}
            className="overflow-hidden rounded-4xl border border-blue-100/60 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 shadow-sm"
          >
            <article className="p-6 sm:p-8">
              <div className="mb-4 flex items-start gap-3">
                <CountryFlag code={destination.countryCode} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                    {service.shortName[lang]}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">{service.name[lang]}</h3>
                </div>
              </div>
              <p className="mb-5 text-pretty text-sm leading-relaxed text-gray-600">
                {service.description[lang]}
              </p>
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">
                  ${service.priceFrom.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">
                  {lang === 'en' ? '/ traveler' : '/ مسافر'}
                </span>
              </div>
              <div className="mb-6 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5">
                  <FileText className="size-3.5 text-blue-500" />
                  {lang === 'en' ? 'Gov submission' : 'تقديم حكومي'}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5">
                  <Lock className="size-3.5 text-blue-500" />
                  {lang === 'en' ? 'Encrypted' : 'مشفّر'}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5">
                  <Headphones className="size-3.5 text-blue-500" />
                  24/7 {lang === 'en' ? 'Support' : 'دعم'}
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to={buildPath(lang, destination.slug, service.slug, true)} className="flex-1">
                  <PrimaryButton className="w-full">{t.nav.applyNow}</PrimaryButton>
                </Link>
                <Link
                  to={buildPath(lang, destination.slug, service.slug)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                >
                  {lang === 'en' ? 'More info' : 'المزيد'}
                  <Chevron className="size-4" />
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                {lang === 'en'
                  ? 'Service fee — government/consular fee billed separately.'
                  : 'رسوم الخدمة — رسوم حكومية/قنصلية تُفوتر بشكل منفصل.'}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
