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

interface PhoneCountrySelectProps {
  value: string;
  onChange: (iso2: string) => void;
  lang: Lang;
  label: string;
}

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

  return (
    <div className={applyFieldGroup}>
      <label className={applyLabel}>{label}</label>
      <div className={applySelectShell}>
        <span className="pointer-events-none absolute start-4 top-1/2 z-[1] -translate-y-1/2 text-lg leading-none" aria-hidden>
          {countryFlag(value)}
        </span>
        <select className={applySelectWithFlagInner} value={value} onChange={(e) => onChange(e.target.value)}>
          {sorted.map((c) => (
            <option key={c.code} value={c.code}>
              {formatPhoneCountryOption(c.code, lang)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export function getDialPrefix(iso2: string): string {
  return getPhoneMeta(iso2).dial;
}
