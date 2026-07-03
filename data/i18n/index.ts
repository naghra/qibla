import { ar } from './ar';
import { en } from './en';
import { Lang, Translations } from './types';

export * from './types';
export { ar, en };

export const translations: Record<Lang, Translations> = { ar, en };

export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function getDir(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'ar';
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  if (queryLang === 'en' || queryLang === 'ar') return queryLang;
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'ar') return stored;
  const path = window.location.pathname;
  if (path.startsWith('/en') || path.includes('/en/')) return 'en';
  return 'ar';
}
