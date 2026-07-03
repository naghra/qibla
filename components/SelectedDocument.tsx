import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { buildPath, type DestinationDef } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';
import { PrimaryButton } from './ui';

interface SelectedDocumentProps {
  destination: DestinationDef;
}

/** Shows the destination document(s) pre-selected — no picker when service count is known. */
export const SelectedDocument: React.FC<SelectedDocumentProps> = ({ destination }) => {
  const { lang, dir, t } = useLanguage();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const services = destination.services;

  const heading =
    lang === 'en'
      ? services.length === 1
        ? 'Your travel document'
        : 'Available travel documents'
      : services.length === 1
        ? 'مستند السفر المطلوب'
        : 'مستندات السفر المتاحة';

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 scroll-mt-24">
      <p className="text-center text-sm font-medium text-gray-200">{heading}</p>

      <ul className="space-y-3">
        {services.map((service) => (
          <li
            key={service.slug}
            className="overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-lg backdrop-blur-sm"
          >
            <div className="px-5 py-4">
              <p className="text-xs font-bold uppercase text-blue-500">{service.shortName[lang]}</p>
              <p className="mt-0.5 font-bold text-gray-900">{service.name[lang]}</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-600">
                {service.description[lang]}
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">
                  ${service.priceFrom.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">
                  {lang === 'en' ? '/ traveler' : '/ مسافر'}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link
                  to={buildPath(lang, destination.slug, service.slug, true)}
                  className="flex-1"
                >
                  <PrimaryButton className="w-full">{t.nav.applyNow}</PrimaryButton>
                </Link>
                <Link
                  to={buildPath(lang, destination.slug, service.slug)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                >
                  {lang === 'en' ? 'More info' : 'المزيد'}
                  <Chevron className="size-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
