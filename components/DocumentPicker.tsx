import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { destinations, buildPath, type DestinationDef, type ServiceDef } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';

type PickerMode = 'destinations' | 'services';

interface DocumentPickerProps {
  mode: PickerMode;
  /** For services mode */
  destination?: DestinationDef;
}

export const DocumentPicker: React.FC<DocumentPickerProps> = ({ mode, destination }) => {
  const { lang, dir, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const placeholder =
    mode === 'destinations'
      ? t.about.title
      : lang === 'en'
        ? 'What document do you need?'
        : 'ما المستند الذي تحتاجه؟';

  const pickerId = mode === 'destinations' ? 'destinations' : 'services-picker';

  const filteredDestinations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.name[lang].toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.slug.includes(q)
    );
  }, [search, lang]);

  const filteredServices = useMemo(() => {
    if (!destination) return [];
    const q = search.trim().toLowerCase();
    if (!q) return destination.services;
    return destination.services.filter(
      (s) =>
        s.name[lang].toLowerCase().includes(q) ||
        s.shortName[lang].toLowerCase().includes(q) ||
        s.slug.includes(q)
    );
  }, [search, lang, destination]);

  const docLabel = (n: number) =>
    lang === 'en' ? `${n} document${n > 1 ? 's' : ''}` : n === 1 ? 'مستند واحد' : `${n} مستندات`;

  const renderDestinationRow = (dest: DestinationDef) => (
    <Link
      key={dest.slug}
      to={buildPath(lang, dest.slug)}
      className="group flex items-center justify-between gap-4 border-b border-gray-50 px-5 py-4 transition last:border-0 hover:bg-blue-50/60"
    >
      <span className="font-bold text-gray-900">{dest.name[lang]}</span>
      <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
        <span>
          {lang === 'en' ? 'from' : 'من'} ${dest.priceFrom.toFixed(2)}
        </span>
        <span className="hidden sm:inline">{docLabel(dest.services.length)}</span>
        <Chevron className="size-4 text-blue-500" />
      </div>
    </Link>
  );

  const renderServiceRow = (service: ServiceDef) => (
    <button
      key={service.slug}
      type="button"
      onClick={() => navigate(buildPath(lang, destination!.slug, service.slug))}
      className="group flex w-full items-center justify-between gap-4 border-b border-gray-50 px-5 py-4 text-start transition last:border-0 hover:bg-blue-50/60"
    >
      <div>
        <p className="text-xs font-bold uppercase text-blue-500">{service.shortName[lang]}</p>
        <p className="font-bold text-gray-900">{service.name[lang]}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
        <span>${service.priceFrom.toFixed(2)}</span>
        <Chevron className="size-4 text-blue-500" />
      </div>
    </button>
  );

  return (
    <div id={pickerId} className="mx-auto w-full max-w-xl scroll-mt-24">
      {mode === 'destinations' && (
        <div className="mb-6 space-y-2 text-center text-white">
          <h2 className="text-pretty text-xl font-bold sm:text-2xl">{t.about.title}</h2>
          <p className="text-pretty text-sm leading-relaxed text-gray-200">{t.about.subtitle}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-start shadow-lg backdrop-blur-sm transition hover:bg-white"
      >
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <Search className="size-4 text-gray-400" />
          {placeholder}
        </span>
        <ChevronDown className={`size-5 shrink-0 text-gray-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="relative z-20 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          <div className="border-b border-gray-100 p-3">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  mode === 'destinations'
                    ? lang === 'en'
                      ? 'Search destination...'
                      : 'ابحث عن وجهة...'
                    : lang === 'en'
                      ? 'Search...'
                      : 'بحث...'
                }
                className="w-full rounded-xl border border-gray-200 py-2.5 ps-10 pe-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="max-h-[min(50vh,320px)] overflow-y-auto overscroll-contain">
            {mode === 'destinations'
              ? filteredDestinations.map(renderDestinationRow)
              : filteredServices.map(renderServiceRow)}
            {(mode === 'destinations' ? filteredDestinations : filteredServices).length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-500">
                {lang === 'en' ? 'No results found' : 'لا توجد نتائج'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
