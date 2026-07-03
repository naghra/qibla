import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { countriesData, countryFlag } from '../data/countries';
import { SectionHeader } from './ui';

export const Countries: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = countriesData.filter((c) => c.name.includes(search));
  const displayed = showAll ? filtered : filtered.slice(0, 20);

  return (
    <section className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader
        title="الدول التي تتطلب بطاقة TDAC"
        subtitle="يجب على جميع المسافرين الدوليين إلى تايلاند إكمال نموذج الوصول الرقمي قبل الوصول."
      />

      <div className="relative mx-auto max-w-md">
        <Search className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث عن بلدك..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pr-12 pl-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
              <span className="truncate font-medium text-gray-800">{country.name}</span>
            </div>
            <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
              مطلوب
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
            {showAll ? 'عرض أقل' : `عرض جميع ${filtered.length} دولة`}
          </button>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        ابحث عن بلدك أعلاه للتحقق مما إذا كانت بطاقة الوصول مطلوبة لجنسيتك
      </p>
    </section>
  );
};
