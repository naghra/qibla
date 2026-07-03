import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { buildPath, type DestinationDef } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';

interface SelectedDocumentProps {
  destination: DestinationDef;
}

/** Auto-selected document display matching reference country hero (no price in hero). */
export const SelectedDocument: React.FC<SelectedDocumentProps> = ({ destination }) => {
  const { lang, dir } = useLanguage();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const label =
    lang === 'en' ? 'What document do you need?' : 'ما المستند الذي تحتاجه؟';

  return (
    <div id="services-picker" className="mx-auto w-full max-w-xl scroll-mt-24">
      <div
        className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-start shadow-lg backdrop-blur-sm"
        aria-hidden
      >
        <span className="font-medium text-gray-700">{label}</span>
        <ChevronDown className="size-5 shrink-0 rotate-180 text-gray-400" />
      </div>

      <div className="relative z-20 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
        <ul>
          {destination.services.map((service) => (
            <li key={service.slug}>
              <Link
                to={buildPath(lang, destination.slug, service.slug)}
                className="group flex items-center justify-between gap-4 border-b border-gray-50 px-5 py-4 transition last:border-0 hover:bg-blue-50/60"
              >
                <div>
                  <p className="text-xs font-bold uppercase text-blue-500">
                    {service.shortName[lang]}
                  </p>
                  <p className="font-bold text-gray-900">{service.name[lang]}</p>
                </div>
                <Chevron className="size-4 shrink-0 text-blue-500" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
