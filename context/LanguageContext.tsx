import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Lang, Translations } from '../data/i18n/types';
import { detectLang, getDir, getTranslations } from '../data/i18n';

interface LanguageContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('lang', next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const t = getTranslations(lang);
  const dir = getDir(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = t.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.metaDescription);
  }, [lang, dir, t.metaTitle, t.metaDescription]);

  return (
    <LanguageContext.Provider value={{ lang, dir, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
