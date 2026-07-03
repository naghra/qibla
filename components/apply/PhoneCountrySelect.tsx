import React from 'react';
import { countriesData, countryFlag } from '../../data/countries';
import { getPhoneMeta } from '../../data/phoneMeta';
import type { Lang } from '../../data/i18n/types';
import { getCountryName } from '../../utils/countryName';

interface PhoneCountrySelectProps {
  value: string;
  onChange: (iso2: string) => void;
  lang: Lang;
  label: string;
}

const selectClass =
  'w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pe-8 ps-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export function formatPhoneCountryOption(iso2: string, lang: Lang): string {
  const country = countriesData.find((c) => c.code === iso2);
  const meta = getPhoneMeta(iso2);
  const name = country ? getCountryName(country, lang) : iso2;
  return `${meta.iso3}: ${name} (${meta.dial})`;
}

export const PhoneCountrySelect: React.FC<PhoneCountrySelectProps> = ({
  value,
  onChange,
  lang,
  label,
}) => {
  const sorted = [...countriesData].sort((a, b) =>
    getCountryName(a, lang).localeCompare(getCountryName(b, lang), lang === 'ar' ? 'ar' : 'en')
  );

  const selected = countriesData.find((c) => c.code === value);
  const meta = getPhoneMeta(value);

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
          {sorted.map((c) => (
            <option key={c.code} value={c.code}>
              {formatPhoneCountryOption(c.code, lang)}
            </option>
          ))}
        </select>
      </div>
      {selected && (
        <p className="mt-1 text-xs text-gray-500" dir="ltr">
          {meta.iso3} · {getCountryName(selected, lang)} ({meta.dial})
        </p>
      )}
    </div>
  );
};

export function getDialPrefix(iso2: string): string {
  return getPhoneMeta(iso2).dial;
}
