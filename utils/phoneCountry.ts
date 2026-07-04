import { countriesData } from '../data/countries';
import type { Lang } from '../data/i18n/types';

export function defaultPhoneCountryFromLang(lang: Lang): string {
  return lang === 'ar' ? 'EG' : 'FR';
}

export function isSupportedPhoneCountry(code: string): boolean {
  const upper = code.toUpperCase();
  return countriesData.some((c) => c.code === upper);
}

function normalizeCountryCode(code: unknown): string | null {
  if (typeof code !== 'string' || code.length !== 2) return null;
  const upper = code.toUpperCase();
  return isSupportedPhoneCountry(upper) ? upper : null;
}

async function fetchGeoFromApi(): Promise<string | null> {
  try {
    const res = await fetch('/api/geo', { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = (await res.json()) as { countryCode?: string | null };
    return normalizeCountryCode(data.countryCode);
  } catch {
    return null;
  }
}

async function fetchGeoFromIpWho(): Promise<string | null> {
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = (await res.json()) as { success?: boolean; country_code?: string };
    if (data.success === false) return null;
    return normalizeCountryCode(data.country_code);
  } catch {
    return null;
  }
}

/** Detect ISO 3166-1 alpha-2 country code from visitor IP (best effort). */
export async function detectPhoneCountryFromIp(): Promise<string | null> {
  return (await fetchGeoFromApi()) ?? (await fetchGeoFromIpWho());
}
