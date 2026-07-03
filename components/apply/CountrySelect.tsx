import React from 'react';
import { countriesData, countryFlag } from '../../data/countries';
import { getPhoneMeta } from '../../data/phoneMeta';
import type { Lang } from '../../data/i18n/types';
import { getCountryName } from '../../utils/countryName';
import {
  applyFieldGroup,
  applyLabel,
  applySelectShell,
  applySelectWithFlagInner,
} from './applyStyles';

interface CountrySelectProps {
  value: string;
  onChange: (iso2: string) => void;
  lang: Lang;
  label: string;
}

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

  return (
    <div className={applyFieldGroup}>
      <label className={applyLabel}>{label}</label>
      <div className={applySelectShell}>
        {value && (
          <span className="pointer-events-none absolute start-4 top-1/2 z-[1] -translate-y-1/2 text-lg leading-none" aria-hidden>
            {countryFlag(value)}
          </span>
        )}
        <select className={applySelectWithFlagInner} value={value} onChange={(e) => onChange(e.target.value)}>
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
