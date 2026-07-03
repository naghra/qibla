import { Lang, Translations } from './types';
import { ar } from './ar';
import { en } from './en';
import { buildTranslations, getTranslations as getBuiltTranslations } from './buildTranslations';
import type { PageScope } from '../destinations';

export * from './types';
export { ar, en };
export { buildTranslations };

export const translations: Record<Lang, Translations> = { ar, en };

export function getTranslations(lang: Lang, scope?: PageScope): Translations {
  if (scope) return buildTranslations(lang, scope);
  return getBuiltTranslations(lang);
}

export function getDir(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function detectLang(pathname = typeof window !== 'undefined' ? window.location.pathname : '', search = typeof window !== 'undefined' ? window.location.search : ''): Lang {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(search || window.location.search);
    const queryLang = params.get('lang');
    if (queryLang === 'en' || queryLang === 'ar') return queryLang;
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'ar') return stored;
    const browser = navigator.language?.toLowerCase() ?? '';
    if (browser.startsWith('ar')) return 'ar';
    if (browser) return 'en';
  }
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  if (path.startsWith('/en') || path.includes('/en/')) return 'en';
  if (path.startsWith('/ar') || path.includes('/ar/')) return 'ar';
  return 'en';
}

export function langFromPath(pathname: string): Lang | null {
  const match = pathname.match(/^\/(ar|en)(?:\/|$)/);
  return match ? (match[1] as Lang) : null;
}
