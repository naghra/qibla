import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { countriesData, countryFlag } from '../data/countries';
import { SectionHeader } from './ui';
import { useLanguage } from '../context/LanguageContext';
import { getCountryName } from '../utils/countryName';

export const Countries: React.FC = () => {
  const { t, lang } = useLanguage();
  const { countries: c } = t;
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countriesData;
    return countriesData.filter((country) => {
      const display = getCountryName(country, lang).toLowerCase();
      return display.includes(q) || country.name.includes(search) || country.code.toLowerCase().includes(q);
    });
  }, [search, lang]);

  const displayed = showAll ? filtered : filtered.slice(0, 20);

  return (
    <section className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader title={c.sectionTitle} subtitle={c.sectionSubtitle} />

      <div className="relative mx-auto max-w-md">
        <Search className="absolute start-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={c.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 ps-12 pe-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayed.map((country) => (
          <li
            key={country.code}
            className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm transition hover:border-blue-100 hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-xl leading-none"
                aria-hidden
              >
                {countryFlag(country.code)}
              </span>
              <span className="truncate font-medium text-gray-800">
                {getCountryName(country, lang)}
              </span>
            </div>
            <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
              {c.required}
            </span>
          </li>
        ))}
      </ul>

      {filtered.length > 20 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-bold text-blue-500 hover:text-blue-600"
          >
            {showAll ? c.showLess : c.showAll(filtered.length)}
          </button>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">{c.footerNote}</p>
    </section>
  );
};
