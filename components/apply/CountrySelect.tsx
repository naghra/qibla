import React from 'react';
import { countriesData, countryFlag } from '../../data/countries';
import { getPhoneMeta } from '../../data/phoneMeta';
import type { Lang } from '../../data/i18n/types';
import { getCountryName } from '../../utils/countryName';

interface CountrySelectProps {
  value: string;
  onChange: (iso2: string) => void;
  lang: Lang;
  label: string;
}

const selectClass =
  'w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pe-8 ps-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export function formatCountryOption(iso2: string, lang: Lang): string {
  const country = countriesData.find((c) => c.code === iso2);
  const meta = getPhoneMeta(iso2);
  const name = country ? getCountryName(country, lang) : iso2;
  return `${meta.iso3}: ${name}`;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, lang, label }) => {
  const sorted = [...countriesData].sort((a, b) =>
    getCountryName(a, lang).localeCompare(getCountryName(b, lang), lang === 'ar' ? 'ar' : 'en')
  );

  const selected = countriesData.find((c) => c.code === value);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-900">{label}</label>
      <div className="relative">
        {selected && (
          <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-base" aria-hidden>
            {countryFlag(value)}
          </span>
        )}
        <select
          className={`${selectClass} ${selected ? 'ps-10' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {lang === 'ar' ? 'اختر الدولة' : 'Select country'}
          </option>
          {sorted.map((c) => (
            <option key={c.code} value={c.code}>
              {formatCountryOption(c.code, lang)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
