import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { destinations, buildPath } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';

export const DestinationPicker: React.FC = () => {
  const { lang, dir, t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.name[lang].toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.slug.includes(q)
    );
  }, [search, lang]);

  const docLabel = (count: number) =>
    lang === 'en'
      ? `${count} document${count > 1 ? 's' : ''}`
      : count === 1
        ? 'مستند واحد'
        : `${count} مستندات`;

  return (
    <div id="destinations" className="mx-auto w-full max-w-xl">
      <div className="mb-6 space-y-2 text-center text-white">
        <h2 className="text-pretty text-xl font-bold sm:text-2xl">{t.about.title}</h2>
        <p className="text-pretty text-sm leading-relaxed text-gray-200">{t.about.subtitle}</p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-start shadow-lg backdrop-blur-sm transition hover:bg-white"
        >
          <span className="font-medium text-gray-700">{t.about.title}</span>
          <ChevronDown
            className={`size-5 shrink-0 text-gray-400 transition ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="border-b border-gray-100 p-3">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={lang === 'en' ? 'Search destination...' : 'ابحث عن وجهة...'}
                  className="w-full rounded-xl border border-gray-200 py-2.5 ps-10 pe-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <ul className="max-h-[min(50vh,320px)] overflow-y-auto overscroll-contain">
              {filtered.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    to={buildPath(lang, dest.slug)}
                    className="group flex items-center justify-between gap-4 border-b border-gray-50 px-5 py-4 transition last:border-0 hover:bg-blue-50/60"
                  >
                    <h3 className="font-bold text-gray-900">{dest.name[lang]}</h3>
                    <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
                      <span>
                        {lang === 'en' ? 'from' : 'من'} ${dest.priceFrom.toFixed(2)}
                      </span>
                      <span className="hidden sm:inline">{docLabel(dest.services.length)}</span>
                      <Chevron className="size-4 text-blue-500 transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-5 py-8 text-center text-sm text-gray-500">
                  {lang === 'en' ? 'No destinations found' : 'لم تُعثر على وجهات'}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
