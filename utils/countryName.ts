import type { Lang } from '../data/i18n/types';
import type { Country } from '../data/countries';

const enNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function getCountryName(country: Country, lang: Lang): string {
  if (lang === 'ar') return country.name;
  try {
    return enNames.of(country.code) ?? country.name;
  } catch {
    return country.name;
  }
}
